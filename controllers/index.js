const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);

//This is so if we make a request to any endpoint that doesn't exist, we'll receive a 404 error
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
