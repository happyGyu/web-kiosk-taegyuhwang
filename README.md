# 태규네 키오스크 (5-6주차 개인 프로젝트)

<br>

<img width="636" alt="태규 키오스크 스크린샷" src="https://user-images.githubusercontent.com/95538993/184412161-18226736-16db-4491-a4c1-e083c8b39a16.png">

<br>

## 📝 EERD

<img width="718" alt="태규 키오스크 EERD" src="https://user-images.githubusercontent.com/95538993/184411967-2d56b4eb-7ebd-40ed-bdc8-4d00f9442cee.png">

## 😎 Results

- [데모 보러 가기](http://3.34.193.200/)
- [발표 영상](https://youtu.be/WP2WCj1P970)
- [위키](https://github.com/woowa-techcamp-2022/web-kiosk-taegyuhwang/wiki) / [노션](https://alabaster-silica-d08.notion.site/f8e887c3d1d24d0396f859b8f489a758)

<br>

## 🖥 Start

### 1. Clone and install package

```bash
git clone https://github.com/woowa-techcamp-2022/web-kiosk-taegyuhwang.git

cd client
npm install

cd ../server
npm install
```

### 2. Set environment variables

```bash
# ./server/.env

PORT=
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER_NAME=
DB_PASSWORD=
```

### 3. Run app

#### development

```bash
# ./server
npm run start:dev
# ./client
npm run dev
```

#### production

```bash
# ./server
npm run start
# ./client
npm run build

## 실제 배포시에는 nginx로 build file를 serve했습니다.
```
