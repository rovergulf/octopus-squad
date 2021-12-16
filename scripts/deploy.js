const {
    CURRENT_NETWORK = 'mumbai'
} = process.env;

async function main() {
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

