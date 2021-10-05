# MyForum

A fullstack reddit clone made using Node JS, React JS + Typescript, and Mongo DB.

To see the live version, [check here](https://pedantic-boyd-c3250f.netlify.app/).

<div style="display:flex;">
<img src="https://user-images.githubusercontent.com/63698375/136052584-3ceb9f1d-bd28-4c6e-96b3-91dd4ebbdb4b.png" alt="signup"/>
<img src="https://user-images.githubusercontent.com/63698375/136052597-5cec8ce7-954c-455f-9869-e31f1a183d33.png" alt="login"/>
</div>
<img src="https://user-images.githubusercontent.com/63698375/136052576-da7d1594-1876-42a3-be2d-cfb089677849.png" alt="homeFeed" style="width:50%;"/>
<img src="https://user-images.githubusercontent.com/63698375/136052552-575c2088-b52b-4542-ba78-13e23cd9ca4d.png" alt="addPost" style="width:50%;"/>
 <img src="https://user-images.githubusercontent.com/63698375/136052567-a48739da-831b-4047-8566-26cd5015c505.png" alt="comment" style="width:50%;"/>
<img src="https://user-images.githubusercontent.com/63698375/136052573-d8993267-81b2-4d6b-8824-4d9a1dc4a7f2.png" alt="community" style="width:50%;"/>
<img src="https://user-images.githubusercontent.com/63698375/136052593-8d98b9d4-7741-4eb5-92bb-56b552fbece5.png" alt="search" style="width:50%;"/>
</div>
 
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
2. Install server dependencies

```bash
 cd server
 yarn install
```

3. Install client dependencies

```bash
 cd client
 yarn install
```

4. Start MongoDB on your computer (on a new Terminal)

```bash
 $ mongod
```

5. Start the server

```bash
 cd server
 yarn start
```

6. Start the client

```bash
 cd client
 yarn start
```

7. Visit [http://localhost:3000](http://localhost:3000)


[Designed](https://www.figma.com/file/H83ab92IU8VZoRIeJ6yzJf/MyForum?node-id=0%3A1) and developed with ❤️ by [@AK](https://twitter.com/aravind_k28) (that's me ;)
