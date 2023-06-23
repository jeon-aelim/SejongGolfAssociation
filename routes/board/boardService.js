const moment = require('moment');
const {
    Sequelize : {Op},
    Board,
    Contest_intro,
    Img,
    Document,
    User

} = require('../../models');

const sendError = async (err) => {
    //to omit duplicated code

    console.log("ERROR!");
    console.log(err);

    let obj = {};

    obj['suc'] = false;
    if (err.errors !== undefined) {
        obj['error'] = err.errors[0].message; // ex. 'error' : "error": "board.board_title cannot be null"
    }

    return obj;
};

const deletePost = async (boardIdx) => {

    try {

        let obj = {};
        const destroyPost = await Board.destroy({
            where: {
                board_idx: boardIdx
            }
        })

        if (destroyPost == 0) { // cannot find post with board_idx
            obj['suc'] = false;
            obj['error'] = "this idx does not exist. ";
        } else if (destroyPost == 1) {
            obj['suc'] = true;
        }
        return obj;
    } catch (err) {

        return sendError(err)
    }

};

const handleCreateError = async (err, boardIdx) => {
    await deletePost(boardIdx); // Deleting a previously created Board Record

    return sendError(err);
};

// create~Row
const createContestRow = async (body, boardIdx) => {

    try {
        const contestIntro = await Contest_intro.create({
            contest_intro_start_date: body.contest_intro_start_date,
            contest_intro_end_date: body.contest_intro_end_date,
            contest_intro_place: body.contest_intro_place,
            contest_intro_year: body.contest_intro_year,
            board_idx: boardIdx
        })

        return contestIntro;
    } catch (err) {

        // create board row -> create that`s child contest row,
        // if (contest row creation failed) { delete board row }
        return handleCreateError(err, boardIdx);
    }

};

const createImageRow = async (boardIdx, imgData) => {

    try {

        let images = [];

        for (let i = 0; i < imgData.length; i++) {
            // to wait to create rows of all the files in the array
            const image = await Img.create({   
                img_url: imgData[i].path,
                board_idx: boardIdx
            });
            images.push(image);
        }
        
        return images

    } catch (err) {

        // create board row -> create that`s child contest row,
        // if (img table creation failed) { delete board row }
        return handleCreateError(err, boardIdx);
    }


};

const createDocumentRow = async (boardIdx, docType, docData) => {



    // to wait to create rows of all the files in the array
    try {

        // Documents of this post 
        let documents = [];

        if (docType == "공지사항") {
            for (let i = 0; i < docData.length; i++) {
                const document = await Document.create({
                    document_url: docData[i].path,
                    document_type: docType,
                    board_idx: boardIdx
                });
                documents.push(document);
            }
        } else {
            // (To fit the type)
            // docData`s type is only Array, but document_type`s type is String or Array.  
            const documentTypes = Array.isArray(docType) ? docType : [docType];
            for (let i = 0; i < docData.length; i++) {
                const document = await Document.create({
                    document_url: docData[i].path,
                    document_type: documentTypes[i],
                    board_idx: boardIdx
                });
                documents.push(document);
            }
        }

        return documents


    } catch (err) {

        return handleCreateError(err, boardIdx);
    }



};

// edit~Row
const editContestRow = async (body) => {

    try {
        const contestIntro = await Contest_intro.update({
            contest_intro_start_date: body.contest_intro_start_date,
            contest_intro_end_date: body.contest_intro_end_date,
            contest_intro_place: body.contest_intro_place,
            contest_intro_year: body.contest_intro_year,
        }, { where: { board_idx: body.board_idx } })

        return contestIntro[0];
    } catch (err) {

        return sendError(err);
    }

};

// create~Post
const createContestPost = async (body, docData) => {


    try {


        let obj = {}; // Object containing the result

        const resultOfPost = await Board.create({

            board_title: body.board_title,
            board_content: body.board_content,
            board_type: "대회안내",
            board_date: moment().format("YYYY-MM-DD HH:mm:SS"),
            user_idx: body.user_idx
        })

        const resultOfContest = await createContestRow(body, resultOfPost.board_idx);

        let combineObj = Object.assign({}, resultOfPost.dataValues, resultOfContest.dataValues);

        if (docData[0] != null) {
            const resultOfDocument = await createDocumentRow(resultOfPost.board_idx, body.document_type, docData);

            combineObj = Object.assign(combineObj, { 'documents': resultOfDocument });

        }


        obj['suc'] = true;
        obj['result'] = combineObj;

        return obj

    } catch (err) {

        return sendError(err)
    }

};

