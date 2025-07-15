// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

/// @title TBAAccount
/// @notice Token-Bound Account that is controlled by the owner of a specific ERC721 token.
///         Supports executing arbitrary calls, holding ERC20/ERC721/ETH, and withdrawals.
contract TBAAccount is ERC165, IERC721Receiver {
    /// @notice The NFT contract address that this account is bound to.
    address public nftContract;

    /// @notice The token ID of the NFT that controls this account.
    uint256 public tokenId;

    /// @notice Flag to ensure `initialize()` can only be called once.
    bool private initialized;

    /// @dev Modifier to restrict functions to the current owner of the bound NFT.
    modifier onlyNFTOwner() {
        require(
            IERC721(nftContract).ownerOf(tokenId) == msg.sender,
            "Not NFT owner"
        );
        _;
    }

    /// @notice Initializes the account with the NFT it is bound to.
    /// @param _nftContract The address of the controlling NFT contract.
    /// @param _tokenId The token ID of the controlling NFT.
    function initialize(address _nftContract, uint256 _tokenId) external {
        require(!initialized, "Already initialized");
        nftContract = _nftContract;
        tokenId = _tokenId;
        initialized = true;
    }

    /// @notice Executes an arbitrary call from the account.
    /// @param to The target address.
    /// @param value The ETH amount to send.
    /// @param data The calldata to send.
    /// @return The returned data from the call.
    function execute(
        address to,
        uint256 value,
        bytes calldata data
    ) external onlyNFTOwner returns (bytes memory) {
        (bool success, bytes memory result) = to.call{value: value}(data);
        require(success, "Call failed");
        return result;
    }

    /// @notice Fallback function to receive plain ETH transfers.
    receive() external payable {}

    /// @notice Fallback for any other calldata.
    fallback() external payable {}

    /// @notice Withdraws ETH from this account.
    /// @param amount The amount of ETH to withdraw.
    /// @param to The recipient address.
    function withdrawETH(uint256 amount, address payable to) external onlyNFTOwner {
        require(address(this).balance >= amount, "Insufficient ETH");
        to.transfer(amount);
    }

    /// @notice Withdraws ERC20 tokens from this account.
    /// @param token The ERC20 token contract.
    /// @param amount The amount of tokens to withdraw.
    /// @param to The recipient address.
    function withdrawERC20(address token, uint256 amount, address to) external onlyNFTOwner {
        require(IERC20(token).transfer(to, amount), "ERC20 transfer failed");
    }

    /// @notice Withdraws an ERC721 token from this account.
    /// @param token The ERC721 token contract.
    /// @param _tokenId The token ID to withdraw.
    /// @param to The recipient address.
    function withdrawERC721(address token, uint256 _tokenId, address to) external onlyNFTOwner {
        IERC721(token).safeTransferFrom(address(this), to, _tokenId);
    }

    /// @notice Implements the ERC721Receiver interface to accept safe transfers.
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    /// @notice Supports ERC165 interface checks.
    /// @param interfaceId The interface identifier.
    /// @return True if supported.
    function supportsInterface(bytes4 interfaceId) public view override returns (bool) {
        return interfaceId == type(IERC721Receiver).interfaceId || super.supportsInterface(interfaceId);
    }
}
