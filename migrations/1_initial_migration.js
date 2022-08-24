const casino = artifacts.require("casino");

module.exports = function(deployer) {
  deployer.deploy(casino);
};
