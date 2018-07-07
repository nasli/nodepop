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

## Start

To start the app use:

```shell
npm start
```

To start in cluster mode use:

```shell
npm run cluster
```

## Development

To start the application in development mode use:

```shell
npm run dev
```

### Install data in DB from JSON

To start the application in development mode and pre loading test data in DB use:
```shell
npm run install_db
```

## Views

Templates engine ejs with extension html.

## DB Schema

*Collection Ads:*  Has information about your ads

*Collection Users:*  Has information about registered users

## API documentation

### Ads
    http://localhost:3000/apiv1/ads

#### Filter ads

You can filter results

    http://localhost:3000/apiv1/ads?tags=mobile&sale=false&name=ip&price=50-&skip=0&limit=2&sort=price&fields=name,price

*Filter properties, show all that match conditions*

    &tags=              [ options (mobile, work, lifestyle, motor)]
         =mobile        --> with tag mobile
         =mobile,work   --> with tag mobile or tag work

    &sale=              [options (false/true)]
         =false         --> with sale false
         =true          --> with sale true

    &name=ip            --> show all with name that start with "ip"

    &price=10-50        --> between prices 10-50
          =10-          --> with price over 10
          =-50          --> with price under 50
          =50           --> with price equal to 50

*Paginate*

    ?skip=1&limit=2     --> skip 1 and show all that match with a limit of 2

*Filter properties to show*

    &fields=            [ options (name, sale, price, image, tags)]
           =name        --> only show the property name in the results
           =name,price  --> only show the properties name and price in the results

*Sort by*

    &sort=name          --> sort by property name

*Token*

    &token=             --> to allow access use JWT

### Users
    http://localhost:3000/apiv1/users

### Authentication

To obtain a token make a POST to: /apiv1/users/authenticate with email & password

Use that token in the rest of request in:
    - header: 'x-access-token'
    - body: token
    - query string: token

