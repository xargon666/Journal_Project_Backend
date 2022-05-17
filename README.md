# Journal Project Backend
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

## Deployment

## Installation & usage

## Technologies

## Process

## Licence
