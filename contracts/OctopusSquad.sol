// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "./ERC721Tradeable.sol";

/// @custom:security-contact support@rovergulf.net
contract OctopusSquad is ERC721Tradeable {

    constructor(address proxyRegistryAddress_) ERC721Tradeable("Octopus Squad", "OCTO", proxyRegistryAddress_) {}

    function baseTokenURI() override public pure returns (string memory) {
        return "https://api.rovergulf.net/nft/metadata/octopus-squad/";
    }

    function contractURI() public pure returns (string memory) {
        return "https://api.rovergulf.net/nft/metadata/octopus-squad";
    }

}
