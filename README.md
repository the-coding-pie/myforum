# MyForum

A fullstack reddit clone made using Node JS, React JS + Typescript, and Mongo DB (MERN).

To see the live version, [check here](https://pedantic-boyd-c3250f.netlify.app/).


<img src="https://user-images.githubusercontent.com/63698375/136052576-da7d1594-1876-42a3-be2d-cfb089677849.png" alt="homeFeed" style="width:100%;"/>
 

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
 
 ### Prerequisites
 
 In order to run this project on your computer, you must have the following technologies installed on your computer:
 
  - Node JS and npm/yarn
  - MongoDB
  
 ### Steps

1. `git clone` or `Download ZIP` this repo `https://github.com/the-coding-pie/myforum.git`
2. Now, `cd myforum`
3. Install server dependencies

```bash
 cd server
 yarn install
```

4. Install client dependencies

```bash
 cd client
 yarn install
```

5. Start MongoDB on your computer (on a new Terminal type the following)

```bash
 mongod
```

6. Create `.env` file directly inside `server` folder and add these values:

```
PORT=8000

MONGO_URI=your_value_here

ACCESS_TOKEN_SECRET=some_random_value_here
REFRESH_TOKEN_SECRET=some_random_value_here
```

7. Start the server

```bash
 cd server
 yarn start
```

8. Start the client

```bash
 cd client
 yarn start
```

9. Visit [http://localhost:3000](http://localhost:3000)


[Designed](https://www.figma.com/file/H83ab92IU8VZoRIeJ6yzJf/MyForum?node-id=0%3A1) and developed with ❤️ by [@AK](https://twitter.com/aravind_k28) (that's me ;)
