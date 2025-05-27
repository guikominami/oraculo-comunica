const request = require("supertest");
let server;

describe("/api/languages", () => {
   beforeEach(() => {
      server = require("../../index");
   });

   afterEach(() => {
      server.close();
   });

   describe("GET /", () => {
      it("should return all languages", async () => {
         const res = await request(server).get("/api/languages");
         expect(res.status).toBe(200);
      });
   });
});
