# NestJS Boilerplate

NestJs, Docker, MariaDB로 구성된 NestJs Boilerplate

## 기술 스택

| 이름           | 내용                             | 버전     |
| -------------- | -------------------------------- | -------- |
| Node.js        | 도커 이미지로 사용               | 12.20.2  |
| docker         | 가상 컨테이너를 위해 사용        | 19.03.13 |
| docker-compose | 가상 멀티 컨테이너를 위해 사용   | 1.26.2   |
| NestJs         | express 기반의 서버 프레임워크   | 7.5.1    |
| MariaDB        | 기본 데이터베이스로 MariaDB 사용 | 10.5.8   |

## 시작하기

### 필수사항

도커, 도커 컴포즈 설치가 필요

```
> docker -v
Docker version 19.03.13, build 4484c46d9d
> docker-compose -v
docker-compose version 1.26.2, build eefe0d31
```

## 실행 및 종료

### Devlopment Mode

시작 전 로컬의 node_modules 디렉토리와 도커 컨테이너의<br>
node_modules 디렉토리의 볼륨 마운트를 위해 모듈 설치

```
> npm install
```

스크립트 실행

```
> sudo chmod +x ./run.sh
> sudo ./run.sh
```

종료 스크립트

```
> ./stop.sh
```

### Product Mode

## Swagger Api Documentation

API 테스트를 위한 Swagger Api Documentation 사용 가능

URL : http://localhost:5000/api/docs
