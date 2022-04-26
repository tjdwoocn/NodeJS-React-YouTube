# Node js + React 강의 - 기본편

## 1강. Intro
https://ji-gwang.tistory.com/2

Boiler-plate - 보일러플레이트란?
컴퓨터 프로그래밍에서 보일러플레이트 또는 보일러플레이트 코드라고 부르는 것은 최소한의 변경으로 여러곳에서 재사용되며, 반복적으로 비슷한 형태를 띄는 코드를 말한다.

## 2강. Node JS(Back-End) 와 Express JS 다운로드

Node JS: 
	- Node JS가 나옴으로 인해 항상 브라우저 속에서만 사용하던 js를 브라우저나 크롬, ie가 아닌 서버사이드에서도 사용할수 있게 됨

	- 자바 스크립트를 서버사이드에서 사용 가능하게 하는 언어

Express JS:
    - Node JS가 자동차의 엔진이라고 한다면 Express JS는 Node JS를 활용하여 자동차(웹사이트, 어플리케이션)를 쉽게 만들수 있게 해주는 것
    - 프레임워크

### Node JS 설치하기
- https://nodejs.org/en/

### npm package 만들기
- npm init
- Version: Enter
- description: 마음대로
- ~~~
- 기본값으로 진행하다 Author 부분만 내 이름 넣어줌

- 만들어진 npm패키지 확인을 위해선 vscode와 같은 에디터에서 package.json파일을 열어서 확인해보면 됨

### index.js 파일 생성
- 백엔드 서버를 시작하면 index.js에서 시작함
- "백엔드 시작점"
- *index.js 파일의 경우 앞에서 생성한 boiler-plate 폴더, package.json 파일과 동일한 경로에 위치해야함

### Express JS 다운
- 터미널에서 npm install express --save 명령어 실행
- 위 명령어로 express js를 다운받아주면 기존의 package.json 파일의 dependencies 부분에 설치된 express의 버전이 입력된다.(--save의 기능, express라는 라이브러리를 사용하고 있다고 표시해주는것)
- 다운받은 module 들이 node_modules 이라는 폴더에 저장된다. (이 모듈들에대해 크게 수정할일은 없다고 함)

### index.js에서 기본적인 express js 앱 만들기
- https://expressjs.com/en/starter/hello-world.html
- 위의 페이지에서 Hello world 예시코드를 index.js에 복사 및 사용

### node 실행하기
- npm run start: package.json 부분에 작성한 'start' 부분이 동작하도록 하는 명령어
- app 이 실행되며 "Example app listening on port 3000" 문구가 출력되며 실행됨
- 주소창에 localhost:3000 를 입력하면 해당 앱을 확인가능


## 3강. Mongo DB 연결
### Mongo DB 다운하기
- https://www.mongodb.com/ #Mongo DB 홈페이지에서 회원가입후 설치하기

### Cluster, Database 만들기
- 옛날 버전의 경우 Cluster를 먼저 만들었는데 최신버전에선 Cluster는 기본으로 생성되고 Database를 만드는게 제일 첫 단계가 되는듯 함 (Cluster와 Database가 같은 개념으로 사용되는듯? 왜냐면 database 만든다고 들어갔는데 끝에보면 create cluster라고 되어 있음 ㅋㅋ)
- Database를 만드는데 free tier를 선택후 aws를 선택, region은 서울 region이 추천되어 서울로 정함
- Cluster tier - M0 sandbox 선택(free forever!)
- Cluster Name - "boilerplate"로 정함

### User 생성하기
- Create Cluster 버튼을 클릭하면 User정보를 입력하는 페이지로 넘어감
- Username: Canadanam
- password: abc1234 (간단하게 설정함, 스페셜 캐릭터는 넣으면 안되나봄) 

### Connection Method 선택하기
- "Where would you like to connect from?"
- Cloud Environment 선택함
- "Only an IP address you add to your Access List will be able to connect to your project's clusters." 이란 문구가 나오며 허용하는 ip 주소 및 설명 입력해야 함
- "127.0.0.1" , localhost ip를 입력함
- 생성완료!

### App과 연결하기
- Databse Deployments 페이지에서 "Connect" 버튼 클릭
- "Connect your Application" 탭 선택
- "mongodb+srv://Canadanam:<password>@boilerplate.ew2iy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" 이런 복사가능한 주소가 보임
- 선택지로 "include full driver code example이 있는데 이것을 선택하면 드라이브에 바로 연결가능하게 하는 code 예시가 제공됨
- 예시 코드를 복사하여 index.js 파일에 복붙...하려 했으나! 강의영상에선 해당 예시 코드를 사용하지않고 mongoose라는 모듈을 활용함
- 그래서 Pass!


