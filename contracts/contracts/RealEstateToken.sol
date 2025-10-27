// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IKYCRegistry {
    function isVerified(address user) external view returns (bool);
}

contract RealEstateToken is ERC20, Ownable {
    string public propertyId;
    string public propertyLocation;
    uint256 public valuationUSD;
    string public metadataURI;

    IKYCRegistry public kycRegistry;

    event MetadataUpdated(string newURI);
    event TransferRestricted(address from, address to, uint256 amount);

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _propertyId,
        string memory _propertyLocation,
        uint256 _valuationUSD,
        uint256 _totalSupply,
        string memory _metadataURI,
        address _kycRegistry
    ) ERC20(_name, _symbol) Ownable(msg.sender) {
        propertyId = _propertyId;
        propertyLocation = _propertyLocation;
        valuationUSD = _valuationUSD;
        metadataURI = _metadataURI;
        kycRegistry = IKYCRegistry(_kycRegistry);

        _mint(msg.sender, _totalSupply * 10 ** decimals());
    }

    function updateMetadata(string memory newURI) external onlyOwner {
        metadataURI = newURI;
        emit MetadataUpdated(newURI);
    }

   function _update(address from, address to, uint256 amount) internal override {
    // Allow minting and burning
    if (from == address(0) || to == address(0)) {
        super._update(from, to, amount);
        return;
    }

    // Enforce KYC restrictions
    require(kycRegistry.isVerified(from), "Sender not KYC verified");
    require(kycRegistry.isVerified(to), "Recipient not KYC verified");

    super._update(from, to, amount);
}

}
