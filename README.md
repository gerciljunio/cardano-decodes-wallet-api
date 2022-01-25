# Cardano Decodes Wallet API

## Installation

This package works from the command line! So it is necessary to install globally via NPM.

```bash
npm i -g cardano-decodes-wallet-api
```

## Use

To start the service I use [PM2](https://github.com/Unitech/pm2) but you can do it any way you need.

```bash
pm2 start cardano-decodes-wallet-api
```

You may want to set the port where the service will start.  
**By default it starts on port 4002**.

```bash
pm2 start cardano-decodes-wallet-api -- --port 4004
```

Otherwise you can start the service however you like by running command:

```bash
cardano-decodes-wallet-api
```

Or defining a port:
```bash
cardano-decodes-wallet-api --port 4004
```

## Endpoints

Return balance through data collected in wallet.getBalance method from wallets compatible with [CIP-0030](https://github.com/cardano-foundation/CIPs/tree/master/CIP-0030).

```js
/decodes/balance/code_from_wallet_getBalance
```

Response

```js
{
    "locked": {
        "decimal": 1.48148,
        "lovelace": 1481480
    },
    "total": {
        "decimal": 7.017871,
        "lovelace": 7017871
    },
    "total_free": {
        "decimal": 5.536391,
        "lovelace": 5536391
    }
}
```

Return all NFTs through data collected in wallet.getBalance method from [CIP-0030](https://github.com/cardano-foundation/CIPs/tree/master/CIP-0030) compliant wallets.

```js
/decodes/nfts/code_from_wallet_getBalance
```

Response

```js
{
    "data": [{
        "token": "aec5a6dac10ec781df9f337d33ef7d55b9b48535668b8038affa326c4c696c476f61743036343236",
        "asset_hex": "4c696c476f61743036343236",
        "asset_name": "LilGoat06426",
        "policy_id": "aec5a6dac10ec781df9f337d33ef7d55b9b48535668b8038affa326c",
        "qty": 1
    }],
    "total": 1
}
```

Return all human-readable addresses through data collected in wallet.getUsedAddresses, wallet.getUnusedAddresses, wallet.getChangeAddress, wallet.getRewardAddresses methods of [CIP-0030](https://github.com/cardano-foundation/CIPs/tree/master/CIP-0030) compliant wallets.

```js
/decodes/address/code_from_wallet
```

Response Address

```js
[
    "addr_test1qphl6y5cgjq4tquv9kngd959z9hexze7vlcrg504aql7dh47ec4mkh9pe4f33rhgtp7twaufavmza8ju7dwl9y5zm3yq28cxvn"
]
```

Response Stake Adress

```js
[
    "stake1uxjq7qun5w4dk79a49s04ker42d486j4zmqhl8hzk46a88ctdjwc7"
]
```

Search for NFTs through data collected in the wallet.getBalance method of wallets compatible with [CIP-0030](https://github.com/cardano-foundation/CIPs/tree/master/CIP-0030).

TYPE: all columns that can be fetched
 - token
 - asset_hex
 - asset_name
 - policy_id

QUERY: data to fetch, if TYPE is policy_id, then query is the policyID to find.

```js
/decodes/nfts/search/QUERY/TYPE/code_from_wallet_getBalance
```

In QUERY when used an @ before the word it searches for any part of an item, similar to what SQL LIKE does.

```js
/decodes/nfts/search/@QUERY/TYPE/code_from_wallet_getBalance
```

> I recommend and, if necessary, that the **index.js** file be analyzed for a better understanding.

## Contributing

- Fork this Repo first
- Clone your Repo
- Install dependencies by `npm install`
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Publish your local branch, Open a pull request

## MIT License

Copyright (c) 2022 Gercil Junio

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.