const config = {
    contractName: 'myeosgame111',
    network: {
        blockchain: 'eos',
        host: process.env.NODE_ENV != 'production' ? '//api-kylin.eosasia.one' : 'api1.eosasia.one',
        port: 443, 
        protocol: 'https',
        chainId: process.env.NODE_ENV != 'production' ? '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191' : 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
    }
}

export default config;