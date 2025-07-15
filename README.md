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
| ProfileNFT   | [`0x6fb595618fC38dbf5E28719415aEC603365d70eF`](https://sepolia.basescan.org/address/0x6fb595618fC38dbf5E28719415aEC603365d70eF) |
| SpaceShipNFT | [`0x62216aBAf04a7E4aC157b7179747Fd5988d19481`](https://sepolia.basescan.org/address/0x62216aBAf04a7E4aC157b7179747Fd5988d19481) |
| GameToken    | [`0x9969cdcB7F904358f13A71837E37ABfed7BeD7A2`](https://sepolia.basescan.org/address/0x9969cdcB7F904358f13A71837E37ABfed7BeD7A2) |
| TBAAccount   | [`0xe06Cd3B81f0a8233B1f072A7ab6580b058E55005`](https://sepolia.basescan.org/address/0xe06Cd3B81f0a8233B1f072A7ab6580b058E55005) |
| TBARegistry  | [`0x5f9CD80bF3AC0Ea17e18f7a532d7FE3a8AAfEabc`](https://sepolia.basescan.org/address/0x5f9CD80bF3AC0Ea17e18f7a532d7FE3a8AAfEabc) |

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

