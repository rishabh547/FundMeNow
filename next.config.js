/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ACCOUNT_MNEMONIC: process.env.ACCOUNT_MNEMONIC,
    RINKEBY_ENDPOINT: process.env.RINKEBY_ENDPOINT,
    DEPLOYED_ADDRESS: process.env.DEPLOYED_ADDRESS,
    ROPSTEN_ENDPOINT: process.env.ROPSTEN_ENDPOINT,
    ROPSTEN_DEPLOYED_ADDRESS: process.env.ROPSTEN_DEPLOYED_ADDRESS,
    GANACHE_MNEMONIC: process.env.GANACHE_MNEMONIC,
    GANACHE_ENDPOINT: process.env.GANACHE_ENDPOINT,
    GANACHE_DEPLOYED_ADDRESS: process.env.GANACHE_DEPLOYED_ADDRESS,
  },
  reactStrictMode: true,
}

module.exports = nextConfig
