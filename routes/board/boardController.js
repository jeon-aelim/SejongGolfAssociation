const boardService = require('./boardService');

const sendError = (error) => {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
}


module.exports = {
    createContestPost: async (req, res) => {
        const body = req.body;

        try {
            const result = await boardService.createContestPost(body, req.files);
            res.send(result);
        } catch (error) {
            sendError(error);
        }
    },


    createAnnouncementPost: async (req, res) => {

        const body = req.body;

        try {
            const result = await boardService.createAnnouncementPost(body, req.files);
            res.send(result);
        } catch (error) {
            sendError(error);
        }
    },

    createPhotoPost: async (req, res) => {
        const body = req.body;

        try {
            const result = await boardService.createPhotoPost(body, req.files);
            res.send(result);
        } catch (error) {
            sendError(error);
        }
    },

    editContestPost: async (req, res) => {
        const body = req.body;

        try {
            const result = await boardService.editContestPost(body, req.files);
            res.send(result);

        } catch (error) {
            sendError(error);
        }
    },

    editAnnouncementPost: async (req, res) => {
        const body = req.body;

        try {
            const result = await boardService.editAnnouncementPost(body, req.files);
            res.send(result);

        } catch (error) {
            sendError(error);
        }
    },

    editPhotoPost: async (req, res) => {
        const body = req.body;

        try {
            const result = await boardService.editPhotoPost(body, req.files);
            res.send(result);

        } catch (error) {
            sendError(error);
        }
    },

    deletePost: async (req, res) => {
        const boardIdx = req.params.board_idx;
        try {
            const result = await boardService.deletePost(boardIdx);
            res.send(result);
        } catch (error) {
            sendError(error);
        }
    },

    viewContestPost: async (req, res) => {
        const boardIdx = req.params.board_idx;

        try {
            const result = await boardService.viewContestPost(boardIdx);
            res.send(result);
        } catch (error) {
            sendError(error);
        }
    },

    viewAnnouncementPost: async (req, res) => {
        const boardIdx = req.params.board_idx;
        try {
            const result = await boardService.viewAnnouncementPost(boardIdx);
            res.send(result);
        } catch (error) {
            sendError(error);
        }
    },

    viewPhotoPost: async (req, res) => {
        const boardIdx = req.params.board_idx;
        try {
            const result = await boardService.viewPhotoPost(boardIdx);
            res.send(result);
        } catch (error) {
            sendError(error);
        }
    },

    viewPreviousContestPost: async (req, res) => {
        const boardIdx = req.params.board_idx;

        try {
            const result = await boardService.viewPreviousContestPost(boardIdx);
            res.send(result);
        } catch (error) {
            sendError(error);
        }
    },

    viewPreviousAnnouncementPost: async (req, res) => {
        const boardIdx = req.params.board_idx;

        try {
            const result = await boardService.viewPreviousAnnouncementPost(boardIdx);
            res.send(result);
        } catch (error) {
            sendError(error);
        }
    },
    
    viewPreviousPhotoPost: async (req, res) => {
        const boardIdx = req.params.board_idx;

        try {
            const result = await boardService.viewPreviousPhotoPost(boardIdx);
            res.send(result);
        } catch (error) {
            sendError(error);
        }
    },

    viewNextContestPost: async (req, res) => {
        const boardIdx = req.params.board_idx;

        try {
            const result = await boardService.viewNextContestPost(boardIdx);
            res.send(result);
        } catch (error) {
            sendError(error);
        }
    },

    viewNextAnnouncementPost: async (req, res) => {
        const boardIdx = req.params.board_idx;

        try {
            const result = await boardService.viewNextAnnouncementPost(boardIdx);
            res.send(result);
        } catch (error) {
            sendError(error);
        }
    },

    viewNextPhotoPost: async (req, res) => {
        const boardIdx = req.params.board_idx;

        try {
            const result = await boardService.viewNextPhotoPost(boardIdx);
            res.send(result);
        } catch (error) {
            sendError(error);
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
            sendError(error);
        }
    },

    viewAnnouncementBoard: async (req, res) => {
        const limit =  req.params.limit;
        const offset = limit * ( req.params.page - 1);

        try {
            const result = await boardService.viewAnnouncementBoard(offset, limit);
            res.send(result);
        } catch (error) {
            sendError(error);
        }
    },

    viewPhotoBoard: async (req, res) => {
        const limit =  req.params.limit;
        const offset = limit * ( req.params.page - 1);

        try {
            const result = await boardService.viewPhotoBoard(offset, limit);
            res.send(result);
        } catch (error) {
            sendError(error);
        }
    },

    searchContest: async (req, res) => {
        const searchWord = req.params.search_word;
        const year = req.params.year;
        const limit =  req.params.limit;
        const offset = limit * ( req.params.page - 1);
        
        try {
            const result = await boardService.searchContest(searchWord, year, offset, limit);
            res.send(result);
        } catch (error) {
            sendError(error);
        }
    },

    
    searchAnnouncement: async (req, res) => {
        const searchWord = req.params.search_word;
        const limit =  req.params.limit;
        const offset = limit * ( req.params.page - 1);

        try {
            const result = await boardService.searchAnnouncement(searchWord, offset, limit);
            res.send(result);
        } catch (error) {
            sendError(error);
        }
    },

    searchPhoto: async (req, res) => {
        const searchWord = req.params.search_word;
        const limit =  req.params.limit;
        const offset = limit * ( req.params.page - 1);

        try {
            const result = await boardService.searchPhoto(searchWord, offset, limit);
            res.send(result);
        } catch (error) {
            sendError(error);
        }
    },

    countContest: async (req, res) => {
        const year = req.params.year;

        try {
            const result = await boardService.countContest(year);
            res.send(result);
        } catch (error) {
            sendError(error);
        }
    },

    countAnnouncement: async (req, res) => {

        try {
            const result = await boardService.countAnnouncement();
            res.send(result);
        } catch (error) {
            sendError(error);
        }
    },

    countPhoto: async (req, res) => {
        try {
            const result = await boardService.countPhoto();
            res.send(result);
        } catch (error) {
            sendError(error);
        }
    },

    previewContest: async (req, res) => {
        try{
            const result = await boardService.previewContest();
            res.send(result);

        }catch(error){
            sendError(error);
        }
    },

    previewAnnouncement: async (req, res) => {
        try{
            const result = await boardService.previewAnnouncement();
            res.send(result);

        }catch(error){
            sendError(error);
        }
    }

    

}