### Mongoose 설치 및 db 연결
- Mongoose: Mongo DB를 편하게 쓸수있게 해주는 Object Modeling Tool
- npm install mongoose --save
- mongoose에 대한 정보 또한 package.json의 dependencies 부분에 추가됨
- index.js 파일에 mongoose를 활용하여 db와 연결하는 코드 작성
- 음... 모든것을 다 완료한후 npm run start를 하는데 자꾸 에러가나서 찾아보는데 mongoose 6.0 이상의 버전부터는 useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false 이 4가지의 옵션이 적용되지 않는다고 함. 그래서 전부 지우고 진행함.
- 그런데! 그럼에도 실행되지 않음.
- 이제서야 에러코드를 좀 더 자세히보니........
- "TypeError: mongoose.connnect is not a function" 이 에러를 발견함.. 허허허 mongoose가 더이상 지원안하나봄?
- 그.래.서! 해당 에러 관련해서 구글링을 했는데 뭔가.. 뭔가.. 명확한 이유를 찾지 못했다.. 비슷한 에러를 겪는 사람이 많긴한데 뭔가 여기 뿐만 아니라 다른 부분, 예를들어 React(아직 모르는 부분)에서도 비슷한 에러를 겪나봄...
- 그.래.서! 일단 mongoose를 사용하는 부분을 지우고 nodejs에서 제공해주는 예시 코드를 사용하고 거기에 맞게 입력하 다시 npm run start를 하니 정상적으로 가동되었다!!
- 강의 영상에선 "MongoDB Connected..."라고 출력되는데 내 환경에선 "Example app listening on port 3000" 이라는 문구만 뜸... mongo db.. 연결 잘 된거 맞지?


## 4강. MongoDB Model & Schema
### User Model 과 Schema
- Model? Schema?
- Model: Schema를 감싸주는 역할
- Schema: 모델안에 설정되는 값들 하나하나에 대한 정보를 가지는 것, 지정해주는 것

### User Model 만들기
- models 라는 폴더를 만들고, models 폴더에 User.js 파일을 생성해줌
- User.js에는 mongoose를 사용하여 User model을 작성하고 User model의 정보에 해당하는 User Schema를 작성해줌
- ...mongoose... 여기선 정상작동이 될 것인가!
- 과연 결과는?!
- to be continue...

## 5강. GIT 설치
### Git?
- 분산 버전 관리 시스템!

### Git 저장소 만들기
- git init
- git status
- git add .
- gitignore 파일 만들어서 node_modules 폴더의 내용 제외하기
- git rm --cached boiler-plate/node_modules -r 명령어를 사용하여 이미 staging된 node_modules의 내용들을 제거해줌
<<<<<<< HEAD
- git commit -m "first upload"

## 6강 SSH를 이용한 Github 연결
### Git vs GitHub
- Git?
  - Tool, 소스코드를 관리하기 위한
- GitHub?
  - 클라우드 서비스, Git을 사용하는 서비스

### SSH 설정하기
- local machine과 Github이 안전하게 통신하기 위해
- SSH (Secure Shell) 체크하기
- 구글에서 git ssh 검색
- windows 환경에 맞게 ssh key 만들기 ("https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent"
)

- "ssh-keygen -t ed25519 -C "your_email@example.com"
- 처음 만드는 경우 계속 Enter누르면 됨
- SSH agent 를 background에서 키기
- 기존의 터미널에서 다음 과정을 진행하면 eval 이라는 명령어가 먹히지 않음 (window의 기본 터미널)
- 난 git bash 를 활용했는데 git desktop에서도 될듯
- git bash 에서 eval "$(ssh-agent -s)" 명령어를 입력, 하면 agent pid ~~~ 라고 뜸
- ssh key를 만들때 ssh 프라이빗키와 ssh 퍼블릭키를 만들었는데 ssh agent에 등록할때는 프라이빗키인 id_rsa 를 등록해주면 됨
- ssh-add ~/.ssh/id_ed25519 명령어 입력
- identity added ~~ 하고 뜬다면 그렇다면! 성공한것임
- 그 다음에는 ssh 퍼블릭키를 깃헙에 등록해주면 됨
- "Adding a new SSH key to your GitHub account" 부분을 클릭하여 진행
- "clip < ~/.ssh/id_ed25519.pub" 입력 (github cli 부분이 아닌 web browser 부분 참고함)
- clipboard에 저장된 (위의 명령어를 입력하면 이미 나의 ssh key가 복사된 상태임, ctrl+v 를 해보면 나의 key를 확인가능)
- 복사된 ssh-key를 입력해주면 됨
- 그리고 add ssh key 버튼을 클릭하면 등록 완료!
  
