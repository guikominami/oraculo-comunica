const request = require("supertest");
const { Language } = require("../../models/language");
let server;

const dataLanguage = require("../data/languages.json");

const cleanDatabase = true;

describe("/api/languages", () => {
  beforeEach(async () => {
    server = require("../../index");

    if (cleanDatabase) {
      await Language.deleteMany({});
    }
  });

  afterEach(() => {
    server.close();
  });

  describe("GET /", () => {
    it("should return all languages", async () => {
      Language.collection.insertMany(dataLanguage);

      const res = await request(server).get("/api/languages");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
    });
  });
});
