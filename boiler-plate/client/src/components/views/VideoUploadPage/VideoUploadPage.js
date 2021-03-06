import React, { useState, useEffect } from 'react'
import { Typography, Button, Form, message, Input } from 'antd';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from "react-redux";   // redux hook 사용을 위해
import { useNavigate } from 'react-router-dom'
import Auth from '../../../hoc/auth'


const { Title } = Typography;
const { TextArea } = Input;

const Private = [
    { value: 0, label: 'Private' },
    { value: 1, label: 'Public' }
]

const Catogory = [
    { value: 0, label: "Film & Animation" },
    { value: 0, label: "Autos & Vehicles" },
    { value: 0, label: "Music" },
    { value: 0, label: "Pets & Animals" },
    { value: 0, label: "Sports" },
]

function VideoUploadPage(props) {
    const navigate = useNavigate();

    const user = useSelector(state => state.user);

    const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [privacy, setPrivate] = useState(0)
    const [Categories, setCategories] = useState("Film & Animation")
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [Thumbnail, setThumbnail] = useState("")


    const handleChangeTitle = (event) => {
        setTitle(event.currentTarget.value)
    }

    const handleChangeDecsription = (event) => {

        setDescription(event.currentTarget.value)
    }

    const handleChangePrivate = (e) => {
        setPrivate(e.currentTarget.value)
    }
    const handleChangeCategory = (e) => {
        setCategories(e.currentTarget.value)
    }

    const onSubmit = (event) => {
        // 원래 submit 버튼을 클릭했을때 일어나는 이벤트를 방지하기 위함?? 우리가 하고싶은 event를 발생시키기 위함?
        event.preventDefault();

        if (user.user && !user.user.isAuth) {
            return alert('Please Log in First')
        }

        if (title === "" || Description === "" ||
            Categories === "" || FilePath === "" ||
            Duration === "" || Thumbnail === "") {
            return alert('Please first fill all the fields')
        }

        const variables = {
            writer: user.user._id,    // redux hook으로 가져온 것
            title: title,
            description: Description,
            privacy: privacy,
            filePath: FilePath,
            category: Categories,
            duration: Duration,
            thumbnail: Thumbnail
        }

        axios.post('/api/video/uploadVideo', variables)
            .then(response => {
                if (response.data.success) {
                    alert('video Uploaded Successfully')
                    setTimeout(() => {
                        navigate('/')
                    }, 2000);
                } else {
                    alert('Failed to upload video')
                }
            })

    }

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])

        axios.post('/api/video/uploads', formData, config)
            .then(response => {
                if (response.data.success) {

                    let variable = {
                        url: response.data.url,
                        filePath: response.data.filePath,
                        fileName: response.data.fileName
                    }
                    setFilePath(response.data.url)

                    //gerenate thumbnail with this filepath ! 

                    axios.post('/api/video/thumbnail', variable)
                        .then(response => {
                            if (response.data.success) {
                                setDuration(response.data.fileDuration)
                                setThumbnail(response.data.url)
                            } else {
                                alert('Failed to make the thumbnails');
                            }
                        })


                } else {
                    alert('failed to save the video in server')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2} > Upload Video</Title>
            </div>

            <Form onSubmit={onSubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={800000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                {/* <Icon type="plus" style={{ fontSize: '3rem' }} /> */}

                            </div>
                        )}
                    </Dropzone>
                    
                    {/* Thumbnail */}
                    {/* Thumbnail이 빈 스트링이 아니고, 실제로 이미지가 있을때만 보여지도록 설정 */}
                    {Thumbnail !== "" &&
                        <div>
                            <img src={`http://localhost:5000/${Thumbnail}`} alt="haha" />
                        </div>
                    }
                </div>

                <br /><br />
                <label>Title</label>
                <Input
                    onChange={handleChangeTitle}
                    value={title}
                />
                <br /><br />
                <label>Description</label>
                <TextArea
                    onChange={handleChangeDecsription}
                    value={Description}
                />
                <br /><br />

                <select onChange={handleChangePrivate}>
                    {Private.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>
                <br /><br />

                <select onChange={handleChangeCategory}>
                    {Catogory.map((item, index) => (
                        <option key={index} value={item.label}>{item.label}</option>
                    ))}
                </select>
                <br /><br />

                <Button type="primary" size="large" onClick={onSubmit}>
                    Submit
            </Button>

            </Form>
        </div>
    )
}

export default Auth(VideoUploadPage, true);