### 기존에 만들어둔 git repository와 연결하기!
- 만들어둔 git repo에 들어가보면 입력하라는 명령어들이 있는데 그것들을 git bash에 한줄한줄씩 입력해주면 됨
- 끝으로 origin에 push 를 해주고 나의 경우 personal access token으로 로그인 까지 성공해주니 해당 repo에 local machine에서 commit 해준 내용들이 업로드 됬음!
- 예이!

=======
-


## 7강. BodyParser & PostMan & 회원가입 기능 만들기
### Client - Server 의 통신하는 법
- Client: 크롬브라우저, 서버에게 요청을 보내는 당사자
- Server: 클라이언트/크롬브라우저로 부터 받은 요청을 처리하고 필요한 자료를 클라이언트에게 보내줌

### BodyParser, PostMan 설치하기
- BodyParser: 웹/앱의 Body 데이터를 분석(parse)해서 req.body로 출력해주는 것 (Body-parser Dependency가 필요함)
    - "npm imstall body-parser --save"
- PostMan: 클라이언트가 서버에게 데이터 전송/받기 등을 할 수 있게 도와주는 것
    - "https://www.postman.com/downloads/?utm_source=postman-home"

### Register Route 만들기
- Register Route 예시:
```javascript
 app.get('/', (req, res) => {res.send('Hello World!')})
```

### index.js 작업
....... ....... .......

- 어... 쩝.. mongo db 연결 및 postman 에서의 테스트에 문제가 있어서 .. 해결하려고 한참 찾아도 안되더니.. 수정한 mongo db 접속방법에서 기존방법으로 바꾸고 시도하니... 바로 되네요.. 왜그런지 좀 어이없긴한데 일단 패스하고 다음에 자세히 알아보는걸로!

- 아무튼 회원가입 기능 완성!

## 8강. Nodemon 설치
### Nodemon 다운하기
- Node Mon? : 기존엔 소스코드의 변화가 발생하고, 발생된 변화에 따라 변경이 되려면 서버를 내리고 다시 올렸어야 했는데 굳이 서버를 올리고/내리고 하지 않아도 소스코드의 변화를 감지하고 즉시 반영, 서버 재시작을 해주는 것

- "npm install nodemon --save-dev"  
- save 뒤에 -dev가 더 붙은 이유는 devlopment mode로 설정해주는 것이고 이건 로컬에서 할때랑 프로덕션 모드(배포 후)랑 구분해야 하는데 이것은 로컬에서만 작업/반영 하겠다 라는 뜻

### 스크립트 하나 더 만들기
- 'package.json' 파일의 script 부분에 "backend"(이부분의 명칭은 다르게 해도 됨)에서 nodemon을 이용하여 index.js를 실행하겟다 라는 부분을 추가해줌 
- 기존의 "npm run start" 가 아닌 "npm run backend" 명령어로 index.js 실행시키기
- 이렇게 실행시키면 변화 발생시 즉각 반영해줌

## 9강. 비밀 설정 정보 관리
### 계정정보 관리하기
- 기존의 코드에는 나의 mongodb id와 pwd가 모두 노출되어 있고 이상태로 github등에 나의 소스코드를 업로드 하면 모든 사람들에게 나의 mongodb에 접속할 수 있게 만드는 것과 같다
    - *참고로 나 또한 이 부분에 대해 신경 못쓰고 github에 이전까지 작업한 내용을 업로드 했는데,,, 다행히? 깃헙 자체적으로 Warning 메일이 하나가 왔었다. Github Gaurdian 인가? 라고 왔는데 이것은 github 자체적으로 내가 공유한 코드내에 계정 정보와 관련된 내용이 포함되어 있다고 판단하여 해당 부분을 수정 또는 조치가 필요하다고 알려주는 것이다. 이 메일을 받자마자 내가 뭔가 실수를 했구나 하고 확인해보니 내 계정정보가 공유되어 있어서 바로 수정하였다. 아마 이번 강의에서는 이러한 문제를 사전에 방지하기 위한 작업을 하려는 듯 하다.*

