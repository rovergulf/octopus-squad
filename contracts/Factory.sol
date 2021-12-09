// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./IFactoryERC721.sol";
import "./OctopusSquad.sol";

contract OctopusFactory is FactoryERC721, Ownable {
  using Strings for string;

  event Transfer(
    address indexed from,
    address indexed to,
    uint256 indexed tokenId
  );

  address public proxyRegistryAddress;
  address public nftAddress;
  string public baseURI = "https://api.rovergulf.net/nft/factory/octopus-squad/";

  /*
   * Enforce the existence of only 10000 chicks.
   */
  uint256 public SUPPLY = 1e4;

  /*
   * Number of options for minting Octopus Squad tokens.
   */
  uint256 public NUM_OPTIONS = 10;

  constructor(
    address nftAddress_,
    address proxyRegistryAddress_
  ) {
    nftAddress = nftAddress_;
    proxyRegistryAddress = proxyRegistryAddress_;

    fireTransferEvents(address(0), owner());
  }

  function name() override external pure returns (string memory) {
    return "Octopus Squad Sale";
  }

  function symbol() override external pure returns (string memory) {
    return "OSALE";
  }

  function supportsFactoryInterface() override public pure returns (bool) {
    return true;
  }

  function numOptions() override public view returns (uint256) {
    return NUM_OPTIONS;
  }

  function transferOwnership(address newOwner) override public onlyOwner {
    address _prevOwner = owner();
    super.transferOwnership(newOwner);
    fireTransferEvents(_prevOwner, newOwner);
  }

  function fireTransferEvents(address _from, address _to) private {
    for (uint256 i = 0; i < NUM_OPTIONS; i++) {
      emit Transfer(_from, _to, i);
    }
  }

  function mint(uint256 optionId_, address toAddress_) override public {
    // Must be sent from the owner proxy or owner.
    ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
    assert(address(proxyRegistry.proxies(owner())) == _msgSender() || owner() == _msgSender());

    // if can mint
    require(canMint(optionId_));

    OctopusSquad octopus = OctopusSquad(nftAddress);
    for (uint256 i = 0; i <= optionId_; i++) {
      octopus.mintTo(toAddress_);
    }
  }

  function canMint(uint256 optionId_) override public view returns (bool) {
    if (optionId_ >= NUM_OPTIONS) {
      return false;
    }

    OctopusSquad octopus = OctopusSquad(nftAddress);
    uint256 totalSupply = octopus.totalSupply();
    return totalSupply < (SUPPLY - (optionId_ + 1));
  }

  function tokenURI(uint256 optionId_) override external view returns (string memory) {
    return string(abi.encodePacked(baseURI, Strings.toString(optionId_)));
  }

  /**
   * Hack to get things to work automatically on OpenSea.
   * Use transferFrom so the frontend doesn't have to worry about different method names.
   */
  function transferFrom(
    address _from,
    address _to,
    uint256 _tokenId
  ) public {
    mint(_tokenId, _to);
  }

  /**
   * Hack to get things to work automatically on OpenSea.
   * Use isApprovedForAll so the frontend doesn't have to worry about different method names.
   */
  function isApprovedForAll(address _owner, address _operator)
  public view
  returns (bool)
  {
    if (owner() == _owner && _owner == _operator) {
      return true;
    }

    ProxyRegistry proxyRegistry = ProxyRegistry(proxyRegistryAddress);
    if (
      owner() == _owner &&
      address(proxyRegistry.proxies(_owner)) == _operator
    ) {
      return true;
    }

    return false;
  }

  function ownerOf(uint256 _tokenId) public view returns (address _owner) {
    return owner();
  }

}
