const request = require("supertest");
const server = require("../scripts/server");

describe("api server", () => {
  let api;
  beforeAll(() => {
    api = server.listen(3000, () => {
      console.log("test 3000");
    });
  });

  test("it responds to get / with status 200", (done) => {
    request(api).get("/").expect(200, done);
  });

  test("it responds to get /posts with status 200", (done) => {
    request(api).get("/posts").expect(200, done);
  });

  test("it responds to get /posts/:id with status 200", (done) => {
    request(api).get("/posts/ajdj-sds2-sdsd").expect(200, done);
  });

  test("it responds to get /posts/doesnotexist with status 404", (done) => {
    request(api).get("/posts/doesnotexist").expect(404, done);
  });

  test("it responds to post /posts with status 201", (done) => {
    const testData = {
      title: "test1 title",
      body: "test1 body",
      link: "test1 link",
    };

    request(api).post("/posts").send(testData).expect(201, done);
  });

  test("it responds to post /posts/comments with status 201", (done) => {
    const testData = {
      post: {
        id: "ajdj-sds2-sdsd",
        title: "Post One in file",
        body: "Post 1 in File",
        link: "aaa",
        date: "Fri May 6 2022 19:30:00",
        comments: [],
        reactions: { laugh: 0, thumbUp: 5, poo: 0 },
      },
      comment: {
        body: "comment in here blah blah blah",
        link: "link to a giphy should go here",
      },
    };

    request(api).post("/posts/comments").send(testData).expect(201, done);
  });

  test("it responds to post /posts/comments with status 404", (done) => {
    const testData = {
      post: {
        id: "ajdj-sds2-sdsd235rfwerg",
        title: "Post One in file",
        body: "Post 1 in File",
        link: "aaa",
        date: "Fri May 6 2022 19:30:00",
        comments: [],
        reactions: { laugh: 0, thumbUp: 5, poo: 0 },
      },
      comment: {
        body: "comment in here blah blah blah",
        link: "link to a giphy should go here",
      },
    };

    request(api).post("/posts/comments").send(testData).expect(404, done);
  });

  test("it responds to post /posts/emojis with status 201", (done) => {
    const testData = {
      post: {
        id: "ajdj-sds2-sdsd",
        title: "Post One in file",
        body: "Post 1 in File",
        link: "aaa",
        date: "Fri May 6 2022 19:30:00",
        comments: [],
        reactions: { laugh: 0, thumbUp: 5, poo: 0 },
      },
      emoji: "1",
    };
    request(api).post("/posts/emojis").send(testData).expect(201, done);
  });

  test("it responds to post /posts/emojis with status 405", (done) => {
    const testData = {
      post: {
        id: "ajdj-sds2-sds3sewqf",
        title: "Post One in file",
        body: "Post 1 in File",
        link: "aaa",
        date: "Fri May 6 2022 19:30:00",
        comments: [],
        reactions: { laugh: 0, thumbUp: 5, poo: 0 },
      },
      emoji: "1",
    };
    request(api).post("/posts/emojis").send(testData).expect(405, done);
  });

  test("it responds to delete /posts with status 404", (done) => {
    request(api).delete("/posts").expect(404, done);
  });

  afterAll((done) => {
    console.log("Gracefully stopping test server");
    api.close(done);
  });
});
