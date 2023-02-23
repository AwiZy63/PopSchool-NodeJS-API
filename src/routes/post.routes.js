const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const { authenticateUser } = require("../middlewares/authentication.middleware");

router.post("/create", authenticateUser, postController.Create);
// Cette route va permettre de créer un post, elle nécessite une authentification

router.get("/", postController.GetAll);
// Cette route va permettre de récupérer tous les posts, elle ne nécessite pas d’authentification

router.get("/:id", postController.GetById);
// Cette route va permettre de récupérer un post grâce au paramètre id, elle ne nécessite pas d’authentification

router.patch("/update", authenticateUser, postController.Update);
// Cette route va permettre d’éditer un post, elle nécessite une authentification

router.delete("/delete", authenticateUser, postController.Delete)
// Cette route va permettre de supprimer un post, elle nécessite une authentification

module.exports = router;