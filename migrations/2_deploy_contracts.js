const StarNotary = artifacts.require("../contracts/StarNotary.sol");

module.exports = function(deployer) {
  deployer
    .deploy(StarNotary)
    .then(() => console.log("Deployment address: ", StarNotary.address));
};
