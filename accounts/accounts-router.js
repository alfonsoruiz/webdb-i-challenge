const express = require("express");

// Imports knex to inerface with database
const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const accounts = await db("accounts").select("*");
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving accounts from db" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const account = await db("accounts")
      .select("*")
      .where({ id });

    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: "Error getting account by ID from db" });
  }
});

router.post("/", async (req, res) => {
  const postData = req.body;

  try {
    const account = await db("accounts").insert(postData);
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ error: "Error posting account to db" });
  }
});

router.put("/:id", async (req, res) => {
  const postData = req.body;
  const { id } = req.params;

  try {
    const account = await db("accounts")
      .where({ id })
      .update(postData);
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error: "Error editing account in db" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const account = await db("accounts")
      .where({ id })
      .del();

    res.status(200).json(account);
  } catch (error) {
    res.status(200).json({ error: "Error deleting account from db" });
  }
});

module.exports = router;
