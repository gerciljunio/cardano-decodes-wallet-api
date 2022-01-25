module.exports = {
    apps: [{
        name: 'cardano-decodes-wallet-api',
        exec_mode: 'cluster',
        instances: '1',
        script: './index.mjs',
    }]
}