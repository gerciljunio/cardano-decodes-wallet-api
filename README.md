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

## Contributing

- Fork this Repo first
- Clone your Repo
- Install dependencies by `$ npm install`
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