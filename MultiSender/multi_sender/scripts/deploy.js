async function main() {
  const payableAmount = ethers.parseEther("0.03");
  const addressLimit = 100; // max address limit
  const multisender = await hre.ethers.deployContract("multiSender", [`${addressLimit}`, "erc20 address here"], {
    value: payableAmount,
  });

  await multisender.waitForDeployment();

  console.log(`deployed to ${multisender.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});