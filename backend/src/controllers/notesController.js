import Note from "../models/Note.js";

//GET REQUEST
export async function getAllNotes(req, res){
    try{
        const notes = await Note.find().sort({createdAt:-1}); //-1 will sort from latest to oldest , 1 will sort from oldest to latest(1 is by default value)
        res.status(200).json(notes);

    }catch(error){
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message:"Internal Server error"});
    }
}

//GET REQUEST 2
export async function getNoteById(req, res){
    try{
        const note= await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message:"Note not found!"}); //invalid id by user
        res.status(200).json(note);

    }catch(error){
        console.error("Error in getNoteById", error);
        res.status(500).json({message:"Internal Server error"});
    }
}

//POST REQUEST
export async function postAllNotes(req,res){
    try{
        const {title, content} = req.body;
        const note= new Note({title, content});

        const savedNote = await note.save();
        res.status(201).json(savedNote);
    }catch(error){
        console.error("Error in createdNote controller", error);
        res.status(500).json({message:"Internal server error"});

    }
}

//PUT REQUEST
export async function putNote(req, res){
    try{
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title, content},{
            new: true,
        });

        if(!updatedNote) return res.status(404).json({message: "Note not found"});
        
        res.status(200).json({message: "Note updated successfully."});
    }catch(error){
        console.error("Error in updatNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
}

//DELETE REQUEST
export async function deleteNote(req,res){
    try{
        const deletedNode = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNode) return res.status(404),json({message: "Note not found"});  //user put aninvalid id
        res.status(200).json({message:"Note deleted successfully!"})
    }catch(error){
        console.error("Error in deleteNote controller", error);
        res.status(500).json({message:"Internal Server error"});
    }
}