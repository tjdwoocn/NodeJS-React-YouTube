import React, { useState } from 'react'
import Auth from '../../../hoc/auth'
import { Typography, Button, Form, message, Input, Icon} from antd
import Dropzone from 'react-dropzone';

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
    {value: 0, label: "Private"},
    {value: 1, label: "Public"}
]

const CategoryOptions = [
    {value: 0, label: "Film & Animation"},
    {value: 1, label: "Autos & Vehicles"},
    {value: 2, label: "Music"},
    {value: 3, label: "Pets & Animals"},
]

const onDrop = (files) => {
    // files 파라미터에는 client에서 올리려는 파일의 정보가 담겨있음
    let formData = new FormData;
    const config = {
        header: {'content-type': 'multipart/form-data'}
    }
    formData.append("file", files[0])

    // jquery의 ajax와 비슷한
    Axios.post('/api/video/uploads', formData, config)
        .then(response => {
            if(response.data.success) {

                let variable = {
                    url : response.data.url,
                    fileName : response.data.fileName
                }

                Axios.post('/api/video/thumbnail', variable)
                .then(response => {
                    if(response.data.success) {

                    } else {
                        alert('썸네일 생성에 실패 했습니다.'))
                    }
                })

            } else {
                alert('비디오 업로드를 실패했습니다.')
            }
        })

}


function VideoUploadPage() {

    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")

    // e 는 이벤트를 나타냄
    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value)
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style= {{ textAlign:'center', marginBottom:'2rem' }}>
                <Title level={2}>Upload Video</Title>
            </div>
            <Form onSubmit>
                <div style = {{display:'flex', justifyContent : 'space-between'}}>
                    {/* Drop zone */}
                    
                    <Dropzone
                        onDrop = {onDrop}
                        multiple = {false} // file을 여러개/단일로 올릴지 선택
                        maxSize = {1000000000} // file size 조절
                    >
                        
                    {({ getRootProps, getInputProps }) => (
                        <div style={{ 
                            width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex',
                            alignItems:'center', justifyContent: 'center'
                            }} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize:'3rem'}} />
                        </div>
                    )}

                    </Dropzone>
                    {/* Thumbnail */}

                    <div>
                        <img src alt />
                    </div>

                </div>

                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={VideoTitle}
                />
                <br />
                <br />

                <label>Description</label>
                <TextArea 
                    onChange={onDescriptionChange}
                    value={Description}
                />
                <br />
                <br />

                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>

                <br />
                <br />
                
                <select onChange={onCategoryChange}>
                    {CategoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}                
                </select>

                <br />
                <br />

                <Button type="primary" size="large" onClick>
                    Submit
                </Button>

            </Form>
            
            
        </div>
  )
}

export default Auth(VideoUploadPage, true);
