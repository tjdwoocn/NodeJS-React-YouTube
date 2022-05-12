const express = require('express');
const { Video } = require("../models/Video");
const { auth } = require("../middleware/auth");
const multer = require('multer');
const path = require('path');
const router = express.Router();

var ffmpeg = require('fluent-ffmpeg');


// Storage Multer Config
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== 'mp4'){
            return cb(res.status(400).end('only mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

// 한번에 하나의 파일만 upload 가능
const upload = multer({ storage: storage }).single('file');

// ==============================
//            Video 
// ==============================

// 여기 router에 필요한 데이터가 상위 폴더/파일인 index.js에서 보내지는 거기 떄문에 post 경로로 'api/video/' 부분을 제외시켜줘도 됨
router.post('/uploads', (req, res) => {

    // client 에서 받은 비디오를 서버에 저장
    upload(req, res, err => {
        if(err){
            return res.json({ success: false, err})
        }
        return res.json({success: true, url: res.req.file.path, fileName: res.req.file.filename })
    })

})

// video upload router
router.post('/uploadVideo', (req, res) => {
    console.log(req.body, "리퀘")
    // 비디오 정보들을 저장한다
    const video = new Video (req.body)  // video 의 모든 variables 정보를 담음
    // video 정보를 mongo db에 저장하기 
    video.save((err, doc) => {
        if(err) return res.json({ success : false , err})
        res.status(200).json({ success : true })
    })

})



// video 불러오기 router
router.post('/getVideos', (req, res) => {

    // 비디오 정보들을 DB에서 가져와서 클라이언트에 보낸다.
    Video.find()
    .populate('writer')
    .exec((err, videos) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({ success: true, videos })
    })

})



// Thumbnail router
router.post('/thumbnail', (req, res) => {

    // client 에서 받은 비디오에 해당하는 썸네일을 생성하고, 비디오 러닝타임도 가져오기

    let filePath = "";
    let fileDuration = "";

    // 비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function (err, metadata){    // ffprobe는 ffmpeg를 다운받을때 같이 가져와짐
        console.dir(metadata); // all metadata
        fileDuration = metadata.format.duration
    });


    // 썸네일 생성
    ffmpeg(req.body.url)
    .on('filenames', function (filenames) { // 비디오 썸네일의 파일네임을 생성하고
        console.log('Will generate ' + filenames.join(', '))


        filePath = "uploads/thumbnails/" + filenames[0]
    })
    .on('end', function () { // 비디오 썸네일을 생성하고 난 뒤 무엇을 할것인지 정의
        console.log('Screenshots taken');
        return res.json({ success: true, url: filePath, fileDuration: fileDuration});
    })
    .on('error', function (err) {
        console.error(err);
        return res.json({ success: false, err });
    })
    .screenshots({
        // Will take screenshots at 20%, 40%, 60% and 80% of the video
        count: 3,    // 3개의 썸네일 생성
        folder: 'uploads/thumbnails',
        size: '320x240',
        // '%b': input basename (filename w/o extension)
        filename: 'thumbnail-%b.png'
    })
})

module.exports = router;
