// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SpaceShipNFT
 * @dev ERC721 NFT representing spaceships with individual metadata.
 */
contract SpaceShipNFT is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    constructor() ERC721("SpaceShipNFT", "SHIP") Ownable(msg.sender) {}

    /**
     * @dev Mint a new spaceship NFT to `to` with a metadata URI.
     */
    function safeMint(address to, string memory metadataURI) public onlyOwner {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter += 1;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataURI);
    }
}
