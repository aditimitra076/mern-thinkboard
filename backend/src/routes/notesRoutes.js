import express from "express"
import {getAllNotes} from "../controllers/notesController.js";
import {postAllNotes} from "../controllers/notesController.js";
import {putNote} from "../controllers/notesController.js";
import {deleteNote} from "../controllers/notesController.js";
import {getNoteById} from "../controllers/notesController.js";
const router = express.Router();



router.get("/", getAllNotes); //get all nodes
router.get("/:id", getNoteById); //get one note using id
router.post("/", postAllNotes);
router.put("/:id", putNote);
router.delete("/:id", deleteNote);


export default router;
