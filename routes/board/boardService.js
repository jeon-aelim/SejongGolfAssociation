const moment = require('moment');
const {
    sequelize,
    Board,
    Contest_intro,
    Img,
    Document

} = require('../../models');

const throwError = async (err) => {

    console.log("ERROR!");
    console.log(err);

    let obj = {};

    obj['suc'] = false;
    if (err.errors !== undefined) {
        obj['error'] = err.errors[0].message;
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

        if (destroyPost == 0) {
            obj['suc'] = false;
            obj['error'] = "this idx does not exist. ";
        } else if (destroyPost == 1) {
            obj['suc'] = true;
        }
        return obj;
    } catch (err) {

        return throwError(err)
    }

};

const handleCreateError = async (err, boardIdx) => {
    await deletePost(boardIdx); // Deleting a previously created Board Record

    return throwError(err);
};

const createContestTable = async (body, boardIdx) => {

    try {
        const contestIntro = await Contest_intro.create({
            contest_intro_start_date: body.contest_intro_start_date,
            contest_intro_end_date: body.contest_intro_end_date,
            contest_intro_place: body.contest_intro_place,
            board_idx: boardIdx
        })

        return contestIntro;
    } catch (err) {

        return handleCreateError(err, boardIdx);
    }

};

const createImageTable = async (boardIdx, imgData) => {


    // to wait to create rows of all the files in the array
    try {

        // Documents of this post 
        let images = [];

        for (let i = 0; i < imgData.length; i++) {
            const image = await Img.create({
                img_url: imgData[i].path,
                board_idx: boardIdx
            });
            images.push(image);
        }
        
        return images

    } catch (err) {

        return handleCreateError(err, boardIdx);
    }


};

const createDocumentTable = async (boardIdx, docType, docData) => {



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

const editContestTable = async (body) => {

    try {
        const contestIntro = await Contest_intro.update({
            contest_intro_start_date: body.contest_intro_start_date,
            contest_intro_end_date: body.contest_intro_end_date,
            contest_intro_place: body.contest_intro_place,
        }, { where: { board_idx: body.board_idx } })

        return contestIntro[0];
    } catch (err) {

        return throwError(err);
    }

};

const createContestPost = async (body, docData) => {


    try {


        let obj = {}; // Object containing the result

        const resultOfPost = await Board.create({

            board_title: body.board_title,
            board_content: body.board_content,
            board_type: "대회일정",
            board_date: moment().format("YYYY-MM-DD HH:mm:SS"),
            user_idx: body.user_idx
        })

        const resultOfContest = await createContestTable(body, resultOfPost.board_idx);

        let combineObj = Object.assign({}, resultOfPost.dataValues, resultOfContest.dataValues);

        if (docData[0] != null) {
            const resultOfDocument = await createDocumentTable(resultOfPost.board_idx, body.document_type, docData);

            combineObj = Object.assign(combineObj, { 'documents': resultOfDocument });

        }


        obj['suc'] = true;
        obj['result'] = combineObj;

        return obj

    } catch (err) {

        return throwError(err)
    }

};

const createAnnouncementPost = async (body, docData) => {


    try {


        let obj = {};

        const resultOfPost = await Board.create({
            board_title: body.board_title,
            board_content: body.board_content,
            board_type: "공지사항",
            board_date: moment().format("YYYY-MM-DD HH:mm:ss"),
            user_idx: body.user_idx
        });


        obj['suc'] = true;

        if (docData[0] != null) {
            const resultOfDocument = await createDocumentTable(resultOfPost.board_idx, "공지사항", docData);

            obj['result'] = Object.assign({}, resultOfPost.dataValues, { 'documents': resultOfDocument });;

        } else {
            obj['result'] = resultOfPost;
        }

        return obj

    } catch (err) {

        return throwError(err)
    }

};

const createPhotoPost = async (body, imgData) => {


    try {

        let obj = {};

        if (imgData[0] != null) {

            const resultOfPost = await Board.create({
                board_title: body.board_title,
                board_content: body.board_content,
                board_type: "포토갤러리",
                board_date: moment().format("YYYY-MM-DD HH:mm:ss"),
                user_idx: body.user_idx
            });
            const resultOfImage = await createImageTable(resultOfPost.board_idx, imgData);

            obj['suc'] = true;
            obj['result'] = Object.assign({}, resultOfPost.dataValues, { 'images': resultOfImage });

        } else {
            obj['suc'] = false;
            obj['result'] = "Image file is required. ";
        }

        return obj;


    } catch (err) {

        return throwError(err)
    }
};

const editContestPost = async (body, docData) => {

    try {

        let obj = {}; // Object containing the result

        await Board.update({

            board_title: body.board_title,
            board_content: body.board_content
        }, { where: { board_idx: body.board_idx } })

        await editContestTable(body);

        if (docData[0] != null) {
            
            try {
                await Document.destroy({
                    where: { board_idx: body.board_idx }
                })
            } catch (err) {
                return throwError(err);
            }

            await createDocumentTable(body.board_idx, body.document_type, docData);
        }

        obj['suc'] = true;
        
        return obj

    } catch (err) {

        return throwError(err)
    }

};

const editAnnouncementPost = async (body, docData) => {

    try {

        let obj = {}; // Object containing the result

        await Board.update({

            board_title: body.board_title,
            board_content: body.board_content
        }, { where: { board_idx: body.board_idx } })

        if (docData[0] != null) {
            try {
                await Document.destroy({
                    where: { board_idx: body.board_idx }
                })
            } catch (err) {
                return throwError(err);
            }

            await createDocumentTable(body.board_idx, body.document_type, docData);
        }

        obj['suc'] = true;
        
        return obj

    } catch (err) {

        return throwError(err)
    }
};

const editPhotoPost = async (body, imgData) => {

    try {

        let obj = {}; // Object containing the result

        await Board.update({

            board_title: body.board_title,
            board_content: body.board_content
        }, { where: { board_idx: body.board_idx } })

        if (imgData[0] != null) {

            try {
                await Img.destroy({
                    where: { board_idx: body.board_idx }
                })
            } catch (err) {
                return throwError(err);
            }

            await createImageTable(body.board_idx, imgData);
        }

        obj['suc'] = true;
        
        return obj

    } catch (err) {

        return throwError(err)
    }

};

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

        return throwError(err)
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

        return throwError(err)
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

        return throwError(err)
    }

};

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
    viewPhotoPost
}