const createAnnouncementPost = async (body, docData) => {


    try {


        let obj = {}; // Object containing the result

        const resultOfPost = await Board.create({
            board_title: body.board_title,
            board_content: body.board_content,
            board_type: "공지사항",
            board_date: moment().format("YYYY-MM-DD HH:mm:ss"),
            user_idx: body.user_idx
        });


        obj['suc'] = true;

        if (docData[0] != null) {
            const resultOfDocument = await createDocumentRow(resultOfPost.board_idx, "공지사항", docData);

            obj['result'] = Object.assign({}, resultOfPost.dataValues, { 'documents': resultOfDocument });;

        } else {
            obj['result'] = resultOfPost;
        }

        return obj

    } catch (err) {

        return sendError(err)
    }

};

const createPhotoPost = async (body, imgData) => {


    try {

        let obj = {}; // Object containing the result

        if (imgData[0] != null) {

            const resultOfPost = await Board.create({
                board_title: body.board_title,
                board_content: body.board_content,
                board_type: "포토갤러리",
                board_date: moment().format("YYYY-MM-DD HH:mm:ss"),
                user_idx: body.user_idx
            });
            const resultOfImage = await createImageRow(resultOfPost.board_idx, imgData);

            obj['suc'] = true;
            obj['result'] = Object.assign({}, resultOfPost.dataValues, { 'images': resultOfImage });

        } else {
            obj['suc'] = false;
            obj['result'] = "Image file is required. ";
        }

        return obj;


    } catch (err) {

        return sendError(err)
    }
};

// edit~Post
const editContestPost = async (body, docData) => {

    try {

        let obj = {}; // Object containing the result

        await Board.update({

            board_title: body.board_title,
            board_content: body.board_content
        }, { where: { board_idx: body.board_idx } })

        await editContestRow(body);
        
        try {
            await Document.destroy({
                where: { board_idx: body.board_idx }
            })
        } catch (err) {
            return sendError(err);
        }

        if (docData[0] != null) {
            await createDocumentRow(body.board_idx, body.document_type, docData);
        }

        obj['suc'] = true;
        
        return obj

    } catch (err) {

        return sendError(err)
    }

};

const editAnnouncementPost = async (body, docData) => {

    try {

        let obj = {}; // Object containing the result

        await Board.update({

            board_title: body.board_title,
            board_content: body.board_content
        }, { where: { board_idx: body.board_idx } })

        try {
            await Document.destroy({
                where: { board_idx: body.board_idx }
            })
        } catch (err) {
            return sendError(err);
        }

        if (docData[0] != null) {

            await createDocumentRow(body.board_idx, body.document_type, docData);
        }

        obj['suc'] = true;
        
        return obj

    } catch (err) {

        return sendError(err)
    }
};

const editPhotoPost = async (body, imgData) => {

    try {

        let obj = {}; // Object containing the result

        await Board.update({

            board_title: body.board_title,
            board_content: body.board_content
        }, { where: { board_idx: body.board_idx } })


        try {
            await Img.destroy({
                where: { board_idx: body.board_idx }
            })
        } catch (err) {
            return sendError(err);
        }

        if (imgData[0] != null) {
            await createImageRow(body.board_idx, imgData);
        }

        obj['suc'] = true;
        
        return obj

    } catch (err) {

        return sendError(err)
    }

};

// view~Post
const viewContestPost = async (boardIdx) => {

    try {

        let obj = {};
        const resultOfPost = await Board.findOne({
            where: {
                board_idx: boardIdx
            },
            include : [
                {model : Contest_intro},
                {model : Document}
            ]
        })

        if (resultOfPost == null) {
            obj['suc'] = false;
            obj['error'] = "this idx does not exist. ";
        } else {
            obj['suc'] = true;
            obj['result'] = resultOfPost
        }
        return obj;
    } catch (err) {

        return sendError(err)
    }

};

