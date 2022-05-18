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
      request(api).get('/posts/ajdj-sds2-sdsd').expect(200, done)
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
          id: 'ajdj-sds2-sdsd',
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
          id: 'ajdj-sds2-sdsd',
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

    // test.only('it responds to delete /posts with status 200 if a post is successfully deleted', (done) => {
    //   const newPost = request(api).get('/posts').

    //   request(api)
    //     .post('/posts')
    //     .send(newPost)
    //     .expect(201)
    //     .then(() => {
    //       request(api).delete('/posts').send(newPost).expect(200, done)
    //     })
    // })
  })

  afterAll((done) => {
    console.log('Gracefully stopping test server')
    api.close(done)
  })
})
