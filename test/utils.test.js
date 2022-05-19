const { v4: uuidv4 } = require('uuid')
const {
  convertNumToEmoji,
  Post,
  Comment,
  writePostToFile,
  readDataFromFile,
  findPostById,
  addComment,
  addEmoji,
  updatePost,
} = require('../scripts/utils')

let emptyFileUrl = './test/empty_data.json'
let testFileUrl = './test/test_data.json'

describe('utils.js', () => {
  describe('convertNumToEmoji', () => {
    test('testing that convertNumToEmoji returns the right string', () => {
      expect(convertNumToEmoji(0)).toEqual('laugh')
    })

    test('testing that convertNumToEmoji returns the right string', () => {
      expect(convertNumToEmoji(1)).toEqual('thumbUp')
    })

    test('testing that convertNumToEmoji returns the right string', () => {
      expect(convertNumToEmoji(2)).toEqual('poo')
    })

    test('testing that convertNumToEmoji returns an empty string when the input is not in the range 0..2', () => {
      expect(convertNumToEmoji(5)).toEqual('')
    })
  })

  describe('Post: getData', () => {
    test('testing getData saves a Post with the right title', () => {
      const newPost = new Post('newTitle', 'newBody', 'newLink')

      expect(newPost.getData.title).toEqual('newTitle')
      expect(newPost.getData.body).toEqual('newBody')
      expect(newPost.getData.link).toEqual('newLink')
      expect(newPost.getData.id).toBeTruthy()
      expect(newPost.getData.date).toBeTruthy()
      expect(newPost.getData.comments).toEqual([])
      expect(newPost.getData.reactions).toBeTruthy()
    })

    test('testing that Post can be created with no parameters', () => {
      const newPost = new Post()

      expect(newPost).toBeTruthy()
      // console.log('*******', newPost)
    })
  })

  describe('Comment: getData', () => {
    test('testing getData saves a Post with the right title', () => {
      const newPost = new Post('newTitle', 'newBody', 'newLink')

      const newComment = new Comment(
        'new Comment Body in here',
        newPost,
        'newCommentLink'
      )

      expect(newComment.getData.body).toEqual('new Comment Body in here')
      expect(newComment.getData.link).toEqual('newCommentLink')
      expect(newComment.getData.id).toBeTruthy()
      expect(newComment.getData.date).toBeTruthy()

      expect(newComment.getData.postRef).toEqual(newPost.id)
    })

    test('testing that a Comment can be created with no body or link', () => {
      const newPost = new Post('newTitle', 'newBody', 'newLink')
      const newComment = new Comment('', newPost)

      expect(newComment).toBeTruthy()
    })
  })

  describe('writePostToFile', () => {
    test('testing that writePostToFile throws and error if called without parameters', () => {
      const error = () => {
        writePostToFile()
      }

      expect(error).toThrow()
    })
  })

  describe('Read data from file', () => {
    test('testing that if db file is empty we retrieve a temporary post', () => {
      const tempPostArr = readDataFromFile(emptyFileUrl)

      expect(tempPostArr[0].title).toEqual('No Posts yet')
    })
  })

  describe('findPostById', () => {
    test('it finds a post if given the correct id', () => {
      const postId = '123-test-id-123'
      const retrievedPost = findPostById(postId, testFileUrl)

      expect(retrievedPost.title).toEqual('First Post')
    })

    test('tests that if post is not fond it throws an error', () => {
      const nonExistentId = '123-qwe-456-asd-123'

      const error = () => {
        findPostById(nonExistentId, testFileUrl)
      }

      expect(error).toThrow()
    })
  })

  describe('addComment', () => {
    test('testing that if a post is found a comment can be added', () => {
      const targetPost = { id: '123-test-id-123' }
      const testComment = new Comment('test comment to add', 'a link in here')

      const updatedPost = addComment(targetPost, testComment, testFileUrl)

      expect(updatedPost.id).toEqual(targetPost.id)
    })

    test('testing that trying to add a Comment to a non existent post throws', () => {
      const targetPost = { id: '123-test-id-123-does-not-exist' }
      const testComment = new Comment(
        'test comment to add, should throw',
        'a link in here'
      )
      const error = () => {
        addComment(targetPost, testComment, testFileUrl)
      }

      expect(error).toThrow()
    })
  })

  describe('addEmoji', () => {
    test('testing that the function works when the post is found', () => {
      const targetPost = { id: '123-test-id-123' }
      const emojiNum = '0'

      const postId = targetPost.id
      const retrievedPostLaughValue = findPostById(postId, testFileUrl)
        .reactions['laugh']
      console.log('laugh number', retrievedPostLaughValue)

      addEmoji(targetPost, emojiNum, testFileUrl)

      const retrievedPostLaughValueAfterClick = findPostById(
        postId,
        testFileUrl
      ).reactions['laugh']
      console.log('laugh number', retrievedPostLaughValueAfterClick)
      expect(retrievedPostLaughValueAfterClick).toEqual(
        retrievedPostLaughValue + 1
      )
    })

    test('testing that the function throws if the post is not found', () => {
      const targetPost = { id: '123-test-id-123-does-not-exist' }
      const emojiNum = '0'

      const error = () => {
        addEmoji(targetPost, emojiNum, testFileUrl)
      }

      expect(error).toThrow()
    })
  })

  describe('updatePost', () => {
    test('testing that a post can be updated', () => {
      const targetPost = { id: '456-test-id-456' }
      const targetPostId = targetPost.id

      const randomText = uuidv4()
      const newPostData = { title: randomText, body: 'something', link: '' }

      const retrievedPost = findPostById(targetPostId, testFileUrl)

      const returnedPostsObj = updatePost(targetPost, newPostData, testFileUrl)

      const updatedPost = returnedPostsObj.filter(
        (post) => post.id === targetPostId
      )

      expect(updatedPost[0].title).toEqual(randomText)
    })
  })
})
