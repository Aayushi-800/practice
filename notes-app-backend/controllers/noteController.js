import mongoose from "mongoose";
import Note from "../models/Note.js";

function validId(id) {
  return mongoose.isValidObjectId(id);
}

// GET /api/notes — only the signed-in user's notes
export async function getNotes(req, res) {
  try {
    const notes = await Note.find({ owner: req.user.id }).sort({ updatedAt: -1 });
    return res.status(200).json({ count: notes.length, notes });
  } catch (error) {
    console.error("Get notes error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// GET /api/notes/:id
export async function getNoteById(req, res) {
  if (!validId(req.params.id)) return res.status(400).json({ message: "Invalid note ID." });
  try {
    const note = await Note.findOne({ _id: req.params.id, owner: req.user.id });
    if (!note) return res.status(404).json({ message: "Note not found." });
    return res.status(200).json({ note });
  } catch (error) {
    console.error("Get note error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// POST /api/notes
export async function createNote(req, res) {
  try {
    const { title, content = "" } = req.body;
    const note = await Note.create({ title: title.trim(), content, owner: req.user.id });
    return res.status(201).json({ message: "Note created successfully", note });
  } catch (error) {
    if (error?.name === "ValidationError") return res.status(400).json({ message: error.message });
    console.error("Create note error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// PATCH /api/notes/:id
export async function updateNote(req, res) {
  if (!validId(req.params.id)) return res.status(400).json({ message: "Invalid note ID." });

  const updates = {};
  if (Object.hasOwn(req.body, "title")) updates.title = req.body.title.trim();
  if (Object.hasOwn(req.body, "content")) updates.content = req.body.content;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ message: "Provide title or content to update." });
  }

  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!note) return res.status(404).json({ message: "Note not found." });
    return res.status(200).json({ message: "Note updated successfully", note });
  } catch (error) {
    if (error?.name === "ValidationError") return res.status(400).json({ message: error.message });
    console.error("Update note error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// DELETE /api/notes/:id
export async function deleteNote(req, res) {
  if (!validId(req.params.id)) return res.status(400).json({ message: "Invalid note ID." });
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!note) return res.status(404).json({ message: "Note not found." });
    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Delete note error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}