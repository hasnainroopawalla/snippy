# ✂️ Snippy

A lightning-fast platform for seamless data transfer across devices using shareable URLs.

🚀 Check it out at - [snippyio.vercel.app](snippyio.vercel.app)

## Features

- **Fast and Simple**: Quickly transfer data between devices with ease
- **Shareable URLs**: Generate unique URLs for accessing your data from any device
- **End-to-end Encryption**: Protect sensitive data with a password to restrict access. The password is hashed and used to encrypt your data - only **you** can see it (not even us)

## Usage

1. Paste your text or data into the app
2. Hit _Save_ to generate a unique URL
3. Use the URL to access your data from any other device

## Run it Locally

```
$ git clone https://github.com/hasnainroopawalla/snippy.git
$ cd snippy

$ yarn install
$ yarn start
```

## Testing

```
$ yarn test:unit

$ npx playwright install --with-deps chromium
$ yarn test:playwright
```

## Tech Stack

- React, TypeScript
- Apollo Client, GraphQL
- Supabase
- TanStack

## Contributing

- Post any issues or suggestions on the GitHub [issues](https://github.com/hasnainroopawalla/snippy/issues) page.
- To contribute, fork the project and then create a pull request back to `main`.
