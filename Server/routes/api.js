const express = require("express");
const router = express.Router();
const userApi = require("./apiroutes/userapi");

router.use("/users", userApi);

router.get("/", (req, res) => {
  res.send("in api route");
});

module.exports = router;
