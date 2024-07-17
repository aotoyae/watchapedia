![img](https://github.com/aotoyae/watchapedia/assets/142870577/c78da1d4-7acb-4c2d-a1dc-d839d2b87538)

## Watchapedia - TMDB(영화 정보 제공 사이트) API 활용 영화 검색 사이트
- 프로젝트 기간 : 2024.01.04 ~ 2024.02.04
- 기술 스택 : HTML, CSS, Vanilla JS, TMDB API
- 관련 포스팅 : [Link](https://aotoyae.tistory.com/entry/JS-%EB%82%B4%EB%B0%B0%EC%BA%A0-%EC%98%81%ED%99%94-%EA%B2%80%EC%83%89-%EC%82%AC%EC%9D%B4%ED%8A%B8-TMDB-API#google_vignette)

<aside>  
  
최신 개봉 영화의 평점과 줄거리 등 다양한 정보를 제공하는 서비스입니다. 검색창을 통해 영화 제목을 검색할 수 있으며, 스크롤을 내리면 추가 영화 데이터가 자동으로 로드됩니다. 썸네일 클릭 시 영화의 상세 페이지로 이동하여 개봉일, 명대사, 상세 줄거리 등 자세한 정보를 확인할 수 있습니다.

</aside>

## 주요 기능
- TMDB API를 활용해 비동기 통신으로 최신 영화 데이터 불러오기

- 썸네일 클릭 시 서브 페이지로 이동하며 영화의 상세 API 활용
  - 페이지 이동 시 params로 ID를 넘겨주어 영화의 상세 정보 요청

- 영화 목록 무한 스크롤 구현
  - 스크롤이 일정 높이로 내려가면 다음 페이지의 데이터 호출
  - throttling을 설정해 연속되는 이벤트 호출을 방지

- 검색창 아래 최근 검색 키워드 기록 추가
  - 검색창 아래 검색 기록 표시, 키워드 클릭 시 자동 검색