- 그전에, 이전 강의에서 잠깐 언급했던 것처럼 우리가 개발을 local 환경에서도 할 수 있고(development) 배포 한 후에 추가 개발을 할수도 있는데(production) 이 두가지 경우에 대해 따로 생각을 해줘야 함
- 예를들어 devlopment 단계에선 내가 따로 저장해둔 config 파일, 변수등을 가져올 수 있는데 배포 후에는(Heroku 같은 서비스를 이용해 배포할때는), 해당 서비스에서 제공해주는 방법으로 변수를 따로 만들어서 사용해야함.

### config 폴더 생성 후 dev(로컬에서), prod(배포환경에서) 구분, key 저장


## 10강. Bcrypt로 비밀번호 암호화
- 앞의 강의에서 postman을 사용하여 회원의 정보를 받아왔는데, 사용자가 보낼때는 password가 그대로 오더라도 데이터 베이스에 저장될때는 암호화 처리가 이뤄진 다음에 저장되는게 보안적인 측면에서 더 좋음.
- [사진]


### Bcrypt 설치하기
- Bcrypt 설치 
- "npm install bcrypt --save"
- homepage: "https://www.npmjs.com/package/bcrypt"

### Bcrypt를 이용한 비밀번호 암호화 하기
- 순서
1. Register Route 부분으로 이동 (User.js 에서 userSchema를 index.js로 가져와야함)
2. (bcrypt 사이트 보면서 진행) salt 생성 및 salt를 이용하여 비밀번호 암호화 진행
~
~
~

- 코드 작업 완료 후 postman 을 이용하여 새로 회원 정보를 보내니 이젠 password 부분이 암호화된 상태로 저장됨
- [사진]

## 11강. 로그인 기능 만들기
### login route 만들기

1.요청된 이메일을 데이터 베이스에서 있는지 찾는다
2. 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인
3. 비밀번호까지 맞다면 token 생성

## 12강. 토큰 생성 with jsonwebtoken
### Json Web Token 다운받기
- "npm install jsonwebtoken--save"

### 토큰 저장
- 쿠키, 로컬스토리지, 세션 등에 저장가능
- [사진]
- 어디에 저장하는게 가장 안전한가? 에 대한 논란은 많음. 사람마다 다름
- 우선 여기선 쿠키에 저장함


### cookie-parser 다운로드
- "npm install cookie-parser --save"

- login 성공
- [사진]


## 13강. Auth 기능 개발
### Auth route 만들기
- Authentication의 필요성
1. 페이지 이동 때 마다 로그인되있는지, 안되어 있는지, 관리자 유저인지 등을 체크
2. 글을 쓸때나 지울때, 권한이 있는지 같은 것도 체크

- 클라이언트의 쿠키에 있는 토큰을 디코드하면 User ID가 나오게 되고 그 User ID가 관리자 인지, 일반 사용자인지 또는 아직 미가입자 인지 등을 구별하여 권한을 차등적으로 부여한다. (회원이 아닌경우 글쓰기 등의 권한을 주지 않는다)

### Cookie 에서 저장된 Token을 Server에서 가져와서 복호화 진행
* 그전에 기존에 index.js, 한군데에서 관리되던 api(post, get 등)들을 '/api/user/register', '/api/product/feature/' 같은 형식으로 따로 나누어 관리를 할 수 있게 미리 나눠줄것이다
* 추후 express router를 사용할때 편함

- 'auth' 라는 미들웨어를 만들어줄 것임
  - 미들웨어: 앤드포인트에서 request를 받은다음 callback function을 진행하기전에 중간에서 뭔가를 해주는것
  - 'auth.js'라는 파일을 middleware 폴더에 생성해줄것임 (middleware 폴더는 root directory에, 여기선 boiler-plate폴더, 생성)
  - '인증처리'를 하는 곳

- 코드 작업


## 14강. 로그아웃 기능
### 로그아웃 Route 만들기
- 로그아웃 하려는 유저를 데이터 베이스에서 찾아서 그 유저의 토큰을 지워 준다.
- [사진] , postman으로 로그인 된 계정을 로그아웃 함
- [사진] , 로그아웃 한 후 mongo db에서 확인하면 해당 계정 토큰의 정보가 삭제되어 있는것을 확인 가능


