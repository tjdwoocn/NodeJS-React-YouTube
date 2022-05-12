// import React, { useEffect } from 'react';
// // import Axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { auth } from '../_actions/user_action';
// import { useNavigate } from 'react-router-dom'


// export default function (CompoesedClass, option, adminRoute = null) {

//     // 옵션의 종류
//     // null: 아무나 출입이 가능한 페이지
//     // true: 로그인한 유저만 출입이 가능한 페이지
//     // flase: 로그인한 유저는 출입 불가능한 페이지
//     function AuthenticationCheck(props) {
//         let user = useSelector(state => state.user);
//         let navigate = useNavigate();
//         const dispatch = useDispatch();
        
//         useEffect( () => {
            
//             dispatch(auth()).then(response => {
//                 console.log(response)
//                 // 로그인 하지 않은 상태
//                 if(!response.payload.isAuth) {
//                     if(option) {
//                         navigate("/login")
//                     }
//                 } else {
//                 // 로그인 한 상태
//                     if(adminRoute && !response.payload.isAdmin) {
//                         // admin이 아닌데 admin만 들어갈 수 있는 페이지에 들어가려하는 경우
//                         navigate("/")

//                     } else {
//                         if(option===false){
//                             navigate("/")
//                         }
//                     }

//                 }

//             })

//         }, [dispatch])
//         return (
//         <CompoesedClass {…props} user={user}/>
//         )
//     }

//     return AuthenticationCheck
// }


import React, {useEffect} from 'react';
import { authUser } from '../_actions/user_action';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function (CompoesedClass, reload, adminRoute = null) {

    function AuthenticationCheck(props) {
        let user = useSelector(state => state.user);
        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {
            dispatch(authUser())
                .then(async response => {
                    if (await !response.payload.isAuth) {
                        // 로그인하지 않은 상태
                        if (reload) {
                            navigate('/login')
                        }
                    } else {
                        // 로그인한 상태
                        if (adminRoute && !response.payload.isAdmin) {
                            navigate('/')
                        } else {
                            if (reload === false)
                                navigate('/')
                        }
                    }
                })
        }, [dispatch])
        return (<CompoesedClass {...props} user={user}/>)
    }

    return AuthenticationCheck;
}