# Getting Started with NodeJS API

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
