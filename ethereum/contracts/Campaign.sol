// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
// G means global

contract CampaignFactory{
address[] public deployedCampaigns;

function createCampaign(uint minimum) public{
    //here msg.sender refers to creater of a new campaign(i.e manager) below
    //we create new instance of a new campaign
    address newCampaign = address(new Campaign(minimum,msg.sender));
    //Stores address of every new campaign created on website
    deployedCampaigns.push(newCampaign);
}
    //Fn below to return list of all deployed campaigns on website
    //View means no data inside contract will be modified
    function getDeployedCampaigns() public view returns (address[] memory){
        return deployedCampaigns;
    }
}


contract Campaign {
    //For Request we will define a Struct definition(diff from instance variables)
    //Structure refers to a collection consisting of elements of heterogeneous data type.
    struct Request{
        //Why Request for money is made by Manager
        string description;
        //Amount requested
        uint value;
        //Vendor who will receive money from manager
        address recipient;
        //Boolean to keep track if req has already been processed or not
        bool complete;
        //keeps track of no of "Yes" votes 
        uint approvalCount;
        // People who have given approvals to request
        mapping(address => bool) approvals;
    }
    //Now in approvers part we will replace array parts with  Mapping to avoid spending of gas
    //(Contract-level Variables i.e instance)
    //Now we make an array of Requests Struct defined above
    Request[] public requests;
    //Below We have Defined Instance Variable
    address public manager;
    uint public minimumContribution;
    //An array of approvers(Contributors to Campaign)
    //To Keep track if they have approved or not using their address
    mapping(address=>bool) public approvers;
    //ApproversCount
    uint public approversCount;

    //We will define a function modifier to restrict access to certain fns
    //like createRequest, finalizeReq
    modifier restricted(){
        //Manager
        require(msg.sender==manager); 
        _;
    }
    //Constructor below
    //no need to mention public below
    //Value is wei as of now not in ether
    constructor(uint minimum,address creator){
        //msg - G variable & sender is used to tell us who is creating a smart contract
        //here msg.sender will refer to address of campaign factory not of campaign creator
        //so we use creator local variable for it
        manager = creator;
        minimumContribution = minimum;

    }
    //Payable to send money as transaction by a Contributor
    function contribute() public payable {
        require(msg.value>minimumContribution);
        //Once it satisfies min contribution val we store contributors address in array(Mapping) below
        approvers[msg.sender] = true;
        //Above means that particular address is now an approver
        approversCount++;
    }

    //We will make createRequest fn and restrict access to it
    //define arguments to fill in the request
    function createRequest(string memory description, uint value,address recipient) 
        public restricted{
            //We create a new instance of Request Struct(Key:Value) Pair
            Request storage newRequest = requests.push();
            newRequest.description = description;
            newRequest.value = value;
            newRequest.recipient =  recipient;
            newRequest.complete = false;
            newRequest.approvalCount =0;

            //Old deprecated version below
            // Request memory newRequest = Request({
            // description : description,
            // value : value,
            // recipient :  recipient,
            // complete : false,
            // approvalCount:0
            // });
        // requests.push(newRequest);
    }

    //Approve Request function where we provide index to select which request to approve
    function approveRequest(uint index) public {
        //Make requests[index] a local variable since we use it quite often
        //Manipulation copy of the struct of this Request below
        Request storage request = requests[index];
        //First check if they are an approver
        require(approvers[msg.sender]);
        //Now Check if he hasn't already voted for this request
        require(!request.approvals[msg.sender]);

        //Now if we reach here that means above have passed and assign true to current approverStatus
        request.approvals[msg.sender] = true;
        request.approvalCount++;

        
    }
    //Manager will only finalize
    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];
        //More than 50% majority for voting
        require(request.approvalCount > (approversCount/2));
        //Make sure payout to recipient(vendor) is not complete
        require(!request.complete);
        //Below to transfer money to vendor(Make recipient payable)
        payable(request.recipient).transfer(request.value);
        //Now after this once payout is complete make it true
        request.complete = true;

    }



}