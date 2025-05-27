const request = require("supertest");
const { Word } = require("../../models/word");
const { Language } = require("../../models/language");
let server;

const dataWords = require("../data/words.json");

const cleanDatabase = false;

describe("/api/words", () => {
  beforeEach(async () => {
    server = require("../../index");

    if (cleanDatabase) {
      await Word.deleteMany({});
    }
  });

  afterEach(() => {
    server.close();
  });

  describe("GET /", () => {
    it("should return all words", async () => {
      console.log(dataWords);

      for (const wordItem of dataWords) {
        languageSearch = await Language.findOne({
          name: wordItem.language,
        });
        console.log(languageSearch);

        //  if (!wordSearch)
        //    return res
        //      .status(404)
        //      .send(`The words with the given Id ${word} was not found.`);
      }
    });
  });
});