## 15강. 리액트란(Front-End)?
### What is React JS?
- 프레임워크 No, 라이브러리 Yes, made by Facebook 2013
- Components로 이루어짐, module과 비슷하게 재사용성이 좋음
- Real DOM: 만약 10개의 리스트가 있고 그중 하나의 리스트가 업데이트 된다면, 전체 리스트를 다시 Reload 해야 업데이트가 됨, Super Expensive!
- Virtual DOM: 만약 10개의 리스트가 있고 그중 하나의 리스트가 업데이트 된다면, 바뀐 리스트 하나만 DOM에서 바꿔줌! Super Cheap!
  - 처음에 전체 리스트에 대한 스냅샷을 찍어두고, 중간중간 바뀌는 것들은 DOM에서 업데이트 해주는 식으로 


## 16강. Create React App
### App에 React 설치하기
- 이전에는 React를 실행하기 위해 webpack이나 babel 같은 것을 설정하기 위해 시간이 많이 걸렷다.
- 현재는 'create-react-app' command로 바로 시작가능
  - ```linux 
    npm install -g create-react-app
    ```
- Babel: 최신 자바스크립트 문법을 지원하지 않는 브라우저들을 위해 최신 자바스크립트 문법을 구형 브라우저에서도 돌수있게 변환시켜줌
- Webpack: 최근엔 웹사이트 하나를 만들때 다양한 자바스크립트, 라이브러리, 프레임워크, html 등 많이 필요로 한데 이것을 webpack이 얘네들을 'bundle', 번들화 해준다

- ```linux
    npx create-react-app .
  ```
  - .을 뒤에 붙인 이유는 해당 폴더내에 react-app을 설치할것이다라는 뜻


## 17강. NPM vs NPX
### NPM? NPX?
- NPM: Node Package Manager
  - 온라인 리포, 레지스트리(라이브러리를 담고있는 역할), 저장소 역할
  - 패키지들을 빌드해서 노드를 시작시키는 역할 (package.json)
  - npm install ~ 이렇게 사용하면 local로 설치됨 (node_modules에 저장됨)
  - npm install ~ -g 옵션을 사용하면 global한 위치에 설치됨 (%AppData%/npm on Windows,  /usr/local/bin on Linux)
- NPX: NPX를 활용하면 npm 으로 본인의 환경에 다운받지 않더라도 npx가 npm registry에서 해당 모듈을 찾아와 다운로드 없이 실행시켜줌
  - Disk Space를 낭비하지 않음
  - 항상 최신 버전을 사용가능


## 18강. React의 구조 설명
### 실행 (package.json)
- ```linux
      npm run start
      ```
  이전과 똑같이 실행을 시키면 react page가 자동으로 켜짐
  - 이것은 client 폴더의 package.json 파일에 start 명령이 입력되면 react-scripts 가 start 되게 되어있어서 그러함
  - start를 다른 단어로 바꿔도 됨 (initiate 등)
  - [사진]

- WebPack의 경우 src 폴더 안의 파일들은 관리하지만 그 이외의 public 폴더등의 파일들은 관리하지 않음
- [사진]
- 이미지 등의 파일은 src 폴더에 넣어줘야 webpack이 모아서 관리해줌


## 19강. CRA to Our Boilerplate
### Boilerplate - 빅픽처
- [그림]
- 앞으로 만들게 될 boilerplate-페이지 의 구조도

### hoc
- Higher-order component, function.
- function 인데 다른 component를 가질 수 있는 function 임
- [사진]
- admin component에는 관리자, admin 만 들어올 수 있음
- logged in component 에는 로그인 된 사람만 들어올 수 있음
- 굳이 자격이 아니더라도 다른 기능을 넣을수도 있음, 어떠한 조건이 충족되는 상황이면 들어갈 수 있는 그런...

### utils
- 여러 페이지에서 반복적으로 사용되는 기능들을 utils폴더에서 관리

* src 폴더 및 기타 필요한 폴더들과 js파일을 미리 만들어 두었다
- [사진]


## 20강. React Router Dom
### React Router Dom?
- App.js 에서 라우팅 하는 부분 진행
- React에선 페이지간의 이동을 할 때 React Router Dom 이란것을 사용함
- url: "https://v5.reactrouter.com/web/example/basic"
- [사진]

### React Router Dom 설치하기
```linux
  npm install react-router-dom --save
  ```
-[사진]

- 강의 영상 그대로 진행하니 Switch 사용하는 부분에서 에러가 발생함
- 찾아보니 react-router-dom의 v6 부터 업데이트되어 Switch가 Routes로 바꼇다고 함
- [사진]

