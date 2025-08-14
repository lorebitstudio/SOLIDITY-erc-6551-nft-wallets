const { ethers, run } = require("hardhat");

async function main() {
  const deployer = new ethers.Wallet(process.env.TESTNET_PRIVATE_KEY, ethers.provider);
  console.log(`👷 Deploying contracts with: ${deployer.address}`);

  const verify = async (address, constructorArgs = []) => {
    console.log(`🔍 Verifying ${address}…`);
    try {
      await run("verify:verify", {
        address,
        constructorArguments: constructorArgs,
      });
      console.log(`✅ Verified: ${address}`);
    } catch (err) {
      if (err.message.includes("Already Verified")) {
        console.log(`ℹ️ Already Verified: ${address}`);
      } else {
        console.error(`❌ Verification failed: ${err}`);
      }
    }
  };

  // Deploy ProfileNFT
  const ProfileNFT = await ethers.getContractFactory("ProfileNFT", deployer);
  const profileNFT = await ProfileNFT.deploy("https://api.game/profiles/");
  await profileNFT.waitForDeployment();
  const profileNFTAddr = await profileNFT.getAddress();
  console.log(`✅ ProfileNFT deployed: ${profileNFTAddr}`);

  // Deploy SpaceShipNFT
  const SpaceShipNFT = await ethers.getContractFactory("SpaceShipNFT", deployer);
  const shipNFT = await SpaceShipNFT.deploy();
  await shipNFT.waitForDeployment();
  const shipNFTAddr = await shipNFT.getAddress();
  console.log(`🚀 SpaceShipNFT deployed: ${shipNFTAddr}`);

  // Deploy GameToken
  const GameToken = await ethers.getContractFactory("GameToken", deployer);
  const gameToken = await GameToken.deploy();
  await gameToken.waitForDeployment();
  const gameTokenAddr = await gameToken.getAddress();
  console.log(`💰 GameToken deployed: ${gameTokenAddr}`);

  // Deploy TBAAccount implementation
  const TBAAccount = await ethers.getContractFactory("TBAAccount", deployer);
  const tbaImplementation = await TBAAccount.deploy();
  await tbaImplementation.waitForDeployment();
  const tbaAddr = await tbaImplementation.getAddress();
  console.log(`📦 TBAAccount implementation deployed: ${tbaAddr}`);

  // Deploy TBARegistry
  const TBARegistry = await ethers.getContractFactory("TBARegistry", deployer);
  const registry = await TBARegistry.deploy();
  await registry.waitForDeployment();
  const registryAddr = await registry.getAddress();
  console.log(`📒 TBARegistry deployed: ${registryAddr}`);

  console.log(`🎉 All contracts deployed successfully!`);

  console.log(`⏳ Waiting before verifying (Etherscan may need a few seconds)…`);
  await new Promise((r) => setTimeout(r, 20000)); // wait 20s before verifying

  console.log(`🚀 Starting verification…`);

  await verify(profileNFTAddr, ["https://api.game/profiles/"]);
  await verify(shipNFTAddr);
  await verify(gameTokenAddr);
  await verify(tbaAddr);
  await verify(registryAddr);

  console.log(`🎉 All contracts verified successfully!`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
