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

  test("it responds to post /posts with status 201", (done) => {
    const testData = {
      title: "test1 title",
      body: "test1 body",
      link: "test1 link",
    };

    request(api).post("/posts").send(testData).expect(201, done);
  });

  afterAll((done) => {
    console.log("Gracefully stopping test server");
    api.close(done);
  });
});
