Wiki-maps
=========

## Project Overview
### What it is
A full stack web app that serves user created maps.

anonymouse users can view any map set to public.

Logged in users can make maps. And these maps contain places defined by the user\
Things that can be defined are, title, image, description and long/lat.

### Technical details
* The app has a focus on using frontend scripts to update the users page
* The [relevent API routes](/tree/main/routes/api/user) do check the users rights (using encrypted cookies) before performing any actions
* This app is functionally complete (This doesnt mean its deployable)
* App was created as a 3 man group. We used github pages to assign tasks


### History
>Wiki maps is a midterm project done for [Lighthouse Labs full time web dev course](https://www.lighthouselabs.ca/en/web-development-bootcamp?gclid=CjwKCAiAx8KQBhAGEiwAD3EiP9K5uhrRFugeZydQWBfMfKlzszrgM5eBmYdxEhY6g8nt6hOxNGgqkxoCkQEQAvD_BwE)\
We had 10 topics to choose from.
Each one had their own requirements


## Getting Started

1. Clone the repo `git clone git@github.com:JoshuaOLoduca/midterm-wiki_maps.git` 
2. Install dependencies: `npm i`
3. Fix to binaries for sass: `npm rebuild node-sass`
4. Create PSQL database
    1. remember the database's name
5. Rename `.env.example` to `.env`
6. Update `.env`
    * `DB_HOST=` `<psql host Address>` (localhost if its on same machine)
    * `DB_USER=` `<Username of owner of created db from step 4>`
    * `DB_PASS=` `<password of owner of created db from step 4>`
    * `DB_NAME=` `<Name of database created at step 4>`
7. Initialize Database by running `npm run db:reset`
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server if you make any edits
8. Visit `http://localhost:8080/`

## Dependencies

- Required
  - [Node 10.x or above](https://nodejs.org/en/)
    - NPM 5.x or above
  - [express 4.17.1 or above](https://www.npmjs.com/package/express)
  - [PG 8.5.0 or above](https://www.npmjs.com/package/pg)
  - [leaflet 1.7.1 or above](http://leafletjs.com/)
  - [cookie-session 2.0.0 or above](https://www.npmjs.com/package/cookie-session)
  - [sass 1.35.1 or above](https://www.npmjs.com/package/sass)
  - [morgan 1.9.1 or above](https://www.npmjs.com/package/morgan)
  - [ejs 2.6.2 or above](https://www.npmjs.com/package/ejs)
  - [dotenv 2.0.0 or above](https://www.npmjs.com/package/dotenv)
  - [chalk 2.4.2 or above](https://www.npmjs.com/package/chalk)
