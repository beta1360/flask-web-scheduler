# flask-web-scheduler
> flask 복습을 위한 To-do 스케줄러 웹 어플리케이션<br>
> 달력에서 자신의 일정과 팀원들의 일정을 관리할 수 있습니다.

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

### v0.54
- ORM 방식의 데이터베이스 이용
- Blueprint 방식의 URL 라우트 나누기

### v0.56
- Logging 기능 추가
- 한글 지원 추가

### v0.58 
- React.js 적용
- UI의 Bootstrap화 (React-bootstrap)

### v0.60
- Redux 적용
- immutable.js 적용

### v0.62 (예정)
- ProgressBar 적용
- Todo 라벨 적용

## Next Plans...
### Front-end side
- [x] ```Bootstrap```을 통한 UI 개선 작업
- [x] Code Refactorying
- [ ] 세 테이블의 Todo로 개선하기
- [x] ```Redux``` 적용
- [x] ```immutable.js``` 적용
- [x] ```Duck Pattern``` 적용
- [ ] ```Progress Bar``` 적용

### Back-end side
- [x] ```Sql-Alchemy```를 통한 ORM방식의 DB 관리
- [x] UI 수정에 따른 서버 개선
- [x] Code Refactorying
- [x] ```logging``` 기능 추가하기
- [x] ```Blueprint``` 적용하기
- [x] ```Doing, Todo Done``` 테이블 추가
