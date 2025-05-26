const { Translation, validate } = require("../models/translation");
const { Word } = require("../models/word");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
   const translations = await Translation.find().sort("_id");
   res.send(translations);
});

router.post("/", async (req, res) => {
   const { error } = validate(req.body);
   if (error) return res.status(400).send({ error: error.details[0].message });

   let wordMain = await Word.findById(req.body.wordId);
   if (!wordMain) return res.status(400).send("The word is not registered.");

   console.log(wordMain);

   wordMain = await Translation.findOne({ word: wordMain });
   if (wordMain)
      return res
         .status(400)
         .send("The word is already registered in translation.");

   let wordTranslationList = [];
   let wordSearch;

   for (const wordId of req.body.translations) {
      wordSearch = await Word.findById(wordId);

      if (!wordSearch)
         return res
            .status(404)
            .send(`The words with the given Id ${word} was not found.`);

      wordTranslationList.push(wordSearch);
   }

   let translation = new Translation({
      word: wordMain,
      translations: wordTranslationList,
   });

   translation = await translation.save();
   res.send(translation);
});

// router.put("/:id", async (req, res) => {
//    const { error } = validate(req.body);
//    if (error) return res.status(400).send(error.details[0].message);

//    let wordList = [];
//    let wordSearch;

//    for (const word of req.body.words) {
//       wordSearch = await Word.findById(word);

//       if (!wordSearch)
//          return res
//             .status(404)
//             .send(`The words with the given Id ${word} was not found.`);

//       wordList.push(wordSearch);
//    }

//    const translation = await Translation.findByIdAndUpdate(
//       req.params.id,
//       {
//          words: wordList,
//       },
//       { new: true }
//    );

//    if (!translation)
//       return res
//          .status(400)
//          .send("The translation with the given Id was not found.");

//    res.send(translation);
// });

router.delete("/:id", async (req, res) => {
   const translation = await Translation.findByIdAndDelete(req.params.id);
   if (!translation)
      return res
         .status(400)
         .send("The translation with the given Id was not found.");
   res.send(translation);
});

module.exports = router;
