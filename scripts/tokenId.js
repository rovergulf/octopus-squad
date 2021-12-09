const {API_KEY, PRIVATE_KEY, CONTRACT_ADDR} = process.env;

const {ethers} = require('hardhat');
const contract = require('../artifacts/contracts/OctopusSquad.sol/OctopusSquad.json');

// Alchemy provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network = 'rinkeby', API_KEY);

// signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

const octopusSquad = new ethers.Contract(CONTRACT_ADDR, contract.abi, signer);

async function main() {
    const tokenId = await octopusSquad.currentTokenId();
    console.log('Current token id: ', tokenId);
}

main()
    .then(res => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });


