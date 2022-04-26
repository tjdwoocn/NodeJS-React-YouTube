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


<img src="https://raw.githubusercontent.com/tjdwoocn/Basic-NodeJS-React/main/imgs/20220413_152738.png" alt="alt text" title="image Title" align='center' />
