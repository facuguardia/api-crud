import { getConnection } from "./../database/database";

// Get all languages
const getLanguages = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query("SELECT * FROM language");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong!",
    });
  }
};

// Get language by id
const getLanguagesById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT id, name, programmers FROM language WHERE id = ?",
      id
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong!",
    });
  }
};

// Add new language
const addLanguage = async (req, res) => {
  try {
    if (!req.body.name || !req.body.programmers) {
      return res.status(400).json({
        message: "Content not valid!",
      });
    } else {
      const connection = await getConnection();
      const { name, programmers } = req.body;
      const newLanguage = { name, programmers };
      await connection.query("INSERT INTO language SET ?", newLanguage);
      res.status(200).json({ message: "Language created!" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong!",
    });
  }
};

// Update language
const updateLanguage = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const { name, programmers } = req.body;

    if (!id || !name || !programmers) {
      return res.status(400).json({
        message: "Content not valid!",
      });
    } else {
      const updatedLanguage = { name, programmers };
      const result = await connection.query(
        "UPDATE language SET ? WHERE id = ?",
        [updatedLanguage, id]
      );
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong!",
    });
  }
};

// Delete language
const deleteLanguage = async (req, res) => {
  try {
    const connection = await getConnection();
    const { id } = req.params;
    const result = await connection.query("DELETE FROM language WHERE id = ?", [
      id,
    ]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Something goes wrong!",
    });
  }
};

export const methods = {
  getLanguages,
  addLanguage,
  getLanguagesById,
  updateLanguage,
  deleteLanguage,
};
