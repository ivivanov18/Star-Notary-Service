pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract StarNotary is ERC721{ 

    struct Star { 
        string name;
        string story;
        string dec;
        string mag;
        string cent;
    }

    uint256 public version = 2;

    mapping(uint256 => Star) public tokenIdToStarInfo;
    mapping(uint256 => uint256) public starsForSale;
    mapping(bytes32 => bool) public registeredStarsMapping;

    uint256 private tokenId = 0;

    function createStar(string _name, string _story, string _dec, string _mag, string _cent, uint256 _tokenId) public { 
        require(bytes(_name).length > 0, "The star must have name.");
        require(bytes(_story).length > 0, "The star must a story.");
        require(bytes(_dec).length > 0, "The star must have dec coordinates.");
        require(bytes(_mag).length > 0, "The star must have mag coordinates.");
        require(bytes(_cent).length > 0, "The star must have cent coordinates.");

        bytes32 starToCreateKEC256 = generateKEC256From(_dec, _mag, _cent);
        require (registeredStarsMapping[starToCreateKEC256] == false, "The star you want to register is already registered.");

        Star memory starToCreate = Star(_name, _story, _dec, _mag, _cent);

        tokenIdToStarInfo[_tokenId] = starToCreate;
        registeredStarsMapping[starToCreateKEC256] = true;

        mint(_tokenId);
    }

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public { 
        require(this.ownerOf(_tokenId) == msg.sender);

        starsForSale[_tokenId] = _price;
    }

    function buyStar(uint256 _tokenId) public payable { 
        require(starsForSale[_tokenId] > 0);
        
        uint256 starCost = starsForSale[_tokenId];
        address starOwner = this.ownerOf(_tokenId);
        require(msg.value >= starCost);

        _removeTokenFrom(starOwner, _tokenId);
        _addTokenTo(msg.sender, _tokenId);
        
        starOwner.transfer(starCost);

        if(msg.value > starCost) { 
            msg.sender.transfer(msg.value - starCost);
        }
    }

    function generateKEC256From(string _dec, string _mag, string _cent) private returns (bytes32) {
        return keccak256(abi.encodePacked(_dec, _mag, _cent));
    }

    function getNextTokenId() private returns(uint256){
        return tokenId ++;
    }

    function mint(uint256 _tokenId) public {
        super._mint(msg.sender, _tokenId);
    }

    function checkIfStarExist(string _dec, string _mag, string _cent) public returns (bool){
        bytes32 kec256 = generateKEC256From(_dec, _mag, _cent);
        return registeredStarsMapping[kec256];
    }



}