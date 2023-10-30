import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@symblox/hardhat-abi-gen";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    evmtestnet: {
      url: "https://evmtestnet.confluxrpc.com",
      accounts: ["6d61120eace48811c3f64d0a75599b43f4e61207d4c7802e7b2dacbb486d4fda"],
    }
  },
  abiExporter: {
    // The output directory for the ABI files
    path: "./abis",
    // The contracts to include or exclude from the export
    only: ["lauchpad", "registry"],
    // The formatting options for the ABI files
    clear: true,
    flat: true,
    spacing: 2
  }
};

export default config;
