//contract
pragma solidity ^0.5.4;

contract Web3Test{
    
    uint public a;
    
    uint[] public aArray;
    
    event EventTest(uint money); 
    
    function testSend1() public{
        a=1;
    }
    
    function testCall1() public view returns(uint){
        return a;
    }
    
    function testSend2(uint _a1,uint _a2) public{
        aArray.push(_a1);
        aArray.push(_a2);
    }
    
    function testCall2(uint _n1,uint _n2) public view returns(uint,uint){
        return(aArray[_n1],aArray[_n2]);
    }
    
    function testEvent() public payable{
        emit EventTest(msg.value);
    }
    
}
