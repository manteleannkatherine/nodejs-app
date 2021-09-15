# Getting Started with NodeJS API

## Prerequisites

### Install dependencies
```sh
  yarn init
  
  yarn add apollo-server graphql  
  yarn add class-validator type-graphql reflect-metadata class-validator 	
  yarn add -D typescript ts-node-dev ts-node @types/node @types/ws	
  yarn add typegraphql-prisma graphql-type-json graphql-fields	
  yarn add @types/lodash axios
```

### Setup PostgreSQL

- Install PostgreSQL
- Create local database connection

### Setup Prisma
```sh
  npx prisma init
```
- In `schema.prisma`, create your models
```sh
  generator typegraphql {
    provider = "typegraphql-prisma"
    output   = "../src/generated/typegraphql-prisma"
  }
  
  model Product {
    id            String     @id @default(uuid())
    createdAt     DateTime   @default(now())
    updatedAt     DateTime   @updatedAt
    name          String
    image         String
    description   String?
    quantity      Int
    price         Float      @default(0.00)
    orderDetails  OrderDetail[]
  }

  model Order {
    id            String    @id @default(uuid())
    createdAt     DateTime  @default(now())
    updatedAt     DateTime  @updatedAt
    customerId    Int?
    customer      User?     @relation(fields: [customerId], references: [id])
    orderDetails  OrderDetail[]
  }

  model OrderDetail {
    id          String      @id @default(uuid())
    createdAt   DateTime    @default(now())
    updatedAt   DateTime    @updatedAt
    productId   String?
    product     Product?    @relation(fields: [productId], references: [id])
    orderId     String
    order       Order?      @relation(fields: [orderId], references: [id])
    quantity    Int?
    totalPrice  Float      @default(0.00)
  }


  model User {
    id          Int       @id @default(autoincrement())
    createdAt   DateTime  @default(now())
    updatedAt   DateTime  @updatedAt
    email       String    @unique
    firstName   String?
    lastName    String?
    address     String?
    orders      Order[]
  }
```
- In `.env`, update `DATABASE_URL` with your local database connection
- In prisma folder, add `seeds.ts` file
```sh
import { PrismaClient, Product } from '@prisma/client';
import axios from 'axios';
import { each } from 'lodash';
var faker = require('faker');

const prisma = new PrismaClient();

const randomQuantity = (max: number = 10) => Math.floor(Math.random() * max) + 1;

const InitializeSeeding = async () => {
  console.log('Start seeding....');
	
  const { data } = await axios.get('https://fakestoreapi.com/products');

  each(data.slice(10), (value) => {		
    const product: any = {
      name: value.title,			
      price: value.price,			
      image: value.image,			
      quantity: randomQuantity(),			
      description: value.description,
    };
    
    prisma.product
      .create({ data: product })
      .catch((e) => console.log('error', e));
  });

  // User Seeding
  for (let i = 0; i < 5; i++) {
    const user: any = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      address: faker.address.country(),
    };
    
    await prisma.user.create({ data: user });
  }
  
  console.log('seeding completed....');
};

InitializeSeeding()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### Create `tsconfig.json`
```sh
  {    
    "compilerOptions": {        
        "outDir": "dist",        
        "rootDir": "src",        
        "esModuleInterop": true,        
        "target": "ES2018",        
        "module": "commonjs",        
        "lib": [
            "ES2018",
            "ES2018.AsyncIterable"
        ],        
        "experimentalDecorators": true,        
        "emitDecoratorMetadata": true
    },    
    "include": ["src/**/*"]
  }  
```

### Update `package.json`
```sh
  "scripts": {		
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",			
    "generate": "yarn -s run generate:prisma",		
    "generate:prisma": "prisma generate"	
  },	
  "prisma": {		
    "seed": "ts-node prisma/seeds.ts"	
  }  
```

## Migration
- Create `Procfile`
```sh
  web: npm start

  release: npx prisma migrate deploy
```
- Create migration script and migrate to local database
```sh
  npx prisma migrate dev --name init
```
- Generate TypeGraphQL classes and CRUD resolvers
```sh
  npx prisma generate
```
- Execute seeding
```sh
  npx prisma db seed
```

## Deployment 
- Install Heroku CLI
- Login to Heroku
```sh
  heroku login
```
### Setup API
- Commit API source to heroku
```sh
  git init
  git add .
  git commit -m "Initial commit"
```
- Create heroku app
```sh
  heroku apps:create $APP_NAME
```
- Add PostgreSQL to app
```sh
  git remote -v
  heroku addons:create heroku-postgresql:hobby-dev
```
- Replace `DATABASE_URL` in `.env` file with new heroku app URI
- To deploy, push source to heroku
```sh
  git push heroku master
```
- Run `$APP_NAME.herokuapp.com` 
- Dev mode: `yarn run dev`

### Setup Client
- In your client source code, update `App.tsx` and replace link with API URL
```sh
  const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({ uri: 'https://nodejs-application-api.herokuapp.com/' }),
  });
```
- Commit client source to heroku
```sh
  git init
  git add .
  git commit -m "Initial commit"
```
- Create heroku app
```sh
  heroku create $APP_NAME --buildpack mars/create-react-app
```
- To deploy, push source to heroku
```sh
  git push heroku master
```
- Run `$APP_NAME.herokuapp.com` 
- Dev mode: `yarn start`
