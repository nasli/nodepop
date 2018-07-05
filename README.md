# nodeapi

## Installation

Install dependencies with:

```shell
npm install
```

### MongoDB

This application uses MongoDB. To start MongoDB you can use:

```shell
./bin/mongod --dbpath ./data/db --directoryperdb
```

## Development

To start the application in development mode use:

```shell
npm run dev
```

## Views

Templates engine ejs with extension html.

## DB Schema

Collection Ads: Has information about your ads


## API documentation

http://localhost:3000/apiv1/ads?skip=0&limit=2&fields=name&sort=name

To paginate results you can use:
?skip=1&limit=2

To choose only some fields:
&fields=name%20-_id

To sort
&sort=name
