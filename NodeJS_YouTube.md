# Node js + React 강의 - YouTube 만들기

## 1강. 전체적인 틀 만들고 Mongo DB 연결
- 이전 boiler plate 프로젝트/강의 영상 참고

## 2강. Boiler Plate 강의
- 이전 boiler plate 프로젝트/강의 영상 참고

## 3강. 비디오 업로드 FROM 만들기 1
- 이전 Boiler plate 강의에서 만들었던 boiler plate (log in, landing, register 페이즈 등 그대로 사용)

### Upload Page 만들기
- client/src/components/views 폴더에서 작업
- VideoUploadPage 폴더 생성

- React Hook 이 나오기 전엔 class component가 성능이 좋아 많이 사용되었는데 현재는 functional component 또한 성능이 좋아져 많이 사용되고 있는 상태

### Upload Page Route 만들기
- client/src/App.js 파일 작업

### Upload Page Header Tap 만들기
* 이전 강의에선 만들지 않았던 NavBar의 Sections 부분이 있음
* 이부분은 일단 나와있는 파일구조 및 코드 등을 그대로 가져와서 사용하려 함
* 중간중간 에러가 날 수 있는 부분은 지속 수정할 예정
- Nav Bar의 RightMenu 파일 생성 및 작업

### Form Template 
- VideoUploadPage 작업

### 파일 올리는 Drop-zone Template 만들기
- client에서 사용되는 dependency 이기 때문에 "cd client" 명령어로 client 폴더로 이동 후 설치
- "npm install react-dropzone --save"
- VideoUploadPage 작업


<img src="https://raw.githubusercontent.com/tjdwoocn/Basic-NodeJS-React/main/imgs/20220413_152738.png" alt="alt text" title="image Title" align='center' />


## 4강. 비디오 업로드 FROM 만들기 2
- 3강에서 이어짐

### onChange func 만들기
- VideoUploadPage 작업
- Input, TextArea, Select 등에 있는 value 들을 state에 넣어두고 추후에 한번에 server로 보내주는 function


## 5강. Multer로 노드 서버에 비디오 저장하기
- 이전 강의에서 4가지 onchange(Title, Description, Category, Private) 에 대한 부분 코드작업을 완료함
- Video Upload 하는 부분(ondrop)을 작업해보겠음
- 클라이언트에서 비디오를 선택하면 해당 비디오 파일을 서버에 저장하는 기능
- 
### OnDrop funcion 만들기
- 클라이언트의 비디오를 선택, upload 하는 기능
- VideoUploadPage.js 에서 Dropzone 부분 작업
- Server 부분에서 video upload 를 위한 route 작업 진행
  - server/routes/video.js
  - 이전 boiler-plate강의에선 server 의 index.js에 모든 route 기능(login, logout 등)들을 작성했었는데,
    여기선 routes 폴더를 따로 만들어 user.js, video.js 등 따로따로 관리하는 듯 함(추가작업 해줘야 함)

### 노드 서버에 파일을 저장하기 위한 dependency: Multer 설치하기
- "npm install multer --save" in Server directory

## 6강. ffmpeg로 비디오 썸네일 생성하기
- upload, 저장된 비디오 파일에 대한 썸네일 생성하려 함
  
### 썸네일 생성을 위한 fluent-ffmpeg 디펜던시 설치하기
- fluent-ffmpeg 설치를 위해 ffmpeg 디펜던시 우선 설치
  - 구글에서 "윈도우 ffmpeg 설치" 를 검색해서 설치하기
  - "https://happist.com/577463/%EC%9C%88%EB%8F%84%EC%9A%B0-ffmpeg-%EC%84%A4%EC%B9%98-%EB%B0%8F-%EC%82%AC%EC%9A%A9-%EB%B0%A9%EB%B2%95" 해당 페이지를 참고하여 설치함 ("ffmpeg-release-full-shared.7z" 파일 다운받음)
  - ffmpeg를 제대로 설치 하였으면 다음 과정으로 이동하기
  - MAC의 경우 간단하게 "brew install ffmpeg" 명령어로 설치가능

- "npm install fluent-ffmpeg --save" 명령어로 필요 디펜던시 설치 (server 폴더 no, root 폴더 yes)

### 서버에 저장된 비디오를 이용한 썸네일 생성하기
- client의 VideoUploadPage.js 작업
- 썸네일 route 생성을 위해 server의 video.js 작업 
- server/uploads 폴더안에 'thumbnails' 폴더 생성하기

