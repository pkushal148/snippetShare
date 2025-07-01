const express = require("express");
const sampleSnippets = require("../models/sampleSnippets");
const authenticateToken = require("../firebase/auth");

// In-memory snippet store (replace with DB in production)
let snippets = [...sampleSnippets];

const router = express.Router();

// Protect all snippet routes with Firebase authentication
router.use(authenticateToken);

/**
 * GET /api/snippets
 * Returns all code snippets
 */
router.get("/", (req, res) => {
  res.json(snippets);
});

/**
 * POST /api/snippets
 * Adds a new code snippet
 * Expects: { title, code, language }
 */
router.post("/", (req, res) => {
  const { title, code, language } = req.body;
  if (!title || !code || !language) {
    return res
      .status(400)
      .json({ error: "Title, code, and language are required." });
  }
  const snippet = {
    id: Date.now().toString(),
    title,
    code,
    language,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  snippets.push(snippet);
  res.status(201).json(snippet);
});

/**
 * PUT /api/snippets/:id
 * Updates an existing snippet
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, code, language } = req.body;
  const index = snippets.findIndex((s) => s.id === id);
  if (index === -1)
    return res.status(404).json({ error: "Snippet not found." });
  if (title) snippets[index].title = title;
  if (code) snippets[index].code = code;
  if (language) snippets[index].language = language;
  snippets[index].updatedAt = new Date().toISOString();
  res.json(snippets[index]);
});

/**
 * DELETE /api/snippets/:id
 * Deletes a snippet
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = snippets.findIndex((s) => s.id === id);
  if (index === -1)
    return res.status(404).json({ error: "Snippet not found." });
  snippets.splice(index, 1);
  res.status(204).end();
});

module.exports = router;
