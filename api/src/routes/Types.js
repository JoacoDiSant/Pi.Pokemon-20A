const { Router } = require("express");
const { GetTypes } = require("./functions");

const router = Router();
// TRAE TODOS LOS TIPOS
router.get("/", async (req, res) => {
  try {
    const type = req.body.name;
    const types = await GetTypes(type)
    return res.json(types)
  } catch (e) {
    res.status(404).json(e);
  }
});



module.exports = router;