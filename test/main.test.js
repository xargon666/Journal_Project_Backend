const request = require('supertest')
const { response } = require('../scripts/server')
const server = require('../scripts/server')

describe('api server', () => {
  let api
  beforeAll(() => {
    api = server.listen(3500, () => {
      console.log('test 3500')
    })
  })

  describe('get/', () => {
    test('it responds to get / with status 200', (done) => {
      request(api).get('/').expect(200, done)
    })
  })

  describe('get/posts', () => {
    test('it responds to get /posts with status 200', (done) => {
      request(api).get('/posts').expect(200, done)
    })
  })

  describe('get/posts/:id', () => {
    test('it responds to get /posts/:id with status 200', (done) => {
      const postId = '456-test-id-456'
      request(api).get(`/posts/${postId}`).expect(200, done)
    })

    test('it responds to get /posts/doesnotexist with status 404', (done) => {
      const nonExistantPostId = 'weridstring'

      request(api)
        .get(`/posts/${nonExistantPostId}`)
        .expect({ message: 'Post could not be found' })
        .expect(404, done)
    })
  })

  describe('post /posts', () => {
    test('it responds to post /posts with status 201', (done) => {
      const testPost1 = {
        title: 'test 1',
        body: 'body 1',
        link: 'link 1',
      }

      request(api).post('/posts').send(testPost1).expect(201, done)
    })

    test('it responds to post /posts with status 405 if title length is not between 0 and 50 characters', (done) => {
      const testPost2 = {
        title:
          'test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2',
        body: 'body test 2',
        link: 'link here',
      }

      request(api).post('/posts').send(testPost2).expect(405, done)
    })

    test('it responds to post /posts with status 405 if body length is not between 0 and 500 characters', (done) => {
      const testPost3 = {
        title: 'test 2test',
        body: 'body test 2 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2test 2 ',
        link: 'link here',
      }
      request(api).post('/posts').send(testPost3).expect(405, done)
    })
  })

  describe('post /posts/comments', () => {
    test('it responds to post /posts/comments with status 201', (done) => {
      const testData = {
        post: {
          id: '456-test-id-456',
        },
        comment: {
          body: 'comment in here blah blah blah',
          link: 'link to a giphy should go here',
        },
      }

      request(api).post('/posts/comments').send(testData).expect(201, done)
    })

    test('it responds to post /posts/comments with status 404 if the post is not found in the database', (done) => {
      const testData = {
        post: {
          id: 'non-existent-id',
          title: 'Post One in file',
          body: 'Post 1 in File',
          link: 'aaa',
          date: 'Fri May 6 2022 19:30:00',
          comments: [],
          reactions: { laugh: 0, thumbUp: 5, poo: 0 },
        },
        comment: {
          body: 'comment in here blah blah blah',
          link: 'link to a giphy should go here',
        },
      }

      request(api)
        .post('/posts/comments')
        .send(testData)
        .expect({ error: 'Post was not found' })
        .expect(404, done)
    })
  })

  describe('post /posts/emojis', () => {
    test('it responds to post /posts/emojis with status 201', (done) => {
      const testData = {
        post: {
          id: '456-test-id-456',
          title: 'Post One in file',
          body: 'Post 1 in File',
          link: 'aaa',
          date: 'Fri May 6 2022 19:30:00',
          comments: [],
          reactions: { laugh: 0, thumbUp: 5, poo: 0 },
        },
        emoji: '1',
      }
      request(api).post('/posts/emojis').send(testData).expect(201, done)
    })

    test('it responds to post /posts/emojis with status 404 if the post is not found', (done) => {
      const testData = {
        post: {
          id: 'non-existent-post-id',
          title: 'Post One in file',
          body: 'Post 1 in File',
          link: 'aaa',
          date: 'Fri May 6 2022 19:30:00',
          comments: [],
          reactions: { laugh: 0, thumbUp: 5, poo: 0 },
        },
        emoji: '1',
      }
      request(api)
        .post('/posts/emojis')
        .send(testData)
        .expect({ error: 'Post was not found' })
        .expect(404, done)
    })

    test('it responds to post /posts/emojis with status 405 if tring to increase a non-existent emoji', (done) => {
      const testData = {
        post: {
          id: 'd91b89fd-94eb-46a9-a059-247ef3179c15',
          title: 'Post One in file',
          body: 'Post 1 in File',
          link: 'aaa',
          date: 'Fri May 6 2022 19:30:00',
          comments: [],
          reactions: { laugh: 0, thumbUp: 5, poo: 0 },
        },
        emoji: '5',
      }
      request(api).post('/posts/emojis').send(testData).expect(405, done)
    })
  })

  describe('delete /posts', () => {
    test('it responds to delete /posts with status 404 if post is not found', (done) => {
      request(api)
        .delete('/posts')
        .expect({ error: 'Post was not found' })
        .expect(404, done)
    })

    test('it responds to delete /posts with status 200 if a post is successfully deleted', (done) => {
      const newPost = {
        title: 'test title',
        body: 'test body',
        link: 'test link',
      }

      // we create a new post through the appropriate route
      request(api)
        .post('/posts')
        .send(newPost)
        // we get the id of the last post (pushed to the end of an array)
        .then((response) => {
          const newPostId = response.body[response.body.length - 1].id
          return newPostId
        })
        // we use the id of the last post to delete the post
        .then((postId) => {
          request(api).delete('/posts').send({ id: postId }).expect(200, done)
        })
    })
  })

  describe('patch /posts', () => {
    test('it responds to patch with status 200 when the old data and new data are there and meets the character limit and  it has updated the post', (done) => {
      const testData = {
        post: {
          id: '456-test-id-456',
        },
        newData: {
          title: 'new title',
          body: 'new body',
          link: 'new link',
        },
      }
      request(api).patch('/posts').send(testData).expect(200, done)
    })

    test('it responds to patch with status 404 when the post can not be found ', (done) => {
      const testData = {
        post: {
          id: 'ajdj-sds2-sdssdwewaew',
          title: 'Yep sds ',
        },
        newData: {
          title: 'new title',
          body: 'new body',
          link: 'new link',
        },
      }
      request(api).patch('/posts').send(testData).expect(404, done)
    })

    test('it responds to patch with status 405 when the title has more than 50 characters', (done) => {
      const testData = {
        post: {
          id: 'ajdj-sds2-sdsd',
          title: 'Yep sds sdfs',
          body: 'thddf sdfsdfsdfsdf sdfdsfsdfsd',
        },
        newData: {
          title:
            'new title new titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew title',
          body: 'new body',
          link: 'new link',
        },
      }

      request(api)
        .patch('/posts')
        .send(testData)
        .expect({
          error:
            'Title cannot be longer than 50 characters and body cannot be longer than 500 characters',
        })
        .expect(405, done)
    })

    test('it responds to patch with status 405 when the body has more than 500 characters', (done) => {
      const testData = {
        post: {
          id: 'ajdj-sds2-sdsd',
          title: 'Yep sds sdfs',
          body: 'thddf sdfsdfsdfsdf sdfdsfsdfsd',
        },
        newData: {
          title:
            'new title new titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew title new title new titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew title new titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew title new titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew title new titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew title new titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew title new titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew title new titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew title new titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew titlenew title',
          body: 'new body',
          link: 'new link',
        },
      }

      request(api)
        .patch('/posts')
        .send(testData)
        .expect({
          error:
            'Title cannot be longer than 50 characters and body cannot be longer than 500 characters',
        })
        .expect(405, done)
    })

    test('it responds to patch with status 405 when the old data or new data or both are missing ', (done) => {
      const testData = {}
      request(api)
        .patch('/posts')
        .send(testData)
        .expect({
          error: 'Both the original post and the new data are needed.',
        })
        .expect(405, done)
    })
  })

  afterAll((done) => {
    console.log('Gracefully stopping test server')
    api.close(done)
  })
})
