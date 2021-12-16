/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");

const {
    CURRENT_NETWORK,
    TEST_PRIVATE_KEY,
    PRIVATE_KEY,
    ETHERSCAN_API_KEY,
    POLYGONSCAN_API_KEY,
    RINKEBY_API_URL,
    MAINNET_API_URL,
    POLYGON_API_URL,
    MUMBAI_API_URL
} = process.env;

const etherscanApiKey = CURRENT_NETWORK === 'matic' || CURRENT_NETWORK === 'mumbai' ?
    POLYGONSCAN_API_KEY : ETHERSCAN_API_KEY;

module.exports = {
    solidity: {
        version: "0.8.9",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    defaultNetwork: 'rinkeby',
    optimizer: true,
    networks: {
        hardhat: {},
        mainnet: {
            url: MAINNET_API_URL,
            accounts: [`0x${PRIVATE_KEY}`]
        },
        polygon: {
            url: POLYGON_API_URL,
            accounts: [`0x${PRIVATE_KEY}`]
        },
        mumbai: {
            url: MUMBAI_API_URL,
            accounts: [`0x${TEST_PRIVATE_KEY}`]
        },
        rinkeby: {
            url: RINKEBY_API_URL,
            accounts: [`0x${TEST_PRIVATE_KEY}`]
        },
        localhost: {
            url: 'http://localhost:7545',
            accounts: [`0x${TEST_PRIVATE_KEY}`]
        }
    },
    etherscan: {
        apiKey: etherscanApiKey
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    },
};
