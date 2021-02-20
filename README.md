# NestJS Boilerplate

NestJs, Docker, MariaDB로 구성된 NestJs Boilerplate

## 기술 스택

| 이름           | 버전     |
| -------------- | -------- |
| Node.js        | 12.20.2  |
| docker         | 19.03.13 |
| docker-compose | 1.26.2   |
| NestJs         | 7.5.1    |
| MariaDB        | 10.5.8   |

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
