# LibTrade

A textbook exchange service for university students.

## Prerequisites

* Ubuntu Server 16.04+ LTS
* MySQL Server 5.7+

## Installing LibTrade

### Quick Start

The following steps are intended to prepare LibTrade for usage quickly. They do not address a secure or scalable installation. As such, they should be used when considering LibTrade for usage:

* Pull the desired [LibTrade release](https://github.com/jonhermsen-UNO/LibTrade/releases)
* Install the required client and server dependencies

  ```bash
  # Install client dependencies
  cd client
  npm install

  # Install server dependencies
  cd server
  npm install
  ```

* Create a Google API key in the [Google developer console](https://console.developers.google.com/apis/credentials)
* Create a `/server/config/` folder with the following files and contents (change values as necessary):

  ```js
  // /server/config/keys.js
  module.exports = {
    google: { apiKey: 'GOOGLE_API_KEY' },
    session: 'SESSION_SECRET'
  }

  // /server/config/database.js
  module.exports = {
    host: 'localhost',
    database: '',
    username:'',
    password: '',
    dialect: 'mysql'
  }
  ```

## Using LibTrade

Before using LibTrade in a web browser, the application server and API server must both be started. Each server should be started using a separate terminal window.

```bash
# Start the application server
cd client
npm run serve

# Start the API server
cd server
npm run serve
```

## Attribution

* Bootstrap
* Google Books
* NodeJS 12.19
* NPM 6.14
  * Axios
  * Express
  * Jest
  * MySQL
  * Passport
  * Sequelize
  * Vue

## Contributors

* [@Cyber1551](https://github.com/Cyber1551)
* [@jonhermsen-UNO](https://github.com/jonhermsen-UNO)
* [@shire17](https://github.com/shire17)
* [@uforiginal](https://github.com/uforiginal)
