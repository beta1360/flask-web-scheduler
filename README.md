# flask-web-scheduler
> flask 복습을 위한 To-do 스케줄러 웹 어플리케이션<br>
> 달력에서 자신의 일정과 팀원들의 일정을 관리할 수 있습니다.

## Install

```bash

```

- 아직은 ```private``` Repository인 관계로 설치법이 없습니다.

## Usage
```bash
python app/app.py
```

- 위와같이 실행을 하면 됩니다.
- ```python 2.7``` 이상의 버전을 권장합니다.

## Features
### v0.50
- 회원가입/ 로그인/ 로그아웃
- Todo list 작성/수정/삭제/조회 (회원별 개인 관리)

### v0.52
- ORM 방식의 데이터베이스 이용
- Blueprint 방식의 URL 라우트 나누기

### v0.54
- Logging 기능 추가
- Bootstrap Style의 UI 교체
- 검색기능 세부화


## Next Plans...
### Front-end side
- [ ] ```Bootstrap```을 통한 UI 개선 작업
- [ ] Code Refactorying
- [ ] 달력 방식의 Todo로 개선하기
- [ ] ```React.js``` 활용

### Back-end side
- [x] ```Sql-Alchemy```를 통한 ORM방식의 DB 관리
- [ ] UI 수정에 따른 서버 개선
- [ ] Code Refactorying
- [ ] ```logging``` 기능 추가하기
- [x] ```Blueprint``` 적용하기
