const {
    CURRENT_NETWORK = 'mumbai'
} = process.env;

async function main() {
    const chicks = await ethers.getContractFactory('OctopusSquad');
    const factory = await ethers.getContractFactory('OctopusFactory');

    // OpenSea proxy registry addresses for rinkeby and mainnet.
    let proxyRegistryAddress = "";
    if (CURRENT_NETWORK === 'rinkeby') {
        proxyRegistryAddress = "0xf57b2c51ded3a29e6891aba85459d600256cf317";
    } else if (CURRENT_NETWORK === 'polygon') {
        // https://docs.opensea.io/docs/polygon-basic-integration
        proxyRegistryAddress = "0x58807baD0B376efc12F5AD86aAc70E78ed67deaE";
    } else if (CURRENT_NETWORK === 'homestead') { // eth mainnet
        proxyRegistryAddress = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";
    } else {
        console.error("Invalid network");
        process.exit(1);
    }

    console.log(`Current network: ${CURRENT_NETWORK}; Provider: ${proxyRegistryAddress}`);

    const itemsContract = await chicks.deploy(proxyRegistryAddress);
    await itemsContract.deployed();

    console.log('Items contract deployed to address: ', itemsContract.address);

    const saleContract = await factory.deploy(itemsContract.address, proxyRegistryAddress);
    await saleContract.deployed();

    console.log('Sale contract deployed to address: ', saleContract.address);

    console.log('Transfer token metadata ownership...');

    const transferTx = await itemsContract.transferOwnership(saleContract.address);
    transferTx.wait();

}

main()
    .then(res => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

