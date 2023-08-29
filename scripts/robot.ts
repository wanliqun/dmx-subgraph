// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

import { Contract } from "ethers";
import { ethers } from "hardhat";

const tokens = [
  "0xe51de16bd52e1e938693a83cc35a9fa171e56f94",
  "0x1f545487c62e5acfea45dcadd9c627361d1616d8"
]

const buyers = [
  "0x7d76b91d7e24be0088cab406ce2792a911914381",
  "0x75677deadc20a4e85800c4f054c51b58f4d9794f",
  "0x5579eb5927ff51c9d790404162c951f0fffa2d42",
  "0xc88194f78e0efc55c545909e1b0dfb6aaca60e5f",
]

let dex: Contract = null
const dexContractAddress = "0x8cD33e369434e6CE4115fff50AD0a117a46B257E"

async function init() {
  dex = await ethers.getContractAt("contracts/dex.sol:DEX", dexContractAddress);
  for (const t of tokens) {
    await dex.add(t)
  }

  return dex
}

async function main() {
  if (!dex) {
    dex = await init()
  }

  const rnd =  Math.random()
  const buyer = buyers[Math.floor(rnd * buyers.length)]
  const token = tokens[Math.floor(rnd * tokens.length)]
  const amount = Math.round(rnd * 10_000)

  await dex.buy(buyer, token, amount)
  console.log("robot action - buyer:", buyer, "token:", token, "amount:", amount, "random:", rnd)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
function doJob() {
  console.log('--- RUN JOB ---')
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
}

setInterval(doJob, 10_000);
