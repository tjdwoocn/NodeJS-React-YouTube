// const express = require('express');
// const router = express.Router();
// const { User } = require("../models/User");

// const { auth } = require("../middleware/auth");



// // 기본형태의 Register Route
// router.get('/', (req, res) => {
//     res.send('Hello World! Today is Wednesday!')
// })
// router.get('/api/hello', (req, res) => {
//     res.send('Hello World! ~~~~')
// })


// // Register Route
// router.post('/api/users/register', (req, res) => {
//     // 회원 가입 할 때 필요한 정보들을 clinet에서 가져오면 
//     // 그것들을 데이터 베이스에 넣어주기
//     const user = new User(req.body)
//     // bcrpy로 암호화
//     user.save((err, userInfo) => {
//             if (err) return res.json({ success: false, err, user })
//             return res.status(200).json({
//                 success: true
//             })
//         }) // mongo db에서 오는 method. // Request에 대해 에러가 나면 json 형태로 에러메세지 저장, 성공하면 success
// })


// // login 기능
// router.post('/api/users/login', (req, res) => {
//     // 요청된 email을 데이터베이스에서 찾는다.
//     User.findOne({ email: req.body.email }, (err, user) => {
//         if (!user) {
//             return res.json({
//                 loginSuccess: false,
//                 message: "제공된 이메일에 해당하는 사용자가 없습니다."
//             })
//         }

//         // 요청된 email이 데이터베이스에 있으면 비밀번호가 맞는지 확인한다.
//         user.comparePassword(req.body.password, (err, isMatch) => {
//             if (!isMatch)
//                 return res.json({
//                         loginSuccess: false,
//                         message: "비밀번호가 틀렸습니다."
//                     })
//                     // 비밀번호가 맞을 경우 토큰을 생성한다.
//             user.generateToken((err, user) => {
//                 if (err) return res.status(400).send(err);
//                 // 토큰을 저장한다. where?  cookie or local storage, ..
//                 res.cookie("x_auth", user.token)
//                     .status(200)
//                     .json({ loginSuccess: true, message: user._id })
//             })
//         })

//     })
// })

// // auth, 보안 기능
// router.get('/api/users/auth', auth, (req, res) => {
//     res.status(200).json({
//         _id: req.user._id,
//         isAdmin: req.user.role === 0 ? false : true,
//         isAuth: true,
//         email: req.user.email,
//         name: req.user.name,
//         lastname: req.user.lastname,
//         role: req.user.role,
//         image: req.user.image
//     })
// })

// // logout 기능
// router.get('/api/users/logout', auth, (req, res) => {
//     User.findOneAndUpdate(
//         {_id: req.user._id},
//         {token: ""},
//         (err, user) => {
//             if (err) return res.json({success: false, err});
//             return res.status(200).send({
//                 success: true
//             })
//         })
// })

// module.exports = router;



const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

module.exports = router;