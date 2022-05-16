const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const dataUrl = './data.json'

class Post {
  constructor(title, body, link = null) {
    this.id = uuidv4()
    this.title = title
    this.body = body
    this.link = link
    this.date = new Date()
    this.comments = []
    this.reactions = {
      laugh: 0,
      thumbUp: 0,
      poo: 0,
    }
    this.date = this.stringDate
  }

  // getting the number of posts
  0

  get stringDate() {
    // return todayWithDay(this.date)
    return this.date.toString().replace('T', '').replace(/GM.+/i, '').trim()
  }

  get getData() {
    return {
      id: this.id,
      title: this.title,
      body: this.body,
      link: this.link,
      date: this.stringDate,
      comments: this.comments,
      reactions: this.reactions,
    }
  }
}

class Comment {
  constructor(body, postObject, link = null) {
    this.id = 0
    this.body = body
    this.link = link
    this.date = new Date()
    this.postRef = postObject.id
  }
  get stringDate() {
    // return todayWithDay(this.date)
    return this.date.toString().replace('T', '').replace(/GM.+/i, '').trim()
  }

  get getData() {
    return {
      id: this.id,
      body: this.body,
      link: this.link,
      date: this.stringDate,
      postRef: this.postRef,
    }
  }
}

// Utility Function
// reads the JSOn file, converts it to a JS Object and returns it
function readDataFromFile(filename) {
  try {
    const data = fs.readFileSync(filename)
    const jsonData = JSON.parse(data)
    console.log(`readDataFromFile - logging JSOn string ->\n${data}\n `)
    console.log('readDataFromFile - logginf JS object -> \n', jsonData)
    return jsonData
  } catch (err) {
    console.error(err)
  }
}

// Utility function
// takes the JSON data, converts it to JSON String, saves it and returns it
function writePostToFile(filename, data) {
  try {
    const stringData = JSON.stringify(data)
    console.log('\nwritePostToFile - stringData -> ', stringData)
    fs.writeFileSync(filename, stringData)
    // return stringData
  } catch (err) {
    console.error(err)
  }
}

// Call when you have received a new Post from the frontend
// opens the file, appends the post saves the file and returns the data as JSON String
// ready to be sent back to the frontend

// Cannot use progressive ids as would be unable to delete posts
function addPost(post) {
  console.log('postObject -> ', post)

  // getting the posts as a JS Object
  let data = readDataFromFile(dataUrl)
  console.log('\naddPost - data -> ', data)

  // const postsNumber = data.length
  // console.log('data length --------', postsNumber)

  // creating a new Post object
  const newPost = new Post(post.title, post.body, post.link)
  // newPost.id = postsNumber + 1

  console.log('newPost -> ', newPost)
  // adding the new Post to the data Array
  data = [...data, newPost]
  console.log('\naddPost - data after post added -> ', data)
  let updatedData = writePostToFile(dataUrl, data)

  return updatedData
}

function createCommentAndAppend(comment) {
  const newComment = comment
}

// TESTING
const firstPost = new Post(
  'Welcome',
  'You are the first visitor',
  'http://thisLink.com'
)
// console.log('\nfirstPost getData -> ', firstPost.getData)

const firstComment = new Comment('That post sucked!', firstPost)
// console.log('\nfirstComment getData -> ', firstComment.getData)

const secondComment = new Comment('Not too bad...', firstPost)
// console.log('\nsecondComment getData -> ', secondComment.getData)

const thirdComment = new Comment('Not too bad...', firstPost)
// console.log('\nthirdComment getData -> ', thirdComment.getData)

const secondPost = new Post(
  'My Post is better',
  'Definitely better than the first one!',
  'http://linkToBeValidated.here'
)
// console.log('\nsecondPost -> ', secondPost.getData)

const fourthComment = new Comment(
  'First Comment for the second Post',
  secondPost
)
// console.log('\nfourthComment getData -> ', fourthComment.getData)

const fifthComment = new Comment(
  'Second Comment for the second Post',
  secondPost
)
// console.log('\nfifthComment getData -> ', fifthComment.getData)

// const firstDoc = new Document(console.log, firstPost)
// firstDoc.describeType()

console.log('\nwriting and reading to the DB - testing starts here...\n')

console.log('reading data from file\n', readDataFromFile(dataUrl))

console.log('\n----------\n')

// Use this to add a Post
// const dataAfterOnePostAdded = addPost({
//   title: 'Post Three added',
//   body: 'Post 3 added',
//   link: 'ccc',
// })

// console.log('\nData after one post added -> ', dataAfterOnePostAdded)

// writePostToFile(dataUrl, {
//   id: 5,
//   title: 'Post Two in file',
//   body: 'Post 2 in File',
//   link: 'aaa',
//   date: 'Sat May 14 2022 19:40:13',
//   comments: [],
//   reactions: { laugh: 0, thumbUp: 0, poo: 0 },
// })

console.log(
  'reading data from file after one post added\n',
  readDataFromFile(dataUrl)
)

function readCommentsOfPost(filename) {
  try {
    const data = fs.readFileSync(filename)
    const jsonData = JSON.parse(data)
    console.log(`readDataFromFile - logging JSOn string ->\n${data}\n `)
    console.log('readDataFromFile - logginf JS object -> \n', jsonData)

    const postIndex = jsonData.find
  } catch (err) {
    console.error(err)
  }
}

// Find a post by using its UUID
function findPostById(post, filename) {
  const allPostsObj = readDataFromFile(filename)
  console.log('\nfindPostByUUID - allPosts.Obj -> ', allPostsObj)
  // const postId = (post) => post.id
  // console.log('\nfindPostByUUID - postId -> ', postId)

  const targetPostIndex = allPostsObj.findIndex(
    (postElement) => postElement.id === post.id
  )
  console.log('\nfindPostByUUID - targetPostIndex -> ', targetPostIndex)

  if (targetPostIndex === -1) {
    console.log('Post could not be found')
    return null
  } else {
    const targetPostObj = allPostsObj[targetPostIndex]
    console.log('\n findPostById - Returning the post: ', targetPostObj)
    return targetPostObj
  }
}

// Sample Post for testing purposes
const samplePost = {
  id: 'dbdae69a-99d5-4c71-addc-fbc831f13f01',
  title: 'Post Three added',
  body: 'Post 3 added',
  link: 'ccc',
  date: 'Mon May 16 2022 09:41:59',
  comments: [],
  reactions: { laugh: 0, thumbUp: 0, poo: 0 },
}

// findPostById(samplePost, dataUrl)
