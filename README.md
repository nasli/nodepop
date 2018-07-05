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

*Collection Ads:*  Has information about your ads

*Collection Users:*  Has information about registered users

## API documentation

### Ads
    http://localhost:3000/apiv1/ads


### Users
    http://localhost:3000/apiv1/users


### Filter

On each collection you can filter results

    http://localhost:3000/apiv1/collectionName?skip=0&limit=2&fields=name&sort=name

*Paginate*

    ?skip=1&limit=2

*Filter properties to show*

    &fields=name

*Sort by*

    &sort=name 


