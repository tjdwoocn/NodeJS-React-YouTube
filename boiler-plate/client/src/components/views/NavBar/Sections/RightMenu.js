import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function RightMenu(props) {
    let navigate = useNavigate();

    const user = useSelector(state => state.user)
    
    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
                navigate('/login');
            } else {
                alert('Log Out Failed')
            }
        });
    };

    if (user.userData && !user.userData.isAuth) {
        // 로그인 안한 사람들
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="mail">
                    <a href="/login">Signin</a>
                </Menu.Item>
                <Menu.Item key="app">
                    <a href="/register">Signup</a>
                </Menu.Item>
            </Menu>
        )
    } else {
        // 로그인 한 사람들
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="upload">
                    <a href="/video/upload">Video</a>
                </Menu.Item>
                <Menu.Item key="logout">
                    <a onClick={logoutHandler}>Logout</a>
                </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(RightMenu);