- [사진]
- 최종 수정본


## 21강. 데이터 Flow & Axios
- [사진]
### Axios
- 이전까지는 클라이언트 부분이 준비되지 않았기 때문에 서버에 request를 보낼때 POSTMAN을 이용하여 보냈지만 이젠 클라이언트가 있으니 자체적으로 보낼수 있음
- 이때 사용하는것이 AXIOS, jQuery를 사용할때의 AJAX 같은거 라고 보면 된다고 함
- ```linux 
  npm install axios --save
  ```

- 작업 진행하다보면 에러가 발생하는데...
- [사진]
- 서버와 클라이언트의 포트가 일치하지 않아서 그렇다고 함

## 22강. CORS이슈, Proxy 설정
- 저번 강의 마지막에 서버 포트와 클라이언트 포트의 차이에서 발생하는 문제때문에 클라이언트에서 request를 보내도 서버에서 response가 오지 않았음.
- [사진], 검사 페이지에서 console tab을 선택하면 확인가능
- 이부분에 대한 설명 및 해결을 진행하려 함

### CORS
- 서버는 포트가 3000, 클라이언트는 3001 처럼 둘의 포트가 다를때, 어떤 추가적인 조치 없이는 request를 보낼때 Cors 정책 문제가 발생함, 보안을 위해.
- CORS: Cross-Origin Resource Sharing
- 다른 웹사이트에서 서버등의 무단으로 침입하여 정보들을 수정/삭제 등을 하는것을 막기 위해
-[사진]

### 해결방안 (여러방법 있음)
1. Proxy 사용 (우리가 사용할 방법)
2. 개발자 도구 이용
3. Front end만 고칠수 있는 경우 json p 라는 방식을 이용해 module request 를 get request로 바꿔서 보내기
4. Back end 와 Front end 모두 조작이 가능한 상황일땐 서로 어떤 포트에 대한건 받겠다 안받겠다 따로 지정해주면 됨

### Configuring the Proxy Manually
- Proxy를 우리가 임의로 설정하는 것
- [사진]
- URL: "https://create-react-app.dev/docs/proxying-api-requests-in-development/"

- [사진]
- 일단 이전에 나오던 CORS 관련 에러는 사라짐, 그리고 Hello world ~~~ 라고 서버의 index.js 부분에 작성한 api/hello의 response가 결과값으로 받아와져 있음.

* 번외로 작업중에 서버를 시작하려고 npm run start를 하는데 자꾸 "Error: Cannot find module 'C:\Users\Jay\Desktop\Basic-NodeJS-React\boiler-plate\index.js'" 이 에러가 발생하여 왜그러지 하고 한참 찾아봤는데...
* 우선 기존에 있던 index.js와 기타 파일들을 server 폴더안에 넣어줌으로써 package.json 은 boiler-plate 폴더에 있고 index.js는 server 폴더에 있게 되었다.
* 이때 package.json 파일을 보면 start 부분에 node index.js 라고 되어 있다보니 찾지를 못하였던것! node server/index.js 라고 수정해주니 정상작동함, backend 부분도 동일!
* 찾아보니 유사한 에러를 겪는 사람들이 많은데 경로 맞춰주는것이 매우 중요함! (이름이 비슷한 파일들이 많은데 이게 경로가 안맞으면 잘 꼬이는듯 함)


## 23강. Proxy Server?
### What is Proxy Server?
- 클라이언트와 메인서버 사이에 위치하여 유저가 메인서버에 접속할때 프록시 서버에서 유저의 ip 주소를 임의로 바꿔 메인서버에선 모르게 할 수도 있고, 보내는 데이터도 임의로 바꿀수 잇음
- Proxy Server에는 방화벽 기능, 웹 필터 기능, 캐쉬 데이터/공유 데이터 제공 기능 등이 있다

### Proxy Server 사용 이유!
1. 회사에서, 직원들이 어떠한 사이트들에 접속하지 않았으면 좋겠다 할 때나, 집안에서 아이들이 유해 사이트 등에 접속하는 것을 막기 위해
2. 메인서버의 자료들을 프록시 서버에 캐쉬상태로 저장해두면 클라이언트가 요청하는 자료들을 메인서버까지 들리지 않고 프록시 서버에서 보내줄수가 있음 (빠름)
3. IP를 숨김으로 인한 보안기능 등
4. 이용 제한된 사이트 접근 가능 (VPN처럼 IP 우회, 다만 VPN은 데이터 전송에 있어 암호화를 하여 보안에 좀 더 신경쓴다고 함)


