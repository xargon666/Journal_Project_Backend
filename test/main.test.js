const request = require("supertest");
const server = require("../scripts/server");

describe("api server", () => {
  let api;
  beforeAll(() => {
    api = server.listen(5000, () => {
      console.log("test 5000");
    });
  });

  test("it responds to get / with status 200", (done) => {
    request(api).get("/").expect(200, done);
  });
});
