const express = require('express');
const router = express.Router();
const fecthuser = require('../middleware/fecthuser');
const Notes = require('../models/Note');
const { body, validationResult } = require('express-validator');

// route 1 : get all notes form  the user using  GET :" /api/notes/fecthnotes" login required
router.get('/fecthnotes', fecthuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        res.status(400).status({ error: " internal server error" })
    }
});
// route 2 : add all notes form  the user using  post :" /api/notes/addnote" login required
router.post('/addnote', fecthuser, [
    body('title', "ENter valid title").isLength({ min: 4 }),
    body('description', "description is to short").isLength({ min: 5 })], async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const saveNote = await note.save();
            res.json(saveNote)
        } catch (error) {
            res.status(400).status({ error: " internal server error" })
        }
    });

// route 3 : add all notes form  the user using  post :" /api/notes/updatenote" login required 
router.put('/updatenote/:id', fecthuser, async (req, res) => {
    try {


        const { title, description, tag } = req.body;
        const newnote = {}
        if (title) { newnote.title = title }
        if (description) { newnote.description = description }
        if (tag) { newnote.tag = tag }
        // find the note and upadte note
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found any notes")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Acess denied!")
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
        res.json(note);
    } catch (error) {
        res.status(400).status({ error: " internal server error" })
    }
})
// route 3 : delete notes form  the user using  post :" /api/notes/deletenote" login required 
router.delete('/deletenote/:id', fecthuser, async (req, res) => {
    try {
        // find the note and upadte note
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found any notes")
        }
        // allow deletion only if user own this
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Acess denied!")
        }
        note = await Notes.findByIdAndRemove(req.params.id)
        res.json({ "success": "Deleted Successfully!", note: note });
    } catch (error) {
        res.status(400).status({ error: " internal server error" })
    }
})





module.exports = router