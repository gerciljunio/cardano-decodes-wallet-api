const wasm = require('@emurgo/cardano-serialization-lib-nodejs')
const Buffer = require('buffer').Buffer

/**
 * Lists all NFTs in a wallet
 * Compatible data from wallets: Nami, CCVault, Gero, Flint
 * @param {*} balance result from wallet.getBalance
 * @returns object
 */
exports.getNfts = function(balance) {
    let assetList = [];
    let data = wasm.Value.from_bytes(Buffer.from(balance, "hex"))

    let allAssets = data.multiasset();
    let assetTypes = allAssets.keys();
    for (var i = 0; i < assetTypes.len(); i++) {
        let policyId = assetTypes.get(i);
        let assets = allAssets.get(policyId);
        let assetNames = assets.keys();
        for (var x = 0; x < assetNames.len(); x++) {
            let assetName = assetNames.get(x);
            let asset = assets.get(assetName);
            let policyHex = Buffer.from(policyId.to_bytes()).toString('hex');
            let assetHex = Buffer.from(assetName.name()).toString('hex');
            assetList.push({
                token: policyHex + assetHex,
                asset_hex: assetHex,
                asset_name: Buffer.from(assetHex, "hex").toString(),
                policy_id: policyHex,
                qty: Number(asset.to_str())
            })
        }
    }

    return assetList
};

/**
 * Search for NFTs in the wallet
 * Compatible data from wallets: Nami, CCVault, Gero, Flint
 * @param {*} balance result from wallet.getBalance
 * @param {string} query data to be fetched, using % at the start will search for any record that contains the data.
 * @param {string} type name of column to be searched: token, asset_hex, asset_name, policy_id
 * @returns object
 */
exports.searchNft = function(balance, query, type = "policy_id") {

    let nfts = []
    try {
        nfts = this.getNfts(balance)
    } catch (error) {
        console.log("isso")
        nfts = []
    }

    nfts = nfts.filter((item) => {
        if (query.indexOf("@") > -1) {
            return item[type].toLowerCase().indexOf(query.split("@")[1].toLowerCase()) > -1
        } else {
            return item[type].toLowerCase() == query.toLowerCase()
        }
    })

    return nfts
};

/**
 * Returns the total in the wallet
 * Compatible data from wallets: Nami, CCVault, Gero, Flint
 * @param {*} balance result from wallet.getBalance
 * @returns object
 */
exports.getTotalInWallet = function(balance) {
    const value = wasm.Value.from_bytes(Buffer.from(balance, "hex"))
    const locked = wasm.min_ada_required(value, wasm.BigNum.from_str('1000000'))
    const int = (value) => Number(value.to_str());
    const result = int(value.coin()) - int(locked);

    return {
        locked: {
            decimal: int(locked) / 1000000,
            lovelace: int(locked)
        },
        total: {
            decimal: int(value.coin()) / 1000000,
            lovelace: int(value.coin())
        },
        total_free: {
            decimal: result / 1000000,
            lovelace: result
        },
    };
};

/**
 * Returns formatted address, ready to use
 * Compatible data from wallets: Nami, CCVault, Gero, Flint
 * @param {*} data result from: wallet.getUsedAddresses, wallet.getUnusedAddresses, wallet.getChangeAddress, wallet.getRewardAddresses
 * @returns string
 */
exports.getAddressString = function(data) {
    let addrString = typeof(data) == "object" ? data[0] : data
    const addr = wasm.Address.from_bytes(Buffer.from(addrString, "hex"))
    return addr.to_bech32()
};