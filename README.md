# Mailosaur Helper for CodeceptJS

## Installation

```js
npm i codeceptjs-mailosaur --save
```

## Configuration

This plugin should be added in `codecept.conf.js`

Example:

```js
{
  //...
   plugins: {
    Mailosaur: {
          require: 'codeceptjs-mailosaur',
          apiKey: MAILOSAUR_API_KEY,
          serverId: MAILOSAUR_SERVER_ID,
          timeout: 15000,
        },
  //...
}
```

To use this plugin you need to provide the following info:

- `apiKey`: which can be found in API tab on a server page in Mailosaur UI.
- `serverId`: Mailosaur Server ID to use for tests
- `timeout(optional)`: timeout in milliseconds to wait for emails. Default value is 10000ms

