// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @custom:security-contact team@rovergulf.net
contract OctopusSquad is ERC721, ERC721Enumerable, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    string private _baseUri;
    string private _contractUri;
    uint256 public _saleStartDate = 1640293200; // 24 Dec 2021 00:00 MSK or 23 Dec 2021 21:00 UTC

    address payable treasurer; // withdraw to
    uint256 public discountTokensCount = 1000;
    uint256 public discountTokenPrice = 20 ether; // 20 Matic for first 1000 octopuses
    uint256 public tokenPrice = 40 ether; // 40 Matic

    uint256 public maxSupply = 1e4;
    uint256 public maxMintsPerTx = 10; // maximum mints per transaction

    // giveaway variables
    uint256 public airdropSupply = 50;
    bool public airdropDone = false;

    constructor(
        string memory baseUri_,
        string memory contractUri_
    ) ERC721("Octopus Squad", "OCTO") {
        _baseUri = baseUri_;
        _contractUri = contractUri_;
        treasurer = payable(_msgSender());
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseUri;
    }

    function contractURI() public view returns (string memory) {
        return _contractUri;
    }

    function airdrop(address[] memory recipients) public onlyOwner {
        require(recipients.length <= airdropSupply, "");
        for (uint256 i = 0; i < recipients.length; i++) {
            address to = recipients[i];
            _tokenIds.increment();
            uint256 tokenId = _tokenIds.current();
            _mint(to, tokenId);
        }
    }

    function mint(address to, uint256 amount) public payable {
        require(block.timestamp > _saleStartDate, "Sale is not started yet");
        require(amount != 0, "Requested amount cannot be zero");
        require(amount <= maxMintsPerTx, "Requested amount is more than maximum");
        uint256 mintAmount = amount;
        if (!airdropDone) {
            mintAmount += airdropSupply;
        }
        require(totalSupply() <= (maxSupply - mintAmount), "Total supply will exceed limit");
        require(to != address(0), "Cannot be minted to zero address");

        uint256 price = tokenPrice;
        uint256 currentId = currentTokenId();
        // set discount for the first sale
        if (currentId < discountTokensCount) {
            price = discountTokenPrice;
        }

        // if discount limit is exceed, count tx price separately
        if (currentId + amount > discountTokensCount) {
            uint256 lowerPrice = (discountTokensCount - currentId) * discountTokenPrice;
            uint256 normalPrice = (currentId + amount - discountTokensCount) * tokenPrice;
            require((lowerPrice + normalPrice) >= msg.value, "Not enough Matic sent");
        } else {
            require((amount * price) >= msg.value, "Not enough Matic sent");
        }

        for (uint256 i = 0; i < amount; i++) {
            _tokenIds.increment();
            uint256 tokenId = _tokenIds.current();
            _mint(to, tokenId);
        }
    }

    function setAirdropsDone() public onlyOwner {
        airdropDone = true;
    }

    function currentTokenId() public view returns (uint256) {
        return _tokenIds.current();
    }

    // withdraw
    function claimBalance() public onlyOwner {
        (bool success,) = treasurer.call{value : address(this).balance}("");
        require(success, "transfer failed");
    }

    function updateBaseUri(string memory newBaseUri_) public onlyOwner {
        _baseUri = newBaseUri_;
    }

    function updateContractUri(string memory newContractUri_) public onlyOwner {
        _contractUri = newContractUri_;
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
    internal override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
    public view override(ERC721, ERC721Enumerable) returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
