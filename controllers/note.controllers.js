import NoteModal from "../modals/notes.modals.js";

const CreateNote = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    if (!title) {
      return res
        .status(403)
        .json({ success: false, message: "Title are Required" });
    }

    const newNotes = await NoteModal.create({ title, userId });
    res
      .status(201)
      .json({ success: true, message: "Note Created Successfull", newNotes });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const FetchNotes = async (req, res) => {
  const userId = req.userId;

  const Notes = await NoteModal.find({ userId });
  if (!Notes) {
    return res.status(404).json({ message: "Data Not Found" });
  }

  res
    .status(200)
    .json({ success: true, message: "Notes Fetched Successfull", Notes });
};

const UpdateNote = async (req, res) => {
  try {
    const userId = req.userId;
    const id = req.params.id;

    const FindNotes = await NoteModal.findById({ _id: id });

    if (!FindNotes) {
      return res
        .status(404)
        .json({ success: false, message: "Note Not Found" });
    }

    const NotesUserId = FindNotes.userId;
    if (userId.toString() !== NotesUserId) {
      return res.status(403).json({
        success: false,
        message: "You are not Authorized to Update this Note",
      });
    }

    const { title } = req.body;
    const updateNotes = await NoteModal.findByIdAndUpdate(
      { _id: id },
      { title },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "Note Updated Successfull",
      updateNotes,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const DeleteNotes = async (req, res) => {
  const userId = req.userId;
  const id = req.params.id;

  const FindNotes = await NoteModal.findById({ _id: id });

  if (!FindNotes) {
    return res.status(404).json({ message: "Note Not Found" });
  }

  const NotesUserId = FindNotes.userId;
  if (userId.toString() !== NotesUserId) {
    return res.status(403).json({
      success: false,
      message: "You are not Authorized to Update this Note",
    });
  }

  const deleteNotes = await NoteModal.findByIdAndDelete({ _id: id });
  res
    .status(200)
    .json({ success: true, message: "Note Deleted Successfull", deleteNotes });
};

export { CreateNote, UpdateNote, DeleteNotes, FetchNotes };
