# GraphQL Server with Prisma Example

This example shows how to implement a GraphQL server with Typescript based on [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client), [apollo-server](https://www.apollographql.com/docs/apollo-server). It is based on PostgreSQL hosted in Heroku.

To view the app: visit: [https://nodejs-application-api.herokuapp.com/](https://nodejs-application-api.herokuapp.com/) for the api and [https://nodejs-application-client.herokuapp.com/](https://nodejs-application-client.herokuapp.com/) for the frontend.

## Getting started - Server API

### 1. Download and install dependencies

Clone this repository

```
git clone https://github.com/manteleannkatherine/nodejs-app.git
cd nodejs-app
```

Install npm dependencies for the server api

```
cd server
npm install
```

Install npm dependencies for the frontend

```
open new terminal
cd client
npm install
```

### 2. Create and seed the database

Run the following command to create the database. This also creates all Tables defined in [`prisma/schema.prisma`](./server/schema.prisma):

```
cd server
npx prisma migrate dev --name init
```

Now, seed the database with the sample data in [`prisma/seed.ts`](./server/prisma/seeds.ts) by running the following command:

```
npx prisma db seed
```

### 3. Start the application

Launch your GraphQL server with this command:

```
cd server
npm run dev
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of your GraphQL server

Launch the frontend application

```
open new terminal
cd client
npm start
```

For deployment of GraphQL visit: [https://www.prisma.io/docs/guides/deployment/deployment](https://www.prisma.io/docs/guides/deployment/deployment)

For deployment of the frontend visit: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)
