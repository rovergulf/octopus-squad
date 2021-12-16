const {
    CURRENT_NETWORK = 'mumbai'
} = process.env;

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const octopuses = await ethers.getContractFactory('OctopusSquad');

    const contract = await octopuses.deploy(
        'https://api.rovergulf.net/nft/metadata/test-octopuses/',
        'https://api.rovergulf.net/nft/metadata/test-octopuses'
    );
    await contract.deployed();

    console.log('Items contract deployed to address: ', contract.address);
}

main()
    .then(res => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

