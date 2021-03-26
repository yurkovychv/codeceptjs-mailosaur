# Mailosaur Helper for CodeceptJS

[Mailosaur](https://mailosaur.com/) Helper for Codeceptjs is useful for email based testing with [Codeceptjs](https://codecept.io/)

It gives users the ability to perform the following operation: 

1) Create new email address
2) List emails
3) List Content of Emails, including Subject (allows searching for texts, links etc)
4) Allows to delete test emails. 

## Installation

```js
npm i codeceptjs-mailosaurhelper --save
```

## Configuration

This plugin should be added in `codecept.conf.js`

Example:

```js
{
  //...
   plugins: {
    Mailosaur: {
          require: 'codeceptjs-mailosaurhelper',
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

## Usage Example

After enabling the helper at Configuration, simply use it with Actor Object in your test files 

```js

I.generateNewEmail();
I.listMessages();
```
