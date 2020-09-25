const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const file_path = __dirname + "/../public/data/notes.json";

module.exports = function (app) {
  app.get("/api/notes", async function (req, res) {
    try {
      let rawdata = await readFileAsync(file_path);
      let notes = JSON.parse(rawdata);
      res.json(notes);
    } catch (e) {
      res.json(false);
    }
  });

  app.post("/api/notes", async function (req, res) {
    try {
      let rawdata = await readFileAsync(file_path);
      let notes = JSON.parse(rawdata);
      let noteData = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text,
      };
      notes.push(noteData);
      writeFileAsync(file_path, JSON.stringify(notes));
      res.json(false);
    } catch (e) {
      res.json(false);
    }
  });

  app.delete("/api/notes/:id", async function (req, res) {
    var chosen = req.params.id;
    let rawdata = await readFileAsync(file_path);
    let notes = JSON.parse(rawdata);

    for (var i = 0; i < notes.length; i++) {
      if (notes[i].id === chosen) {
        notes.splice(i, 1);
      }
    }
    writeFileAsync(file_path, JSON.stringify(notes));
    return res.json(false);
  });
};
