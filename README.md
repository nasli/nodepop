# nodepop

Server software that will run on the server to provide an API to support an ads app of second-hand selling. 

Use NodeJS, ExpressJS, MongoDB and MongooseJS

## Deployed

- Used *PM2* in order to keep Nodepop intact across expected or unexpected machine restarts.

- Deployed using Nginx as reverse proxy: 
````
nodepop.nasli.io
template.nasli.io
````

- Serving Static files by Nginx instead of Express and added custom header *X-Owner* to check who is serving it.
Example static file provided by Nginx: 
```
nodepop.nasli.io/images/ads/bikeDesign.jpg
```

- Configured upgrade script for new versions that will retrieve latest git version and restart app.

- Added some security settings

- Added SSL certificates 

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

## Config env variables

You can set up the following env variables:
DATABASE_URI
PORT

## Development

To start the application in development mode use:

```shell
npm run dev
```

### Install data in DB from JSON

To start the application in development mode and pre loading test data in DB use:
```shell
npm run installDB
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

### Tags 

To obtain a list of all available tags for ads use next endpoint with a JWT:

    http://localhost:3000/apiv1/ads/tags?token=
 

### Users
    http://localhost:3000/apiv1/users

To create new user make a POST to: 

    / apiv1/users with the name, email and password. 

Password will be encripted with crypto hash lib.

### Authentication

To obtain a token make a POST to: 

    /apiv1/users/authenticate with email and password

Use that token in the rest of request in:
    
    - header: 'x-access-token'
    - body: token
    - query string: token

