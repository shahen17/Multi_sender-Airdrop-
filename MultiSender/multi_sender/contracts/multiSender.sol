// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract multiSender{
    address public owner;  //deployer/owner address
    uint public addressLimit; // max address limit per call
    address public tokenAddress; // erc20 token address
    IERC20 public token; //erc20 token defined address


    constructor(uint _addressLimit, address _tokenAddress) {
        owner = msg.sender;
        addressLimit = _addressLimit;
        tokenAddress = _tokenAddress;
        token = IERC20(tokenAddress);
    }



    function sendEth(address[] calldata addresses) external payable byOwner {
        require(msg.value != 0);
        require(addresses.length <= addressLimit);
        uint amount = msg.value;
        uint length = addresses.length;
        for (uint i = 0; i < addresses.length; i++) {
            address recipient = addresses[i];
            (bool s, ) = recipient.call{value: amount/length}("");
            require(s, "eth transfer filed");
        }
    }

    function withdrawEth(uint _amount) external byOwner {
        payable(msg.sender).transfer(_amount);
    }

    function tokenBalance() public view returns(uint) {
        uint balance = token.balanceOf(address(this));
        return balance;
    }

    function withdrawTokens(uint _amount) external byOwner {
        require(token.balanceOf(address(this)) >= _amount);
        token.transfer(msg.sender, _amount);
    }

    function sendTokens(address[] calldata addresses, uint _amount) external payable byOwner {
        require(_amount != 0);
        require(addresses.length <= addressLimit);
        require(token.transferFrom(msg.sender, address(this), _amount));
        uint length = addresses.length;
        for (uint i = 0; i < addresses.length; i++) {
            address recipient = addresses[i];
            token.transfer(recipient, _amount/length);
        }
    }

    
    

    modifier byOwner() {
        require(msg.sender == owner);
        _;
    }

    receive() external payable {
        require(msg.sender == owner);
    }
}
