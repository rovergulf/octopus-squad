// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./common/meta-transactions/ContentMixin.sol";
import "./common/meta-transactions/NativeMetaTransaction.sol";

contract OwnableDelegateProxy {}

contract ProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}

/**
 * @title ERC721Tradable
 * ERC721Tradable - ERC721 contract that whitelists a trading address, and has minting functionality.
 */
abstract contract ERC721Tradeable is ERC721Enumerable, ContextMixin, NativeMetaTransaction, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    address public proxyRegistryAddress;

    constructor(
        string memory name_,
        string memory symbol_,
        address proxyRegistryAddress_
    ) ERC721(name_, symbol_) {
        proxyRegistryAddress = proxyRegistryAddress_;
        _initializeEIP712(name_);
    }

    /**
     * @dev Mints a token to an address with a tokenURI.
     * @param to_ address of the future owner of the token
     */
    function mintTo(address to_) public onlyOwner {
        _tokenIdCounter.increment();
        uint256 newTokenId = _tokenIdCounter.current();
        _mint(to_, newTokenId);
    }

    function currentTokenId() public view returns(uint256) {
        return _tokenIdCounter.current();
    }

    function baseTokenURI() virtual public pure returns (string memory);

    function tokenURI(uint256 tokenId_) override public pure returns (string memory) {
        return string(abi.encodePacked(baseTokenURI(), Strings.toString(tokenId_)));
    }

    /**
     * Override isApprovedForAll to whitelist user's OpenSea proxy accounts to enable gas-less listings.
     */
    function isApprovedForAll(address owner, address operator) override public view returns (bool) {
        // Whitelist OpenSea proxy contract for easy trading.
        ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
        if (address(proxyRegistry.proxies(owner)) == operator) {
            return true;
        }

        return super.isApprovedForAll(owner, operator);
    }

    /**
     * This is used instead of msg.sender as transactions won't be sent by the original token owner, but by OpenSea.
     */
    function _msgSender() internal override view returns (address sender) {
        return ContextMixin.msgSender();
    }
}
