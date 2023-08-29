import { ethers } from "hardhat";

async function main() {
  const dex = await ethers.deployContract("DEX");
  await dex.waitForDeployment();

  console.log("DEX deployed to:", dex.target);
  console.log("DEX deploy transaction:", dex.deployTransaction);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
