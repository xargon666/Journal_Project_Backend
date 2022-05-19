# 🖥 Journal Project Backend
Project made as a week-long group project by the students of the FutureProof Bootcamp (Auguste cohort)

## Description
This is the backend server and database (a simple json file) for the project located at [this link](https://github.com/xargon666/Journal_Project_Frontend).
The server can accept different types of requests:
| REQUEST TYPE  | ENDPOINT    | REQUEST BODY STRUCTURE  | RESPONSE                | USE                     |
| --------------|-------------|-------------------------|-------------------------|-------------------------|
| GET           | /           | empty                   | String                  | Send a Text String      |
| GET           | /posts      | empty                   | All Posts and comments  | First load              |
| GET           | /posts/:id  | id of Post as queryString| Body of the requestedPost with its comments | When clicking on a post to view its content |
| POST          | /posts      | JSON with properties of 'bitle', 'body' and 'link' (for the giphy) all as Strings | All Posts and comments | When adding a new Post |
| DELETE        | /posts      | id of Post as JSON      | All Posts and comments  | When deleting a Post    |
| POST          | /posts/comments | JSON object with two properties: 'post' and 'comment' | The Post and its comments | When adding a Comment |
| POST          | /posts/emojis | JSON Object with two properties: 'post' and 'emoji' | All Posts and comments  | When clicking on an emoji icon  |
| PATCH         | /posts      | JSON Object with two properties: 'post' and 'newData' | All the Posts and comments  | When updating a previous Post |

## 💾 Deployment
The application has been deployed on Heroku at [this link](https://journal-project-backend.herokuapp.com/).

## 🎮 Installation & usage
Locally:
```
npm install
npm start
```
In the cloud:
1. Use the frontend app located at [this link](https://github.com/xargon666/Journal_Project_Frontend](https://journal-project-lemon.netlify.app/)
2. Use a service like [Hoppscotch](https://hoppscotch.io/)

## 📟 Technologies
1. NodeJS : javascript runtime
2. ExpressJS : framework for nodejs that has been used to create the webserver
3. Jest: test runner
4. Supertest: to test HTTP Responses
5. UUID: to generate **U**niversally **U**nique **ID**entifiers used for the id of both Posts and Comments
6. Hoppscotch: an online service used to manually test the routes
7. Zoom: to make the daily standups
8. Slack: to communicate with the team members

## 🤔 Process
Developed routes and testings separately with frequent catch up to help each other.
Used: 
- independent programming
- pair-programming
- (remote) mob-programming.

## 🪪 Licence
ISC

From [Wikipedia](https://en.wikipedia.org/wiki/ISC_license):
- The ISC license is a permissive free software license published by the Internet Software Consortium, now called Internet Systems Consortium (ISC). It is functionally equivalent to the simplified BSD and MIT licenses, but without language deemed unnecessary following the Berne Convention

## 🏆 WINS
- The server is working
- Getting excellent Coverage for tests
- Handling multiple errors with quite a bit of validation
- Cooperation has worked great
- Backend and Frontend communicate flawlessly 
- Few merge conflicts as we agreed on when to push and merge beforehand and also worked on separate branches

## 😫 Challenges
- Using Heroku as a team instead of a single developer
- Covering so many tests and cases
- Plan how to implement the features and how to send/receive data between frontend and backend
