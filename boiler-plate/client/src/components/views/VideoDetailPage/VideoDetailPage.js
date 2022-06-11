import React, { useEffect, useState } from 'react'
import Auth from '../../../hoc/auth'
import { Row, Col, List, Avatar } from 'antd'
import axios from 'axios';
import {useParams} from "react-router-dom";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";

function VideoDetailPage(props) {
  // change router v6
  // const videoId = props.match.params.videoId;
  const videoId = useParams().videoId;
  const videoVariable = {videoId: videoId}

  const [VideoDetail, setVideoDetail] = useState([]);

  useEffect(() => {
      axios.post('/api/video/getVideoDetail', videoVariable)
          .then(response => {
              if (response.data.success) {
                  setVideoDetail(response.data.VideoDetail)
              } else {
                  alert('비디오 정보를 가져오길 실패했습니다.')
              }
          })
  }, [])

  if (VideoDetail.writer) {
    return (
        <Row gutter={[16, 16]}>
            <Col lg={18} xs={24}>
                <div style={{width: '100%', padding: '3rem 4rem'}}>
                    <video style={{width: '100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls/>
                    <List.Item
                        actions={
                            [<Subscribe
                                userTo={VideoDetail.writer._id}
                                userFrom={localStorage.getItem('userId')}/>]
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={VideoDetail.writer && VideoDetail.writer.image}/>}
                            title={VideoDetail.writer.name}
                            description={VideoDetail.description}
                        ></List.Item.Meta>
                    </List.Item>
                </div>
            </Col>
            <Col lg={6} xs={24}>
                <SideVideo/>
            </Col>
        </Row>
    )
} else {
    return <div> Loading...</div>
}
}


export default Auth(VideoDetailPage, null);
