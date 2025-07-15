# ERC‑6551 NFT Wallets – Smart Contract Suite (Developed by Lorebit Studio)

This repository contains a suite of **ERC‑6551‑compatible smart contracts** developed by **Lorebit Studio** to demonstrate Token‑Bound Accounts (TBAs) — NFT‑controlled wallets that can hold ERC20, ERC721, and ETH on behalf of an NFT owner.

---

## 🎮 Project Overview

This project showcases an implementation of the **ERC‑6551: Token‑Bound Account** standard.
It includes contracts for:

* Creating and managing TBAs.
* Minting profile NFTs that act as account controllers.
* Minting and transferring in‑game spaceship NFTs.
* An ERC20 game token with minting and transfer logic.

Players can:

* Mint a Profile NFT that owns a TBA.
* Have their TBA hold ETH, ERC20 (GameToken), and ERC721 (SpaceShipNFT).
* Transfer assets from their TBA to their wallet in a fully trustless way.

---

## 👨‍💻 Lorebit Studio's Role

**Lorebit Studio** developed all smart contracts, deployment scripts, and testing utilities for this ERC‑6551 showcase:

* ERC‑6551 registry and account contracts.
* Example Profile, SpaceShip, and GameToken contracts.
* Deployment & verification scripts.
* Test scenarios simulating multiple players minting, funding, and withdrawing from TBAs.

---

## 🔨 Contracts Included

| Contract           | Description                                                                          |
| ------------------ | ------------------------------------------------------------------------------------ |
| `ProfileNFT.sol`   | ERC721 Profile NFT that represents the player identity.                              |
| `SpaceShipNFT.sol` | ERC721 representing in‑game spaceship assets.                                        |
| `GameToken.sol`    | ERC20 token used as in‑game currency, mintable by owner.                             |
| `TBAAccount.sol`   | ERC‑6551‑compatible TBA that executes transactions on behalf of the NFT owner.       |
| `TBARegistry.sol`  | Registry contract that deploys TBAs as minimal proxies with deterministic addresses. |

---

## 🧠 Key Features

* ✅ ERC‑6551‑compatible TBA with `initialize` method.
* ✅ Profile NFT controlling the TBA.
* ✅ TBAs holding ERC20, ERC721, and ETH.
* ✅ Fully owner‑restricted execution on TBAs.
* ✅ Deployment & verification scripts.
* ✅ Comprehensive Hardhat tests & interaction scripts.

---

## 🌐 Deployments

### 🧪 Testnet – [Base Sepolia](https://sepolia.basescan.org)

**Contracts Owner:** [`0xB94503C6a717BDD677ad9dAB7B450AF86d3Aa3F5`](https://sepolia.basescan.org/address/0xB94503C6a717BDD677ad9dAB7B450AF86d3Aa3F5)

| Contract     | Address                                                                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| ProfileNFT   | [`0x578b1f439cb5678f4Dd28E5dB1092b43519c13d7`](https://sepolia.basescan.org/address/0x578b1f439cb5678f4Dd28E5dB1092b43519c13d7) |
| SpaceShipNFT | [`0xaC3E7E08345d498963021d73a1988ef193b2ab14`](https://sepolia.basescan.org/address/0xaC3E7E08345d498963021d73a1988ef193b2ab14) |
| GameToken    | [`0x44F69196d5b89a1b5013e660EfF1c2fACe44d2DD`](https://sepolia.basescan.org/address/0x44F69196d5b89a1b5013e660EfF1c2fACe44d2DD) |
| TBAAccount   | [`0x6f6F4103014B739cc9564FdaBCd7Edd81df392F9`](https://sepolia.basescan.org/address/0x6f6F4103014B739cc9564FdaBCd7Edd81df392F9) |
| TBARegistry  | [`0xD1889B34CD1D11b91DFaD4C239f7487c56E361c3`](https://sepolia.basescan.org/address/0xD1889B34CD1D11b91DFaD4C239f7487c56E361c3) |

---

## 🏗️ Built For

**Lorebit Studio Portfolio Project**  
A demonstration of advanced NFT + wallet mechanics using ERC‑6551 on a real EVM L2 testnet.

---

## 🧑‍💻 Developed By

**Lorebit Studio**  
Smart Contract Development • Game Design • Fullstack Blockchain Engineering  
🌐 [lorebitstudio.com](https://lorebitstudio.com)  
✉️ [contact@lorebitstudio.com](mailto:contact@lorebitstudio.com)

---

## 📄 License

This repository is licensed under the MIT License. See [`LICENSE`](./LICENSE) for details.

---

## ⭐ Usage

This repository is intended for **portfolio and showcase purposes**.  
If you are interested in hiring Lorebit Studio or using these contracts commercially, please get in touch!