## 24강. 여러 서버 동시에 작동하기 with Concurrently
- 이전 강의에서 프론트와 백앤드 서버를 따로 실행/작동 시켰었는데 이것을 한번에 하도록 함

### Concurrently 설치
- "npm install concurrently --save"

### Concurrnetly 사용법
- 현재 백앤드 서버 작동: npm run backend, 프론트 서버 작동: npm run start, 로 하고 있는데 두개의 디렉토리가 조금 차이가 남
- 우선 root(boiler-pate)에 있는 package.json 파일에서 새로운 스크립트를 작성함
  - "dev": "concurrently \"npm run backend\" \"npm run start --prefix client\""
  - [사진]
- 그리고 "npm run dev" 를 터미널에서 입력하면 두개가 순차적으로 실행이 됨


## 25강. Antd CSS Framework
### CSS Framework
- CSS Framework를 쓰는 이유: 기능을 만드는데 더욱 집중하기 위하여
  - 직접 하나하나 관리하게되면 기능만드는 것 이외에 너무나 많은 시간을 CSS에 소비하게 됨
  - 최근에는 CSS Framework가 워낙 잘되어 있어 실무에서도 많이 활용되고 있음

### CSS Framework for React JS 종류
1. Material UI (처음에 배울때 좀 어렵다라는 느낌?)
2. React Bootstrap
3. Semantic UI
4. Ant Design (우리가 사용할 것, 중국에서 개발, 사이즈가 큼, 스타일이 깔끔함?, Enterprize 환경에도 괜찮음, 쓰기가 편함?)
5. Materialize 

### Ant Design
- url: "https://ant.design/"
- 설치: "npm install antd"
- React, Font에 적용되는 모듈이기 때문에 Client 폴더로 이동후 설치
- 설치 완료되면 client 폴더의 index.js 파일에 "import 'antd/dist/antd.css';" 코드 추가

## 26강. Redux 기초
### What is Redux?
- Redux is a predictable state container for JavaScript apps.
- 상태 관리 라이브러리

### State container? What is State?
- React에는 Props와 State가 있는데... (사진 참고)
- [사진]
- Props:
  - Properties의 줄임말
  - 부모 컴포넌트와 자식 컴포넌트가 있을때, 컴포넌트간에 무언가를 주고 받을때 사용 (how components talk to each other)
  - 부모 컴포넌트에서 자식 컴포넌트로 만 보낼 수 있음 (props flow downwards)
  - 부모 컴포넌트에서 자식 컴포넌트로 props를 보냇을때 props는 바뀔수 없음 (immutable)(부모 컴포넌트에서 새로운 값을 다시 내려줘야 바뀔수 있음)
- State:
  - 부모/자식 컴포넌트 간의 data 전송이 아닌, 해당 컴포넌트 안에서 데이터 전송을 하려면 state 이용
    - 예: 검색 창에 글을 입력할 때 글이 변하는것은 state를 바꿈?
  - State is mutable
  - State 가 변하면 re-render 됨

* So, Redux 는 State을 관리해주는 도구
- [사진]

### Redux의 데이터 Flow
- [사진]
- Action: 객체, 무엇이 일어낫는지 설명하는 객체 (예: 어떤 유저가 어떤 게시물을 liked 했다 등)
- Reducer: Action을 함으로 인해, 원래 Application의 state가 어떻게 바뀌었는지 설명해놓는 곳
  - 이전 State와 action object를 받은 후에 next state를 return 한다
- Store: Application의 state를 감싸주는 역할
  - Store 안에는 여러가지 methods 가 있고, 그 methods를 활용하여 state를 관리 할 수 있다.


## 27강. Redux Up!
- Redux 설치 후 초반에 설정해줘야 할 것들에 대해 알아보려함

### 4가지의 Dependencies
1. redux
2. react-redux
3. redux-promise (middleware)
4. redux-thunk (middleware)

- "npm install redux react-redux redux-promise redux-thunk --save"

* redux의 middleware인 redux-promise와 redux-thunk를 다운받아야 하는 이유
- redux를 잘 쓸수 있게 도와주는 역할
- 기존의 redux store의 경우 객체 형식만 받을수 있는데(only accept dispatching plain object)
- redux store에는 'function' 과 'promise' 또한 전달된다
- redux-thunk는 function을 redux-promise는 promise를 받을수 있도록 도와줌(teaches dispatch how to accept function and promise)

