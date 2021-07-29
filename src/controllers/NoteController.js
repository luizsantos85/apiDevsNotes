const NoteService = require('../services/NoteService');

module.exports = {
   ping: (req, res) => {
      res.json({ pong: true });
   },
   all: (req, res) => {},
   one: (req, res) => {},
   create: (req, res) => {},
   edit: (req, res) => {},
   delete: (req, res) => {},
};
