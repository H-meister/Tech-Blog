const router = require("express").Router();
const { User, Sauce } = require("../../models");
const withAuth = require("../../utils/auth");

//get /api/post
router.get("/", (req, res) => {
  Sauce.findAll({
    attributes: [
      'id',
      'title',
      'description',
      'created_at'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then((dbsauceData) => res.json(dbsauceData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get specific Post
router.get("/:id", (req, res) => {
  Sauce.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "this post does not exist 🙈!" });
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Post to post
router.post("/", withAuth, (req, res) => {
  Sauce.create({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    sco_score: req.body.sco_score,
    user_id: req.session.user_id  
  })
    .then((saucePost) => {
      if (!saucePost) {
        res.status(404).json({ message: "this post does not exist 🙈!" });
      }
      res.json(saucePost);
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//DELETE posts
router.delete("/:id", (req, res) => {
  Sauce.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res
          .status(404)
          .json({ message: "No post found with this Id! (╯°□°）╯︵ ┻━┻" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
