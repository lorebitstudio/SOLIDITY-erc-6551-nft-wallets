require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  const chainId = (await ethers.provider.getNetwork()).chainId;

  const deployer = new ethers.Wallet(process.env.TESTNET_PRIVATE_KEY, ethers.provider);
  const player1 = new ethers.Wallet(process.env.PLAYER1_KEY, ethers.provider);
  const player2 = new ethers.Wallet(process.env.PLAYER2_KEY, ethers.provider);

  console.log(`👷 Deployer: ${deployer.address}`);
  console.log(`🎮 Player1: ${player1.address}`);
  console.log(`🎮 Player2: ${player2.address}`);

  const profileNFT = await ethers.getContractAt("ProfileNFT", process.env.PROFILE_NFT);
  const shipNFT = await ethers.getContractAt("SpaceShipNFT", process.env.SPACE_SHIP_NFT);
  const gameToken = await ethers.getContractAt("GameToken", process.env.GAME_TOKEN);
  const registry = await ethers.getContractAt("TBARegistry", process.env.TBA_REGISTRY);
  const tbaImplementation = await ethers.getContractAt("TBAAccount", process.env.TBA_ACCOUNT);

    async function parseEvent(receipt, contract, eventName) {
    const iface = contract.interface;
    const log = receipt.logs.find(l => {
        try {
        const parsed = iface.parseLog(l);
        return parsed.name === eventName;
        } catch {
        return false;
        }
    });

    if (!log) throw new Error(`❌ Event ${eventName} not found in tx ${receipt.transactionHash}`);

    const parsed = iface.parseLog(log);
    return parsed.args;
    }

  async function createProfileAndTBA(player, salt) {
    // Mint ProfileNFT
    const txMint = await profileNFT.connect(deployer).safeMint(player.address);
    const receiptMint = await txMint.wait();
    const mintArgs = await parseEvent(receiptMint, profileNFT, "Transfer");
    const profileTokenId = mintArgs.tokenId;

    console.log(`✅ ProfileNFT minted to ${player.address}: tokenId=${profileTokenId}`);

    const initData = tbaImplementation.interface.encodeFunctionData(
      "initialize",
      [profileNFT.target, profileTokenId]
    );

    const txTBA = await registry.connect(player).createAccount(
      tbaImplementation.target,
      chainId,
      profileNFT.target,
      profileTokenId,
      salt,
      initData
    );
    const receiptTBA = await txTBA.wait();
    const tbaArgs = await parseEvent(receiptTBA, registry, "AccountCreated");
    const tbaAddress = tbaArgs.account;

    console.log(`✅ TBA deployed for tokenId=${profileTokenId}: ${tbaAddress}`);
    return { tbaAddress, profileTokenId };
  }

  const { tbaAddress: tba0 } = await createProfileAndTBA(player1, 0);
  const { tbaAddress: tba1 } = await createProfileAndTBA(player2, 1);

  async function fundTBA(tbaAddress, shipStartId) {
    await shipNFT.connect(deployer).safeMint(tbaAddress, `https://api.game/ships/${shipStartId}`);
    await shipNFT.connect(deployer).safeMint(tbaAddress, `https://api.game/ships/${shipStartId + 1}`);
    console.log(`🚀 2 ships minted to TBA ${tbaAddress}`);

    const amount = ethers.parseEther("1000");
    await gameToken.connect(deployer).mint(tbaAddress, amount);
    console.log(`💰 1000 GAME minted to TBA ${tbaAddress}`);

    const shipBalance = await shipNFT.balanceOf(tbaAddress);
    const tokenBalance = await gameToken.balanceOf(tbaAddress);

    console.log(`📊 TBA ${tbaAddress} holdings:`);
    console.log(`   - SpaceShipNFT count: ${shipBalance}`);
    console.log(`   - GameToken balance: ${ethers.formatEther(tokenBalance)} GAME`);
  }

  await fundTBA(tba0, 0);
  await fundTBA(tba1, 2);

  async function transferAssetsFromTBA(player, tbaAddress, shipTokenId) {
    console.log(`🔷 Player ${player.address} transferring assets from TBA ${tbaAddress}`);

    const tba = await ethers.getContractAt("TBAAccount", tbaAddress);

    const amount = ethers.parseEther("500");
    const transferGameData = gameToken.interface.encodeFunctionData(
      "transfer",
      [player.address, amount]
    );

    const tx1 = await tba.connect(player).execute(gameToken.target, 0, transferGameData);
    await tx1.wait();
    console.log(`💸 Transferred 500 GAME from TBA → ${player.address}`);

    const transferShipData = shipNFT.interface.encodeFunctionData(
      "safeTransferFrom(address,address,uint256)",
      [tbaAddress, player.address, shipTokenId]
    );

    const tx2 = await tba.connect(player).execute(shipNFT.target, 0, transferShipData);
    await tx2.wait();

    console.log(`🛸 Transferred SpaceShipNFT #${shipTokenId} from TBA → ${player.address}`);

    const newGameBal = await gameToken.balanceOf(player.address);
    const newShipBal = await shipNFT.balanceOf(player.address);

    console.log(`📋 ${player.address} now holds:`);
    console.log(`   - GAME: ${ethers.formatEther(newGameBal)}`);
    console.log(`   - Ships: ${newShipBal}`);
  }

  await transferAssetsFromTBA(player1, tba0, 0);
  await transferAssetsFromTBA(player2, tba1, 2);

  console.log(`🎉 Test run completed successfully.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
