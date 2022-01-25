#! /usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const express = require('express')
const core = require('./core.js')

const app = express();
const PORT = argv.port || 4002;

app.get('/decodes/nfts/search/:query?/:type?/:balance?', (request, response) => {
    try {
        let query = request.params.query || request.headers.query || null
        let type = request.params.type || request.headers.type || null
        let balance = request.params.balance || request.headers.balance || null
        let result

        if (query && type && balance) {
            result = core.searchNft(balance, query, type)
        } else {
            result = core.getNfts(balance)
        }

        response.json({
            data: result,
            total: result.length
        })

    } catch (error) {
        response.status(404).json({
            error: error.message
        });
    }
});

app.get('/decodes/:action/:hex?', (request, response) => {
    try {
        let action = request.params.action || request.headers.action
        let hex = request.params.hex || request.headers.hex

        if (action == "balance") {
            response.json(core.getTotalInWallet(hex))
        }

        if (action == "nfts") {
            let result = core.getNfts(hex)
            response.json({
                data: result,
                total: result.length
            })
        }

        if (action == "address") {
            response.json([
                core.getAddressString(hex)
            ])
        }
    } catch (error) {
        response.status(404).json({
            error: error.message
        });
    }
});

app.listen(PORT);