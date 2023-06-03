const app = require("../src/index");
const request = require("supertest");

let server, agent;

beforeEach((done) => {
    server = app.listen(3001, (err) => {
      if (err) return done(err);

       agent = request.agent(server); // since the application is already listening, it should use the allocated port
       done();
    });
});

afterEach((done) => {
  server.close(done);
});


describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/")
      .expect(200);
  });
});

describe("Test the get path", () => {
    test("It should response the GET method", () => {
    return request(app)
        .get("/get")
        .expect(200);
    });
  });


// Here is another example of a good test we want to have, but a test that
// requires a db mock in order to run (since we dont want our tests to effect)
// the database used in 'production'

//   describe("Test the insert path", () => {
//     test("It should response the GET method", () => {
//       return request(app)
//         .post("/insert")
//         .expect(200);
//     });
//   });