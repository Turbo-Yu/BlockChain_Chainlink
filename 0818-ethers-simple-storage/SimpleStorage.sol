// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SimpleStorage {
    // boolean, uint, int, address, bytes
    // bool hasFavoriteNumber =  true;
    // uint256 favoriteNumber = 123;
    // string FavoriteNumberInText = "Five";
    // int256 favoriteInt = -5;
    // address myAddress = 0x18096FE394f4539D63f9132cEaf462BfAe124534;
    // bytes32 favoriteBytes = "cat";

    // public priva
    uint256 favoriteNumber;
    // People public person = People({favoriteNumber: 2, name: "Patrick"});

    People[] public people;

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    function store(uint256 _favoriteNumber) public virtual {
        favoriteNumber = _favoriteNumber;
    }

    //view , pure
    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    // function add() public pure returns (uint256){
    //     return (1 + 1);
    // }

    //0xd9145CCE52D386f254917e481eB44e9943F39138
    //0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
    //0xf8e81D47203A594245E36C48e151709F0C19fBe8
    //0x471f7cdf

    // 结构体、映射、数组 是作为参数时，由于Solidity 不清楚应该放在哪，所以需要指明存储位置
    // 而基础类型 如uint 是放在内存中的，所以无需标识
    // calldata 不可被修改的临时变量
    // memory 可以被修改的临时变量
    // storage 可以被修改的永久变量
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        // People memory newPerson = People({favoriteNumber: _favoriteNumber, name: _name});
        // people.push(newPerson);
        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }

    mapping(string => uint256) public nameToFavoriteNumber;
}