### Redux 적용하기
- "client/src/index.js" 편집
- 'redux dev tools' extension 설치하기 및 client/src/index.js 에 코드 추가
  - "https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en"

### Combine Reducer
- Store에는 여러가지 Reducer 들이 존재함 (user reducer, number reducer 등등), 각 state 별로 reducer가 있다고 보면 됨
- 각 state가(user state, number state 등) 어찌저찌 변하여 최종적으로 어떤 값을 가지고 있고 그 변한 값을 리턴해주는게 reducer임
- Combine Reducer가 이러한 각 reducer의 내용을 토탈하여 root reducer로 전달하는 역할을 함


## 28강. React (추가)
- 회원 가입 기능 작업하기 전에 React에 대하여 좀 더 알아보기로 함

### React의 Component
- Class Component:
  - 더 많은 기능 사용가능
  - 대신 조금 더 길고 복잡한 코드
  - 성능부분에서 좀 더 느림
- Functional Component: 
  - 제공하는 기능이 적음, 한정적
  - 대신 코드가 짧고 간단함
  - 성능도 좀 더 빠름

- Functional Compoent에서 사용할 수 없는 기능들 (Class Component에선 사용 가능한데)
  - ... 거의 대부분의 영역에서 Functional Component가 사용불가 였는데...
  - React 16.8 Hooks가 나오면서! 이제 Functional Component들도 사용 가능하게 바뀌었다고 함!
  - 그래서 왠만한 기능은 Functional Component 형태로 개발 가능
  - [사진] 리액트의 생성/실행 과정, lifecycles


## 29-30강. 로그인 페이지
- 로그인 페이지 전체의 기능을 한번에 다 하기엔 너무 복잡/양이 많아 전체적인 틀만 우선적으로 만들 예정

### 로그인 페이지 구성
- [사진]
- 사진에서 보이는 구성요소들의 틀만 잡아보려 함
- "client/src/components/views/LoginPage/LoginPage.js" 편집

- 로그인 페이지 작성 중 'props.history.push' 이부분에서 push 에러가 발생하는데 이것은 React Router 버전 문제때문에 발생한다는데, 
- v6 이상을 사용한다면 사진을 참고하여 수정하면 정상작동 됨

<img src="https://raw.githubusercontent.com/tjdwoocn/Basic-NodeJS-React/main/imgs/20220413_134057.png" alt="alt text" title="image Title" align='center' />


## 31강. 회원가입 페이지
- 로그인 페이지가 완성되었고, 로그인 페이지를 만들때 사용했던 대부분의 코드를 재사용 및 추가작업하여 회원가입 페이지를 금방 만들수 있었다

<img src="https://raw.githubusercontent.com/tjdwoocn/Basic-NodeJS-React/main/imgs/20220413_150257.png" alt="alt text" title="image Title" align='center' />


## 32강. 로그아웃 기능
- 로그인 한 이후 로그아웃 할 수 있도록 기능을 만들려고 함
- 로그아웃의 경우 따로 페이지를 만드는것이 아닌, 랜딩페이지에 버튼 하나를 추가하여 로그아웃 기능 구현


## 33-34강. 인증 체크
### Authentication
- 이전까지 로그인, 회원가입, 로그아웃 기능들을 만들었는데
- 보통 홈페이지들을 보면, 
  1. 아무나 진입 가능한 페이지 (ex. Landing Page, About Page)
  2. 로그인한 회원만 진입 가능한 페이지 (ex. Detail Page, Coupon Page)
  3. 로그인 한 회원은 진입 못하는 페이지 (ex. Register Page, Login Page)
  4. 관리자만 진입 가능한 페이지 (ex. Admin Page)
- 등으로 나뉠 수 있음

- 페이지 뿐만 아니라 인증이 필요한 부분은 더 있다
  1. 댓글 작성
  2. 파일 전송
  3. 파일 업로드 등등등

### HOC, Higher-order-component (16강 부분 참고)
<img src="https://raw.githubusercontent.com/tjdwoocn/Basic-NodeJS-React/main/imgs/20220413_152738.png" alt="alt text" title="image Title" align='center' />
- log in 과 관련된 컴포넌트를 Auth에 추가하여 EnhancedComponent를 새로이 만들어 냄

### Auth Component 작성하기
- "client/src/hoc/auth.js" 편집
- "client/src/app.js" 편집