const viewAnnouncementPost = async (boardIdx) => {

    try {

        let obj = {};
        const resultOfPost = await Board.findOne({
            where: {
                board_idx: boardIdx
            },
            include : [
                {model : Document}
            ]
        })

        if (resultOfPost == null) {
            obj['suc'] = false;
            obj['error'] = "this idx does not exist. ";
        } else {
            obj['suc'] = true;
            obj['result'] = resultOfPost
        }
        return obj;
    } catch (err) {

        return sendError(err)
    }

};

const viewPhotoPost = async (boardIdx) => {

    try {

        let obj = {};
        const resultOfPost = await Board.findOne({
            where: {
                board_idx: boardIdx
            },
            include : [
                {model : Img}
            ]
        })

        if (resultOfPost == null) {
            obj['suc'] = false;
            obj['error'] = "this idx does not exist. ";
        } else {
            obj['suc'] = true;
            obj['result'] = resultOfPost
        }
        return obj;
    } catch (err) {

        return sendError(err)
    }

};

// view Previous Post
const viewPreviousContestPost = async (boardIdx) => {

    try {

        let obj = {};
        const resultOfPost = await Board.findAll({
            where: {
                board_idx: { [Op.lt] : boardIdx },
                board_type : "대회안내"
            },
            order:[ ['board_idx','DESC']],
            include : [
                {model : Document},
                {model : User, attributes: ['user_name']}
            ],
            limit : 1,
        })

        if (resultOfPost[0] == null) {
            obj['suc'] = false;
            obj['error'] = "previous post does not exist. ";
        } else {
            obj['suc'] = true;
            obj['result'] = resultOfPost[0]
        }
        return obj;
    } catch (err) {

        return sendError(err)
    }

};

const viewPreviousAnnouncementPost = async (boardIdx) => {

    try {

        let obj = {};
        const resultOfPost = await Board.findAll({
            where: {
                board_idx: { [Op.lt] : boardIdx },
                board_type : "공지사항"
            },
            order:[ ['board_idx','DESC']],
            include : [
                {model : Document},
                {model : User, attributes: ['user_name']}
            ],
            limit : 1,
        })

        if (resultOfPost[0] == null) {
            obj['suc'] = false;
            obj['error'] = "previous post does not exist. ";
        } else {
            obj['suc'] = true;
            obj['result'] = resultOfPost[0]
        }
        return obj;
    } catch (err) {

        return sendError(err)
    }

};

const viewPreviousPhotoPost = async (boardIdx) => {

    try {

        let obj = {};
        const resultOfPost = await Board.findAll({
            where: {
                board_idx: { [Op.lt] : boardIdx },
                board_type : "포토갤러리"
            },
            order:[ ['board_idx','DESC']],
            include : [
                {model : User, attributes: ['user_name']}
            ],
            limit : 1,
        })

        if (resultOfPost[0] == null) {
            obj['suc'] = false;
            obj['error'] = "previous post does not exist. ";
        } else {
            obj['suc'] = true;
            obj['result'] = resultOfPost[0]
        }
        return obj;
    } catch (err) {

        return sendError(err)
    }

};

// view Next Post
const viewNextContestPost = async (boardIdx) => {

    try {

        let obj = {};
        const resultOfPost = await Board.findAll({
            where: {
                board_idx: { [Op.gt] : boardIdx },
                board_type : "대회안내"
            },
            order:[ ['board_idx','ASC']],
            include : [
                {model : Document},
                {model : User, attributes: ['user_name']}
            ],
            limit : 1
        })

        if (resultOfPost[0] == null) {
            obj['suc'] = false;
            obj['error'] = "next post does not exist. ";
        } else {
            obj['suc'] = true;
            obj['result'] = resultOfPost[0]
        }
        return obj;
    } catch (err) {

        return sendError(err)
    }

};

const viewNextAnnouncementPost = async (boardIdx) => {

    try {

        let obj = {};
        const resultOfPost = await Board.findAll({
            where: {
                board_idx: { [Op.gt] : boardIdx },
                board_type : "공지사항"
            },
            order:[ ['board_idx','ASC']],
            include : [
                {model : Document},
                {model : User, attributes: ['user_name']}
            ],
            limit : 1,
        })

        if (resultOfPost[0] == null) {
            obj['suc'] = false;
            obj['error'] = "next post does not exist. ";
        } else {
            obj['suc'] = true;
            obj['result'] = resultOfPost[0]
        }
        return obj;
    } catch (err) {

        return sendError(err)
    }

};

