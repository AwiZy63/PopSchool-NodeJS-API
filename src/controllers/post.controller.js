const Post = require("../models/post.model");

exports.Create = async (req, res) => {
    try {
        const { title, content } = req.body;

        const { id: userId } = req.decoded;

        if (!title || !content) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const postData = {
            title: title,
            content: content,
            author: userId
        }

        await new Post(postData).save();

        return res.status(200).json({
            error: false,
            message: "Le post a bien été créé."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: `Une erreur est survenue : ${error}`
        });
    }
}

exports.GetAll = async (req, res) => {
    try {
        const posts = await Post.findAll();

        const postCount = posts.length;

        return res.status(200).json({
            error: false,
            message: `${postCount} ${postCount <= 1 ? "post récupéré" : "posts récupérés"}.`,
            posts: posts || []
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: `Une erreur est survenue : ${error}`
        });
    }
}

exports.GetById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const post = await Post.findOne({ where: { id: id } });

        if (!post) {
            return res.status(404).json({
                error: true,
                message: `Le post n°${id} n'existe pas.`
            });
        }

        return res.status(200).json({
            error: false,
            message: "Le post a été récupéré.",
            post: post
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: `Une erreur est survenue : ${error}`
        });
    }
}

exports.Update = async (req, res) => {
    try {
        const { id, title, content } = req.body;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const post = await Post.findOne({ where: { id: id } });

        if (!post) {
            return res.status(404).json({
                error: true,
                message: `Le post n°${id} n'existe pas.`
            });
        }
        const postData = {
            title: title ? title : post.title,
            content: content ? content : post.content
        }

        await post.update(postData);

        return res.status(200).json({
            error: false,
            message: "Le post a bien été mis à jour."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: `Une erreur est survenue : ${error}`
        });
    }
}

exports.Delete = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id || isNaN(parseInt(id))) {
            return res.status(400).json({
                error: true,
                message: "Requête invalide."
            });
        }

        const post = await Post.findOne({ where: { id: id } });

        if (!post) {
            return res.status(404).json({
                error: true,
                message: `Le post n°${id} n'existe pas.`
            });
        }

        await post.destroy();

        return res.status(200).json({
            error: false,
            message: `Le post n°${id} a bien été supprimé.`
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: `Une erreur est survenue : ${error}`
        });
    }
}