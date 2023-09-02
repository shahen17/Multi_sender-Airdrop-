const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("MulitSender", async function () {
  async function deployMultiSender(addressLimit, tokenAddress) {
    const [owner, otherAccount1, otherAccount2, otherAccount3] = await ethers.getSigners();
    const MultiSender = await ethers.getContractFactory("multiSender");
    const multiSender = await MultiSender.deploy(addressLimit, tokenAddress);

    return { multiSender, owner: owner, otherAccounts: [otherAccount1.address, otherAccount2.address, otherAccount3.address] };
  }

  it("Should set the right owner", async function () {
    const { multiSender, owner } = await deployMultiSender(10, ethers.ZeroAddress);
    expect(await multiSender.owner()).to.equal(owner.address);
  });

  it("Should set the right address limit", async function () {
    const { multiSender } = await deployMultiSender(10, ethers.ZeroAddress);
    expect(await multiSender.addressLimit()).to.equal(10);
  });

  it("Should set the right token address(es)", async function () {
    const { multiSender } = await deployMultiSender(10, ethers.ZeroAddress);
    expect(await multiSender.tokenAddress()).to.equal(ethers.ZeroAddress);
    expect(await multiSender.token()).to.equal(ethers.ZeroAddress);
  });

  it("Should send 1 ETH to 3 addresses (fails)", async function () {
    // THIS FAILS BECAUSE THE CONTRACT DOESN'T HAVE ENOUGH ETH TO SATISFY THE 3 WITHDRAWALS
    const { multiSender, otherAccounts } = await deployMultiSender(10, ethers.ZeroAddress);
    await multiSender.sendEth(otherAccounts, { value: ethers.parseEther("1") });
  });

  it("Should send 1 ETH to 3 addresses (succeeds)", async function () {
    // THIS SUCCEEDS BECAUSE WE FUND THE CONTRACT WITH ENOUGH ETH TO MAKE UP THE DIFFERENCE
    const { multiSender, owner, otherAccounts } = await deployMultiSender(10, ethers.ZeroAddress);
    await owner.sendTransaction({ to: multiSender.target, value: ethers.parseEther("2")});
    await multiSender.sendEth(otherAccounts, { value: ethers.parseEther("1") });
  });
});