const viewNextPhotoPost = async (boardIdx) => {

    try {

        let obj = {};
        const resultOfPost = await Board.findAll({
            where: {
                board_idx: { [Op.gt] : boardIdx },
                board_type : "포토갤러리"
            },
            order:[ ['board_idx','ASC']],
            include : [
                {model : User, attributes: ['user_name']}
            ],
            limit : 1,
        })

        if (resultOfPost[0] == null) {
            obj['suc'] = false;
            obj['error'] = "next post does not exist. ";
        } else {
            obj['suc'] = true;
            obj['result'] = resultOfPost[0]
        }
        return obj;
    } catch (err) {

        return sendError(err)
    }

};

// view~Board
const viewContestBoard = async (year, offset, limit) => {

    try {
        let obj = {};
        const resultOfPost = await Contest_intro.findAll({
            where: {
                contest_intro_year: year
            },
            attributes : ['contest_intro_start_date', 'contest_intro_end_date','contest_intro_place', 'board_idx'],
            include: {
                model: Board,
                attributes: ['board_title'],
                include : { model : Document}
            },
            offset: parseInt(offset),
            limit: parseInt(limit)
        })

        if (resultOfPost == null) {
            obj['suc'] = false;
            obj['error'] = "this year does not exist. ";
        } else {
            obj['suc'] = true;
            obj['result'] = resultOfPost;
        }
        return obj;
    } catch (err) {

        return sendError(err)
    }

};

const viewAnnouncementBoard = async (offset, limit) => {

    try {

        let obj = {};
        const resultOfPost = await Board.findAll({
            where: {
                board_type : "공지사항"
            },
            attributes: ['board_idx', 'board_title', 'board_date'],
            include : { model : Document},
            offset: parseInt(offset),
            limit: parseInt(limit)
        })

        if (resultOfPost == null) {
            obj['suc'] = false;
            obj['error'] = "not exist. ";
        } else {
            obj['suc'] = true;
            obj['result'] = resultOfPost
        }
        return obj;
    } catch (err) {

        return sendError(err)
    }

};

const viewPhotoBoard = async (offset, limit) => {

    try {

        let obj = {};
        const resultOfPost = await Board.findAll({
            where: {
                board_type : "포토갤러리"
            },
            include : { 
                // send first photo 
                model : Img, 
                order : [['img_idx','ASC']], 
                limit : 1, 
            },
            attributes : ['board_idx', 'board_title', 'board_date'],
            offset: parseInt(offset),
            limit: parseInt(limit)
        })

        if (resultOfPost == null) {
            obj['suc'] = false;
            obj['error'] = "not exist. ";
        } else {
            obj['suc'] = true;
            obj['result'] = resultOfPost
        }
        return obj;
    } catch (err) {

        return sendError(err)
    }

};

// search
const searchContest =  async (searchWord, year, offset, limit) => {

    try {
        let obj = {};
        const resultOfPost = await Contest_intro.findAll({
            where: {
                contest_intro_year: year
            },
            attributes : ['contest_intro_start_date', 'contest_intro_end_date','contest_intro_place', 'board_idx'],
            include: {
                model: Board,
                attributes: ['board_title'],
                include : { model : Document},
                where: {
                    board_title: {[Op.like]: "%" + searchWord + "%"}
                }
            },
            offset: parseInt(offset),
            limit: parseInt(limit)
        })

        if (resultOfPost == null) {
            obj['suc'] = false;
            obj['error'] = "this year does not exist. ";
        } else {
            obj['suc'] = true;
            obj['result'] = resultOfPost;
        }
        return obj;
    } catch (err) {

        return sendError(err)
    }

};

const searchAnnouncement = async (searchWord, offset, limit) => {

    try {

        let obj = {};
        const resultOfPost = await Board.findAll({
            where: {
                board_type : "공지사항",
                board_title: {[Op.like]: "%" + searchWord + "%"}
            },
            attributes: ['board_idx', 'board_title', 'board_date'],
            include : { model : Document},
            offset: parseInt(offset),
            limit: parseInt(limit)
        })

        if (resultOfPost == null) {
            obj['suc'] = false;
            obj['error'] = "not exist. ";
        } else {
            obj['suc'] = true;
            obj['result'] = resultOfPost
        }
        return obj;
    } catch (err) {

        return sendError(err)
    }

};

