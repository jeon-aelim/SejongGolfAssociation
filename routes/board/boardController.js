const boardService = require('./boardService');

module.exports = {
    createContestPost: async (req, res) => {
        const body = req.body;

        try {
            const result = await boardService.createContestPost(body, req.files);
            res.send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    },


    createAnnouncementPost: async (req, res) => {

        const body = req.body;

        try {
            const result = await boardService.createAnnouncementPost(body, req.files);
            res.send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    },

    createPhotoPost: async (req, res) => {
        const body = req.body;

        try {
            const result = await boardService.createPhotoPost(body, req.files);
            res.send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    },

    editContestPost: async (req, res) => {
        const body = req.body;

        try {
            const result = await boardService.editContestPost(body, req.files);
            res.send(result);

        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    },

    editAnnouncementPost: async (req, res) => {
        const body = req.body;

        try {
            const result = await boardService.editAnnouncementPost(body, req.files);
            res.send(result);

        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    },

    editPhotoPost: async (req, res) => {
        const body = req.body;

        try {
            const result = await boardService.editPhotoPost(body, req.files);
            res.send(result);

        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    },

    deletePost: async (req, res) => {
        const boardIdx = req.params.board_idx;
        try {
            const result = await boardService.deletePost(boardIdx);
            res.send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    },

    viewContestPost: async (req, res) => {
        const boardIdx = req.params.board_idx;

        try {
            const result = await boardService.viewContestPost(boardIdx);
            res.send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    },

    viewAnnouncementPost: async (req, res) => {
        const boardIdx = req.params.board_idx;
        try {
            const result = await boardService.viewAnnouncementPost(boardIdx);
            res.send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    },

    viewPhotoPost: async (req, res) => {
        const boardIdx = req.params.board_idx;
        try {
            const result = await boardService.viewPhotoPost(boardIdx);
            res.send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    },

    viewContestBoard: async (req, res) => {
        const year = req.params.year;
        const limit =  req.params.limit;
        const offset = limit * ( req.params.page - 1);
        
        try {
            const result = await boardService.viewContestBoard(year, offset, limit);
            res.send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    },

    viewAnnouncementBoard: async (req, res) => {
        const limit =  req.params.limit;
        const offset = limit * ( req.params.page - 1);

        try {
            const result = await boardService.viewAnnouncementBoard(offset, limit);
            res.send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    },

    viewPhotoBoard: async (req, res) => {
        const limit =  req.params.limit;
        const offset = limit * ( req.params.page - 1);

        try {
            const result = await boardService.viewPhotoBoard(offset, limit);
            res.send(result);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    },

}
