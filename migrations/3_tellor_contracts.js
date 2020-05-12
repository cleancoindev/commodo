/****Uncomment the body below to run this with Truffle migrate for truffle testing*/
var TellorTransfer = artifacts.require("../node_modules/usingtellor/contracts/libraries/TellorTransfer.sol");
var TellorLibrary = artifacts.require("../node_modules/usingtellor/contracts/libraries/TellorLibrary.sol");
var TellorGettersLibrary = artifacts.require("../node_modules/usingtellor/contracts/libraries/TellorGettersLibrary.sol");
var Tellor = artifacts.require("../node_modules/usingtellor/contracts/Tellor.sol");
var TellorMaster = artifacts.require("../node_modules/usingtellor/contracts/TellorMaster.sol");
var UserContract = artifacts.require("../node_modules/usingtellor/contracts/UserContract.sol");
/****Uncomment the body to run this with Truffle migrate for truffle testing*/
var Bank = artifacts.require("Bank");
var CT = artifacts.require("GLDToken");
var DT = artifacts.require("USDToken");

/**
*@dev Use this for setting up contracts for testing
*/

//userContractAddress = ;
/****Uncomment the body below to run this with Truffle migrate for truffle testing*/
module.exports = async function (deployer) {

  // deploy transfer
  await deployer.deploy(TellorTransfer);

  // deploy getters lib
  await deployer.deploy(TellorGettersLibrary);

  // deploy lib
  await deployer.link(TellorTransfer, TellorLibrary);
  await deployer.deploy(TellorLibrary);

  // deploy tellor
  await deployer.link(TellorTransfer,Tellor);
  await deployer.link(TellorLibrary,Tellor);
  await deployer.deploy(Tellor);
  // deploy tellor master
  await deployer.link(TellorTransfer,TellorMaster);
  await deployer.link(TellorGettersLibrary,TellorMaster);
  await deployer.deploy(Tellor).then(async function() {
    await deployer.deploy(TellorMaster, Tellor.address).then(async function(){
      await deployer.deploy(UserContract,TellorMaster.address).then(async function() {
        return deployer.deploy(CT, "10000000000000000000000").then(function() {
          return deployer.deploy(DT, "10000000000000000000000").then(function() {
            return deployer.deploy(Bank, 12, 1, 150, 25, CT.address, DT.address, UserContract.address)
          });
        });
      });
    })
  });

};