// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721Enumerable, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol"; // For owner to withdraw funds

contract Bankie is ERC721Enumerable, Ownable {
    uint256 private _nextTokenId;

    uint256 public immutable adoptionPrice; // in Wei
    uint256 immutable protocolFee; // in Wei
    uint256 private protocolProfit;

    struct PetStats {
        uint256 fedCount;
        uint256 fedAmount;
        uint256 lastFedTimestamp;
    }

    // Mapping to store PetStats for each tokenId
    // tokenId => PetStats
    mapping(uint256 => PetStats) private petData;

    event PetAdopted(
        address indexed adopter,
        uint256 indexed tokenId,
        uint256 pricePaid
    );
    event PetFed(
        uint256 indexed tokenId,
        address indexed feeder,
        uint256 newFedCount,
        uint256 timestamp
    );
    event PetHarvested(
        uint256 indexed tokenId,
        address indexed feeder,
        uint256 timestamp
    );

    constructor(
        uint256 _adoptionPrice,
        uint256 _protocolFee
    ) ERC721("Bankie", "BNK") Ownable(msg.sender) {
        require(
            _adoptionPrice >= 0,
            "Adoption price must be greater than zero"
        );
        require(
            _adoptionPrice >= _protocolFee,
            "Adoption price must be greater than the protocolFee"
        );
        adoptionPrice = _adoptionPrice;
        protocolFee = _protocolFee;
    }

    /**
     * @dev Allows a user to adopt a new Bankie pet.
     * The user must send exactly `adoptionPrice` Ether with the transaction.
     * @return tokenId of the newly adopted pet.
     */
    function adopt() public payable returns (uint256) {
        require(
            msg.value >= adoptionPrice,
            "Please send over the adoption price to adopt a Bankie."
        );

        uint256 tokenId = _nextTokenId++;

        _safeMint(msg.sender, tokenId);

        petData[tokenId].fedCount = 0;
        petData[tokenId].lastFedTimestamp = block.timestamp;
        petData[tokenId].fedAmount = msg.value - protocolFee;
        protocolProfit += protocolFee;

        emit PetAdopted(msg.sender, tokenId, msg.value);

        return tokenId;
    }

    /**
     * @dev Allows the owner of a pet to feed it.
     * @param tokenId The ID of the pet to feed.
     */
    function feedPet(uint256 tokenId) public payable {
        require(
            _ownerOf(tokenId) == msg.sender,
            "You can only feed your own pet."
        );
        require(
            msg.value >= adoptionPrice,
            "You need to feed an amount equal or greater to the adoptionPrice"
        );
        require(
            block.timestamp > petData[tokenId].lastFedTimestamp + 57600,
            "You must only feed your pet every 16 hours"
        ); // 16 hours in seconds
        require(
            petData[tokenId].lastFedTimestamp + 172800 < block.timestamp,
            "You have forgotten to feed your pet! It has run away :("
        ); // 2 days in seconds
        petData[tokenId].fedCount++;
        petData[tokenId].lastFedTimestamp = block.timestamp;
        petData[tokenId].fedAmount += msg.value - protocolFee;
        protocolProfit += protocolFee;
        
        emit PetFed(
            tokenId,
            msg.sender,
            petData[tokenId].fedCount,
            block.timestamp
        );
    }

    /**
     * @dev Allows the owner of a pet to get its funds after 100 times :)
     * @param tokenId The ID of the pet to harvest.
     */
    function layGoldenEgg(uint256 tokenId) public {
        require(
            _ownerOf(tokenId) == msg.sender,
            "You can only gather from your own pet."
        );
        require(
            petData[tokenId].fedCount > 100,
            "You can only harvest after feeding 100 meals."
        );

        petData[tokenId].fedCount = 0;
        petData[tokenId].lastFedTimestamp = block.timestamp;
        petData[tokenId].fedAmount = 0;

        (bool success, ) = payable(msg.sender).call{
            value: petData[tokenId].fedAmount
        }("");
        require(success, "Withdrawal failed.");

       
        emit PetHarvested(tokenId, msg.sender, block.timestamp);
    }

    /**
     * @dev Allows the contract owner to withdraw accumulated adoption funds.
     */
    function withdraw() public onlyOwner {
        require(protocolProfit > 0, "No Ether to withdraw.");
        protocolProfit = 0;
        (bool success, ) = payable(owner()).call{value: protocolProfit}("");
        require(success, "Withdrawal failed.");
    }

    /**
     * @dev Returns the statistics of a given pet. Can check on anyone's pet.
     * @param tokenId The ID of the pet.
     */
    function checkPet(uint256 tokenId) public view returns (PetStats memory) {
        return petData[tokenId];
    }

    //to know all user's pets, balanceOf to know how many and get them on tokenOfOwnerByIndex
}
