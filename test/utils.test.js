const {
  convertNumToEmoji,
  Post,
  Comment,
  writePostToFile,
} = require('../scripts/utils')

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
      console.log('*******', newPost)
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
})
