import React, { useEffect, useState } from 'react'
import Auth from '../../../../hoc/auth'
import axios from 'axios';


function Subscribe(){

    const [SubscribeNumber, setSubscribeNumber] = useState([])


    useEffect(() => {

        let variable = { userTo: '1'}

        axios.post('/api/subscribe/subscribeNumber', variable)
            .then( response => {
                if(response.data.success) {
                    setSubscribeNumber(response.data.SubscribeNumber)
                } else {
                    alert('구독자 수를 받아오지 못하였습니다.')
                }
            })

        let subscribedVariable = { userTo: '1', userFrom: localStorage.getItem('userId') }

        axios.post('api/subscribe/subscribed', )
            .then( response => {
                if(response.data.success){

                } else {
                    alert('정보를 받아오지 못했습니다.')
                }
            })

    }, [])


    return(
        <div>
            <button
                style={{ backgroundColor:'#CC0000', borderRadius: '4px', 
                        color: 'white', padding: '10px 16px', fontWeight: '500',
                        fontSize: '1rem', textTransform: 'uppercase'
                        }}
                        onClick>
                0 Subscribe
            </button>
        </div>
        )
}

export default Auth(Subscribe, null);