const searchPhoto = async (searchWord, offset, limit) => {

    try {

        let obj = {};
        const resultOfPost = await Board.findAll({
            where: {
                board_type : "포토갤러리",
                board_title: {[Op.like]: "%" + searchWord + "%"}
            },
            include : { 
                // send first photo 
                model : Img, 
                order : [['img_idx','ASC']], 
                limit : 1, 
            },
            attributes : ['board_idx', 'board_title', 'board_date'],
            offset: parseInt(offset),
            limit: parseInt(limit)
        })

        if (resultOfPost == null) {
            obj['suc'] = false;
            obj['error'] = "not exist. ";
        } else {
            obj['suc'] = true;
            obj['result'] = resultOfPost
        }
        return obj;
    } catch (err) {

        return sendError(err)
    }

};

// count 
const countContest = async(year) => {

    try {

        let obj = {};
        const numberOfContest = await Board.count({
            where: {
                board_type : "대회안내"
            },
            include : {
                model : Contest_intro,
                where: {
                    contest_intro_year : year
                }
            }
        })

        if(numberOfContest == null ||numberOfContest == 0){
            obj['suc'] = false;
            obj['error'] = "not exist. ";
        }else{
            obj['suc'] = true;
            obj['result'] = numberOfContest
        }
        return obj;

    }catch (err) {

        return sendError(err)
    }

};

const countAnnouncement = async() => {

    try {

        let obj = {};
        const numberOfContest = await Board.count({
            where: {
                board_type : "공지사항"
            }
        })

        if(numberOfContest == null ||numberOfContest == 0){
            obj['suc'] = false;
            obj['error'] = "not exist. ";
        }else{
            obj['suc'] = true;
            obj['result'] = numberOfContest
        }
        return obj;

    }catch (err) {

        return sendError(err)
    }

};

const countPhoto = async() => {

    try {

        let obj = {};
        const numberOfContest = await Board.count({
            where: {
                board_type : "포토갤러리"
            }
        })

        if(numberOfContest == null ||numberOfContest == 0){
            obj['suc'] = false;
            obj['error'] = "not exist. ";
        }else{
            obj['suc'] = true;
            obj['result'] = numberOfContest
        }
        return obj;

    }catch (err) {

        return sendError(err)
    }

}

// preview
const previewContest = async() => {

    try{
        let obj={};
        const preview = await Board.findAll({
            where: {
                board_type : "대회안내"
            },
            order:[['board_idx', 'DESC']],
            limit: 3
        })

        if(preview == null){
            obj['suc'] = false;
            obj['error'] = "not exist. ";
        }else{
            obj['suc'] = true;
            obj['result'] = preview
        }
        return obj;

    }catch (err) {

        return sendError(err)
    }
}

const previewAnnouncement = async() => {

    try{
        let obj ={};
        const preview = await Board.findAll({
            where: {
                board_type : "공지사항"
            },
            order: [['board_idx', 'DESC']],
            limit :3
        })

        if(preview == null){
            obj['suc'] = false;
            obj['error'] = "not exist. ";
        }else{
            obj['suc'] = true;
            obj['result'] = preview;
        }

        return obj;
    }catch(err){
        return sendError(err)
    }
}
module.exports = {
    createContestPost,
    createAnnouncementPost,
    createPhotoPost,
    deletePost,
    editContestPost,
    editAnnouncementPost,
    editPhotoPost,
    viewContestPost,
    viewAnnouncementPost,
    viewPhotoPost,
    viewContestBoard,
    viewAnnouncementBoard,
    viewPhotoBoard,
    searchContest,
    searchAnnouncement,
    searchPhoto,
    countContest,
    countAnnouncement,
    countPhoto,
    viewPreviousContestPost,
    viewPreviousAnnouncementPost,
    viewPreviousPhotoPost,
    viewNextContestPost,
    viewNextAnnouncementPost,
    viewNextPhotoPost,
    previewContest,
    previewAnnouncement
}
