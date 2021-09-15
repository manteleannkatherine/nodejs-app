# Getting Started with NodeJS API

## Prerequisites

```sh
  yarn init
  
  yarn add apollo-server graphql  
  yarn add class-validator type-graphql reflect-metadata class-validator 	
  yarn add -D typescript ts-node-dev ts-node @types/node @types/ws	
  yarn add typegraphql-prisma	
  yarn add graphql-type-json graphql-fields	
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
- Add the following to `schema.prisma` to set generated classes' path
```sh
  generator typegraphql {
    provider = "typegraphql-prisma"
    output   = "../src/generated/typegraphql-prisma"
  }
```
- In `.env`, update `DATABASE_URL` with your local database connection

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
