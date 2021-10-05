# myforum

A fullstack reddit clone made using Node JS, React JS + Typescript, and Mongo DB.

To see the live version, [check here](https://615c46c72a06670008b86004--pedantic-boyd-c3250f.netlify.app/search/?q=s).

## Technologies Used:

 ### Frontend

  - React JS + Typescript
  - Redux Toolkit
  - Styled Components
  - React Query
  
### Backend
 
 - Node JS
 - Express
 - Mongo DB (with Mongoose)
 - JWT tokens for authentication
 
 ## Features
 
 - Signup and Login
 - HomeFeed (dedicated for both Loggedin users and anonymous users)
 - Pre defined Communities
 - Create, Read, and Delete Posts
 - Create, Read, and Delete Comments
 - Upvote and Downvote Posts
 - Search Posts
 - Sorting
 - Filter Posts based on Community/User.
 - JWT based auth (both accessToken and refreshToken)
 
 ## How to setup locally on your computer
 
 ## Prerequisites
 
 In order to run this project on your computer, you must have the following technologies installed on your computer:
 
  - Node JS and npm/yarn
  - MongoDB
  
## Steps

1. `git clone` or `Download ZIP` this repo `https://github.com/the-coding-pie/myforum.git`
2. Install server dependencies

```
 cd server
 yarn install
```

3. Install client dependencies

```
 cd client
 yarn install
```

4. Start MongoDB on your computer

```
 $mongod
```

5. Start the server

```
 cd server
 yarn start
```

6. Start the client

```
 cd client
 yarn start
```

7. Visit [http://localhost:3000](http://localhost:3000)

