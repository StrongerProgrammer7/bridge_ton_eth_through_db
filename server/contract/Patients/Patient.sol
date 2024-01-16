//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;


import "./access/Owner.sol"; //Основной автор openZepplin , для этого контракта немного переделанo
import "./access/Roles.sol"; // ~

/*
 *
 *
 *@title Краткие данные о пациенте
 *Имеется массив адресов врачей, 
 *Если массив пуст, значит ни один врач не имеет доступа к пациенту
 *В массиве содержатся адресов врачей, которым предоставлен доступ
 *@author Abdyukov Z.
 *
 *@notice каждый пользователь сначала регистрируется , 
 *
 */

contract Patient is Owner, AccessControl 
{

    /*
     *@notice для получения доступа к пациенту нужен адрес врача
     */
    string[] private docs;

    // string[] private linksStorage; //содержит хэш файлов в IPFS

    bytes32 private constant DOCTOR_ROLE = keccak256("DOCTOR_ROLE");

    modifier onlyePatientOrDoctor(address account) 
    {
        require(hasRole(DOCTOR_ROLE, account) ||
                hasRole(DEFAULT_ADMIN_ROLE, account),
            " Caller is not doc or patient!"
        );
        _;
    }

    constructor() Owner(msg.sender) {}

    /*
     *@notice регистрация пациента и получение прав админа
     *
     */
    function register(address _patient) external 
    {
        transferOwnership(_patient);
        setAdmin(_patient);
        _setupRole(DEFAULT_ADMIN_ROLE, _patient);  
    }

    /*
    *@notice Возвращает true or false , в зависимости есть ли доступ у врача
    *@param: _doctor адрес врача, который проверяется
    // */
    // function _addressToString(address _addr) private pure returns(string memory) 
    // {
    //     bytes32 value = bytes32(uint256(uint160(_addr)));
    //     bytes memory alphabet = "0123456789abcdef";

    //     bytes memory str = new bytes(51);
    //     str[0] = "0";
    //     str[1] = "x";
    //     for (uint i = 0; i < 20; i++) 
    //     {
    //         str[2+i*2] = alphabet[uint(uint8(value[i + 12] >> 4))];
    //         str[3+i*2] = alphabet[uint(uint8(value[i + 12] & 0x0f))];
    //     }
    //     return string(str);
    // }

    function _checkArray(string memory addr_doctor) private view returns(bool)
    {
        for(uint256 i=0;i<docs.length;i++)
        {
            bool isEqual = (keccak256(abi.encodePacked(addr_doctor)) == keccak256(abi.encodePacked(docs[i])));
            if(isEqual == true)
                return true;
        }
        return false;
    }
    function isAccess(string memory _doctor) external view returns(bool)
    {
       bool access = _checkArray(_doctor);
       return access;
    }

    function setupRole_Doctor(address _patient, string memory _doctor) external onlyOwner(_patient)
     onlyRole(DEFAULT_ADMIN_ROLE, _patient)
    {
        bool isExists = _checkArray(_doctor);
        if(isExists == true)
            return;
        docs.push(_doctor);
    }

    function revokeRole_Doctor(address _patient, string memory _doctor) external onlyOwner(_patient)
        onlyRole(DEFAULT_ADMIN_ROLE, _patient)
    {
        int pos = -1;
        for(uint256 i=0;i<docs.length-1;i++)
        {
            bool isEqual = (keccak256(abi.encodePacked(_doctor)) == keccak256(abi.encodePacked(docs[i])));
            if(pos == -1 && isEqual == true)
                pos = int(i);    

            if(pos!=-1)
                docs[i] = docs[i+1];
        }
        docs.pop();
    }
}
