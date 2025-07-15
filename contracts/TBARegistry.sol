// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/proxy/Clones.sol";

/**
 * @title TBARegistry
 * @notice ERC-6551 Registry: deploys and tracks Token-Bound Accounts
 */
contract TBARegistry {
    event AccountCreated(
        address indexed account,
        address indexed implementation,
        uint256 chainId,
        address indexed tokenContract,
        uint256 tokenId,
        uint256 salt
    );

    /**
     * @notice Creates a token-bound account if it doesn't exist yet.
     * @param implementation Address of the account implementation.
     * @param chainId Chain ID of the current chain.
     * @param tokenContract Address of the NFT contract.
     * @param tokenId NFT token ID.
     * @param salt Arbitrary salt for uniqueness.
     * @return account The deployed account address.
     */
    function createAccount(
        address implementation,
        uint256 chainId,
        address tokenContract,
        uint256 tokenId,
        uint256 salt,
        bytes calldata initData
    ) external returns (address account) {
        bytes32 saltHash = keccak256(
            abi.encode(chainId, tokenContract, tokenId, salt)
        );

        account = Clones.cloneDeterministic(implementation, saltHash);

        if (initData.length > 0) {
            (bool success, ) = account.call(initData);
            require(success, "Initialization failed");
        }

        emit AccountCreated(
            account,
            implementation,
            chainId,
            tokenContract,
            tokenId,
            salt
        );
    }

    /**
     * @notice Predicts the address of an account given parameters.
     */
    function accountAddress(
        address implementation,
        uint256 chainId,
        address tokenContract,
        uint256 tokenId,
        uint256 salt
    ) external view returns (address predicted) {
        bytes32 saltHash = keccak256(
            abi.encode(chainId, tokenContract, tokenId, salt)
        );

        predicted = Clones.predictDeterministicAddress(
            implementation,
            saltHash,
            address(this)
        );
    }
}
