const fs = require("fs");
var noteData = require("../data/notes.json");
const util = require("util");


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const file_path = __dirname + "/../data/notes.json";

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.json(noteData);
  });

  app.post("/api/notes", async function (req, res) {
    try {
      let rawdata = await readFileAsync(file_path);
      let notes = JSON.parse(rawdata);
      notes.push(req.body);
      writeFileAsync(file_path, JSON.stringify(notes));
      res.json(false);
    } catch (e) {
      res.json(false);
    }
  });

  app.get("/api/notes/:id", function (req, res) {
    var chosen = req.params.character;
    console.log(chosen);
    return res.json(false);
  });
};
