const { Console } = require('console')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
let dataUrl = './scripts/data.json'

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
    this.date = this.stringDate
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
    // console.log(`readDataFromFile - logging JSOn string ->\n${data}\n `)
    // console.log('readDataFromFile - logginf JS object -> \n', jsonData)
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
    // console.log('\nwritePostToFile - stringData -> ', stringData)
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
  // console.log('postObject -> ', post)

  // getting the posts as a JS Object
  let data = readDataFromFile(dataUrl)

  const newPost = new Post(post.title, post.body, post.link)

  if (newPost.title.length > 50 || newPost.body.length > 200) {
    throw new Error(
      'Title cannot be longer than 50 charactes and Text cannot be longer than 200 characters.'
    )
  }

  // adding the new Post to the data Array
  data = [...data, newPost]
  // console.log('\naddPost - data after post added -> ', data)
  writePostToFile(dataUrl, data)

  return data
}

// Find a post by using its UUID
function findPostById(postId, filename) {
  const allPostsObj = readDataFromFile(filename)

  const targetPostIndex = allPostsObj.findIndex((postElement, index) => {
    return postElement.id === postId
  })

  if (targetPostIndex === -1) {
    throw new Error('Post could not be found')
  } else {
    const targetPostObj = allPostsObj[targetPostIndex]
    return targetPostObj
  }
}

function deletePost(post) {
  const postId = post.id

  // getting the posts as a JS Object
  const data = readDataFromFile(dataUrl)

  // filter the posts, leave out the one that has same id as postId
  const postIndex = data.findIndex((postElement) => postElement.id === postId)

  if (postIndex === -1) {
    throw new Error('Post was not found')
  } else {
    const filteredPostsArray = data.filter(
      (postElement) => postElement.id !== post.id
    )

    writePostToFile(dataUrl, filteredPostsArray)
    return filteredPostsArray
  }
}

function addComment(post, comment, filename) {
  const allPostsObj = readDataFromFile(filename)

  const newComment = new Comment(comment.body, post, comment.link)

  const targetPostIndex = allPostsObj.findIndex(
    (postElem) => postElem.id === post.id
  )

  if (targetPostIndex === -1) {
    throw new Error('Post was not found')
  } else {
    allPostsObj[targetPostIndex].comments.push(newComment)

    writePostToFile(dataUrl, allPostsObj)
    const retrievedPost = findPostById(post.id, dataUrl)
    return retrievedPost
  }
}

function addEmoji(post, emoji, filename) {
  const allPostsObj = readDataFromFile(filename)
  const targetPostIndex = allPostsObj.findIndex(
    (postElement) => postElement.id === post.id
  )

  if (targetPostIndex === -1) {
    throw new Error('Post was not found')
  } else {
    const targetPost = allPostsObj[targetPostIndex]
    const emojiNum = Number(emoji)

    if (emojiNum < 0 || emojiNum > 2) {
      throw new Error('Trying to increase a non-existing emoji')
      return allPostsObj
    }

    const emojiToIncrease = convertNumToEmoji(emojiNum)
    const emojiCountNumber = targetPost.reactions[emojiToIncrease]
    const increasedEmojiCounter = emojiCountNumber + 1
    targetPost.reactions[emojiToIncrease] = increasedEmojiCounter

    // updating the value of the post
    allPostsObj.splice(targetPostIndex, 1, targetPost)

    const stringifiedPosts = JSON.stringify(allPostsObj)

    // replace all the content of the file
    fs.writeFileSync(dataUrl, stringifiedPosts, 'utf8')
    return allPostsObj
  }
}

function convertNumToEmoji(emojiNumber) {
  switch (emojiNumber) {
    case 0:
      return 'laugh'

    case 1:
      return 'thumbUp'

    case 2:
      return 'poo'

    default:
      return ''
  }
}

function updatePost(post, newData, filename) {
  const allPostsObj = readDataFromFile(filename)

  const targetPostIndex = allPostsObj.findIndex(
    (postElement) => postElement.id === post.id
  )

  if (targetPostIndex === -1) {
    throw new Error('Post was not found')
  } else {
    const targetPost = allPostsObj[targetPostIndex]

    const propertiesToUpdate = Object.keys(newData)
    propertiesToUpdate.forEach((prop) => {
      targetPost[prop] = newData[prop]
    })

    allPostsObj.splice(targetPostIndex, 1, targetPost)

    const stringifiedPosts = JSON.stringify(allPostsObj)

    // replace all the content of the file
    fs.writeFileSync(dataUrl, stringifiedPosts, 'utf8')
    return allPostsObj
  }
}

module.exports = {
  addPost,
  findPostById,
  addComment,
  readDataFromFile,
  deletePost,
  addEmoji,
  updatePost,
  dataUrl,
}
