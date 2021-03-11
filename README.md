# NestJS Boilerplate

NestJs, Docker, MariaDB, NGINX 로 구성된 NestJs Boilerplate

## 기술 스택

| 이름           | 버전     |
| -------------- | -------- |
| Node.js        | 12.20.2  |
| docker         | 19.03.13 |
| docker-compose | 1.26.2   |
| NestJs         | 7.5.1    |
| MariaDB        | 10.5.8   |
| NGINX          | stable   |

## 시작하기

### 필수사항

도커, 도커 컴포즈 설치가 필요

```
> docker -v
Docker version 19.03.13, build 4484c46d9d
> docker-compose -v
docker-compose version 1.26.2, build eefe0d31
```

## Run

## Devlopment Mode

### Run

```
> ./run-dev.sh up
```

### Stop

```
> ./run-dev.sh down
```

## Production Mode

```
> ./run.sh up
```

### Stop

```
> ./run.sh down
```

## Swagger Api Documentation

API 테스트를 위한 Swagger Api Documentation 사용 가능 (Only Development Mode)

URL : http://localhost:5000/api/docs
