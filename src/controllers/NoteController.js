const NoteService = require('../services/NoteService');

module.exports = {
   ping: (req, res) => {
      //teste api
      res.json({ pong: true });
   },

   all: async (req, res) => {
      let notes = await NoteService.getAll();
      res.status(200).json(notes);
   },

   one: async (req, res) => {
      let id = req.params.id;
      let note = await NoteService.findById(id);
      if (!note) {
         res.status(400).json({ error: 'Id não encontrado!' });
         return;
      }
      res.status(200).json(note);
   },

   create: async (req, res) => {
      let title = req.body.title;
      let body = req.body.body;

      if (!title || !body) {
         res.status(400).json({ error: 'Campo não preenchido!' });
         return;
      }

      let noteId = await NoteService.add(title, body);
      let note = {
         id: noteId,
         title,
         body,
      };
      res.status(201).json(note);
   },

   edit: async (req, res) => {
      let id = req.params.id;
      let { title, body } = req.body;

      let note = await NoteService.findById(id);

      if (!note) {
         res.status(400).json({ error: 'Id não encontrado!' });
         return;
      }

      if (!title || !body) {
         res.status(400).json({ error: 'Campo não preenchido!' });
         return;
      }

      note.id = id;
      note.title = title;
      note.body = body;

      await NoteService.update(id, title, body);
      res.status(201).json(note);
   },

   delete: async (req, res) => {
      let id = req.params.id;

      let note = await NoteService.findById(id);

      if (!note) {
         res.status(400).json({ error: 'Id inválido.' });
         return;
      }

      await NoteService.delete(id);
      res.status(200).json({});
   },
};
