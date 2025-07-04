// 퀴즈 데이터 상수
const QUIZ_IMAGES = [
    "강다니엘.jpg", "강하늘.jpg", "거미.jpg", "고두심.jpg", "고아라.jpeg",
    "골룸.jpg", "권상우.jpg", "기안84.jpg", "김구.jpg", "김연아.png",
    "김연자.jpg", "김우빈.jpg", "김전일.jpg", "김종국.jpg", "나루토.jpg",
    "나문희.jpg", "노사연.jpg", "다현.jpg", "데드풀.jpg",
    "도라에몽.jpg", "도르마무.jpg", "디카프리오.png", "라이언.png", "로버트다우니주니어.jpg",
    "로키.jpg", "루피.jpg", "마네.jpg", "마릴린먼로.jpg", "맨티스.png",
    "모드리치.jpg", "모모.jpg", "모차르트.jpg", "문재인.jpg", "미키마우스.jpg",
    "민경훈.jpg", "박건후.png", "박보검.jpg", "박보영.jpg",
    "방귀대장뿡뿡이.jpg", "백현.jpg", "베토벤.jpg", "보노보노.jpg", "보아.jpg",
    "볼드모트.jpg", "붐.jpg", "브래드피트.jpg", "빌게이츠.png", "뿡뿡이.jpg",
    "살라.jpg", "서장훈.png", "세일러문.jpg", "세종대왕.jpg", "소크라테스.jpg",
    "손나은.jpg", "손석희.jpg", "손흥민.jpg", "송가인.jpg", "송승언.jpg",
    "송은이.jpg", "송중기.jpg", "송지효.jpg", "수지.jpg", "스칼렛 요한슨.jpg",
    "스티븐잡스.jpg", "스펀지밥.png", "시우민.jpg", "시진핑.jpg", "신사임당.jpg",
    "아만다 사이프리드.jpg", "아베.jpg", "아이린.jpg", "안효섭.jpg", "어피치.jpg",
    "엘리자베스2세.jpg", "엘사.png", "엠마왓슨.jpg", "엠마왓슨.png", "여진구.jpg",
    "예리.jpg", "예성.jpg", "예은.jpg", "온유.jpg", "옵티머스프라임.jpg",
    "옹성우.jpg", "울라프.png", "워렌버핏.png", "유관순.jpg", "유노윤호.jpg",
    "유재석.jpg", "육성재.jpg", "윤아.jpg", "음바페.jpg", "이명박.jpg",
    "이민기.jpg", "이상민.jpg", "이수근.jpg", "이순신.jpg", "이순재.jpg",
    "이승만.jpg", "이승우.jpg", "이시언.jpg", "이효리.jpg", "장성규.jpg",
    "장윤주.jpg", "저스틴비버.jpg", "전소미.jpg", "전지현.jpg", "전진.jpg",
    "정연.jpg", "제니.jpg", "제니퍼로렌스.jpg", "조로.png", "조세호.jpg",
    "조이.jpg", "조정석.jpg", "조현우.jpg", "주디.jpg", "징징이.png",
    "짱아.jpg", "차은우.jpg", "찬열.jpg", "철수.png", "최순실.jpg",
    "카이.jpg", "캉테.jpg", "캡틴마블.jpg", "코난.jpg", "크롱.jpg",
    "크리스햄스워스.jpg", "태민.jpg", "톰크루즈.jpg", "트럼프.jpg", "펭수.jpg",
    "푸틴.jpg", "플래시.jpg", "피오.jpg", "피카츄.png", "하니.jpg",
    "하하.jpg", "한지민.jpg", "한채아.jpg", "한혜진.jpg", "할리퀸.jpg",
    "허경영.jpg", "헬라.png", "호날두.png", "호빵맨.png", "홍진영.jpg"
];

const CHOSUNG_QUIZ_DATA = {
    movie: [
        '인터스텔라', '어벤져스', '기생충', '라라랜드', '조커',
        '타이타닉', '겨울왕국', '알라딘', '보헤미안랩소디', '매트릭스',
        '인셉션', '다크나이트', '반지의제왕', '해리포터', '쇼생크탈출',
        '포레스트검프', '글래디에이터', '센과치히로의행방불명', '하울의움직이는성', '너의이름은',
        '부산행', '명량', '극한직업', '신과함께', '국제시장',
        '택시운전사', '변호인', '괴물', '왕의남자', '태극기휘날리며',
        '실미도', '해운대', '광해', '암살', '베테랑',
        '도둑들', '7번방의선물', '관상', '설국열차', '은밀하게위대하게',
        '건축학개론', '써니', '아저씨', '추격자', '살인의추억',
        '올드보이', '친절한금자씨', '공동경비구역제이에스에이', '쉬리', '웰컴투동막골'
    ],
    animal: [
        '호랑이', '사자', '코끼리', '기린', '하마',
        '악어', '코뿔소', '하이에나', '치타', '표범',
        '늑대', '여우', '곰', '너구리', '수달',
        '비버', '사슴', '고라니', '산양', '다람쥐',
        '청설모', '두더지', '고슴도치', '박쥐', '원숭이',
        '침팬지', '오랑우탄', '고릴라', '캥거루', '코알라',
        '오리너구리', '웜뱃', '타즈매니아데빌', '쿼카', '판다',
        '레서판다', '북극곰', '북극여우', '펭귄', '물개',
        '바다사자', '돌고래', '고래', '상어', '가오리',
        '문어', '오징어', '해마', '불가사리', '해파리'
    ],
    snack: [
        '새우깡', '초코파이', '포카칩', '꼬북칩', '빼빼로',
        '홈런볼', '맛동산', '에이스', '오감자', '허니버터칩',
        '콘칩', '양파링', '자갈치', '고래밥', '오징어땅콩',
        '바나나킥', '인디안밥', '사또밥', '죠리퐁', '카라멜콘땅콩',
        '월드콘', '메로나', '누가바', '스크류바', '죠스바',
        '수박바', '쌍쌍바', '돼지바', '보석바', '비비빅',
        '탱크보이', '폴라포', '빠삐코', '더위사냥', '설레임',
        '투게더', '엑설런트', '구구콘', '빵빠레', '부라보콘',
        '붕어싸만코', '국화빵', '찰떡아이스', '빵또아', '와일드바디',
        '쿠앤크', '체리마루', '호두마루', '나뚜루', '하겐다즈'
    ],
    drama: [
        '사랑의불시착', '도깨비', '미스터션샤인', '응답하라1988', '슬기로운의사생활',
        '시그널', '비밀의숲', '킹덤', '동백꽃필무렵', '스카이캐슬',
        '이태원클라쓰', '호텔델루나', '태양의후예', '별에서온그대', '해를품은달',
        '주몽', '대장금', '허준', '모래시계', '여명의눈동자',
        '겨울연가', '가을동화', '파리의연인', '내이름은김삼순', '커피프린스일호점',
        '시크릿가든', '상속자들', '피노키오', '너의목소리가들려', '괜찮아사랑이야',
        '그겨울바람이분다', '미생', '나의아저씨', '라이브', '디어마이프렌즈',
        '멜로가체질', '검색어를입력하세요더블유더블유더블유', '스토브리그', '낭만닥터김사부', '펜트하우스',
        '부부의세계', '인간수업', '스위트홈', '오징어게임', '지금우리학교는',
        '디피', '무빙', '더글로리', '재벌집막내아들', '이상한변호사우영우'
    ]
};

// 인물 퀴즈 데이터 생성
const PERSON_QUIZ_DATA = QUIZ_IMAGES.map(filename => ({
    image: `images/${filename}`,
    answer: filename.split('.')[0]
}));

const CONTINUE_QUIZ_DATA = {
    proverb: [
        { prompt: "가는 날이", answer: "장날이다" },
        { prompt: "갈수록", answer: "태산" },
        { prompt: "꿩 먹고", answer: "알 먹고" },
        { prompt: "등잔 밑이", answer: "어둡다" },
        { prompt: "말 한마디로", answer: "천 냥 빚을 갚는다" },
        { prompt: "백지장도", answer: "맞들면 낫다" },
        { prompt: "소 잃고", answer: "외양간 고친다" },
        { prompt: "시작이", answer: "반이다" },
        { prompt: "원숭이도", answer: "나무에서 떨어진다" },
        { prompt: "티끌 모아", answer: "태산" },
        { prompt: "낮말은 새가 듣고", answer: "밤말은 쥐가 듣는다" },
        { prompt: "빈 수레가", answer: "요란하다" },
        { prompt: "하늘이 무너져도", answer: "솟아날 구멍이 있다" },
        { prompt: "돌다리도", answer: "두드려보고 건너라" },
        { prompt: "개천에서", answer: "용 난다" },
        { prompt: "천 리 길도", answer: "한 걸음부터" },
        { prompt: "물에 빠진", answer: "사람 건져놓으니까 보따리 내놓으라 한다" },
        { prompt: "낫 놓고", answer: "ㄱ자도 모른다" },
        { prompt: "콩 심은 데", answer: "콩 나고 팥 심은 데 팥 난다" },
        { prompt: "세 살 버릇", answer: "여든까지 간다" },
        { prompt: "가재는 게 편이고", answer: "고래는 고래편이다" },
        { prompt: "남의 떡이", answer: "커 보인다" },
        { prompt: "뜻이 있는 곳에", answer: "길이 있다" },
        { prompt: "호랑이도", answer: "제 말하면 온다" },
        { prompt: "윗물이 맑아야", answer: "아랫물이 맑다" },
        { prompt: "발 없는 말이", answer: "천 리 간다" },
        { prompt: "공든 탑이", answer: "무너지랴" },
        { prompt: "모로 가도", answer: "서울만 가면 된다" },
        { prompt: "팔은 안으로", answer: "굽는다" },
        { prompt: "개구리 올챙이 적", answer: "생각 못 한다" },
        { prompt: "산 넘어", answer: "산" },
        { prompt: "열 번 찍어", answer: "안 넘어가는 나무 없다" },
        { prompt: "될성부른 나무는", answer: "떡잎부터 안다" },
        { prompt: "미꾸라지 한 마리가", answer: "온 웅덩이를 흐린다" },
        { prompt: "가랑비에", answer: "옷 젖는다" },
        { prompt: "서당 개 삼 년이면", answer: "풍월을 읊는다" },
        { prompt: "천 번 찍어", answer: "안 넘어가는 나무 없다" },
        { prompt: "바늘 도둑이", answer: "소 도둑 된다" },
        { prompt: "우물 안", answer: "개구리" },
        { prompt: "닭 쫓던 개", answer: "지붕 쳐다본다" },
        { prompt: "하늘의", answer: "별 따기" },
        { prompt: "눈 감으면", answer: "코 베어간다" },
        { prompt: "세 번 측량하고", answer: "한 번 베어라" },
        { prompt: "무쇠도 갈면", answer: "바늘이 된다" },
        { prompt: "가지 많은 나무", answer: "바람 잘 날 없다" },
        { prompt: "바른 말", answer: "도끼 맞는다" },
        { prompt: "고래 싸움에", answer: "새우 등 터진다" },
        { prompt: "벼 이삭은", answer: "익을수록 고개를 숙인다" },
        { prompt: "잠깐 쑥스러운 것보다", answer: "평생 바보 되는 것이 낫다" },
        { prompt: "누워서", answer: "떡 먹기" }
    ],
    idiom: [
        { prompt: "형설", answer: "지공" },
        { prompt: "결초", answer: "보은" },
        { prompt: "각골", answer: "난망" },
        { prompt: "감언", answer: "이설" },
        { prompt: "조삼", answer: "모사" },
        { prompt: "다다", answer: "익선" },
        { prompt: "과유", answer: "불급" },
        { prompt: "사필", answer: "귀정" },
        { prompt: "고진", answer: "감래" },
        { prompt: "유유", answer: "자적" },
        { prompt: "일석", answer: "이조" },
        { prompt: "청출", answer: "어람" },
        { prompt: "대기", answer: "만성" },
        { prompt: "백문", answer: "불여일견" },
        { prompt: "온고", answer: "지신" },
        { prompt: "백발", answer: "백중" },
        { prompt: "천편", answer: "일률" },
        { prompt: "일거", answer: "양득" },
        { prompt: "새옹", answer: "지마" },
        { prompt: "근묵", answer: "자흑" },
        { prompt: "명경", answer: "지수" },
        { prompt: "일조", answer: "일석" },
        { prompt: "타산", answer: "지석" },
        { prompt: "동병", answer: "상련" },
        { prompt: "순망", answer: "치한" },
        { prompt: "오십", answer: "보백" },
        { prompt: "임기", answer: "응변" },
        { prompt: "권선", answer: "징악" },
        { prompt: "좌지", answer: "우지" },
        { prompt: "능소", answer: "능대" },
        { prompt: "상부", answer: "상조" },
        { prompt: "전광", answer: "석화" },
        { prompt: "동문", answer: "서답" },
        { prompt: "자업", answer: "자득" },
        { prompt: "좌우", answer: "명색" },
        { prompt: "수주", answer: "대토" },
        { prompt: "양두", answer: "구육" },
        { prompt: "허장", answer: "성세" },
        { prompt: "진퇴", answer: "양난" },
        { prompt: "본말", answer: "전도" },
        { prompt: "동상", answer: "이몽" },
        { prompt: "견리", answer: "사의" },
        { prompt: "득롱", answer: "망촉" },
        { prompt: "이심", answer: "전심" },
        { prompt: "금의", answer: "환향" },
        { prompt: "상전", answer: "벽해" },
        { prompt: "어부", answer: "지리" },
        { prompt: "절치", answer: "부심" },
        { prompt: "노심", answer: "초사" },
        { prompt: "만사", answer: "형통" }
    ],
    fourChar: [
        { prompt: "견인", answer: "지역" },
        { prompt: "게르", answer: "마늄" },
        { prompt: "공기", answer: "놀이" },
        { prompt: "제기", answer: "차기" },
        { prompt: "강강", answer: "술래" },
        { prompt: "술래", answer: "잡기" },
        { prompt: "어린", answer: "이집" },
        { prompt: "차량", answer: "운행" },
        { prompt: "안전", answer: "운전" },
        { prompt: "안전", answer: "제일" },
        { prompt: "퀵서", answer: "비스" },
        { prompt: "바른", answer: "생활" },
        { prompt: "게슴", answer: "츠레" },
        { prompt: "고슴", answer: "도치" },
        { prompt: "헬리", answer: "콥터" },
        { prompt: "오토", answer: "바이" },
        { prompt: "바이", answer: "올린" },
        { prompt: "카멜", answer: "레온" },
        { prompt: "오토", answer: "바이" },
        { prompt: "파인", answer: "애플" },
        { prompt: "프로", answer: "그램" },
        { prompt: "바로", answer: "가기" },
        { prompt: "탱크", answer: "로리" },
        { prompt: "사자", answer: "성어" },
        { prompt: "비밀", answer: "번호" },
        { prompt: "가상", answer: "계좌" },
        { prompt: "계좌", answer: "번호" },
        { prompt: "홈페", answer: "이지" },
        { prompt: "만사", answer: "형통" },
        { prompt: "레이", answer: "아웃" },
        { prompt: "신문", answer: "사설" },
        { prompt: "영재", answer: "교육" },
        { prompt: "우리", answer: "은행" },
        { prompt: "국민", answer: "은행" },
        { prompt: "기업", answer: "은행" },
        { prompt: "일본", answer: "뇌염" },
        { prompt: "폐렴", answer: "구균" },
        { prompt: "예방", answer: "주사" },
        { prompt: "생년", answer: "월일" },
        { prompt: "특별", answer: "활동" },
        { prompt: "고객", answer: "센터" },
        { prompt: "샌드", answer: "위치" },
        { prompt: "유통", answer: "기한" },
        { prompt: "알레", answer: "르기" },
        { prompt: "담임", answer: "교사" },
        { prompt: "현장", answer: "학습" },
        { prompt: "뭉게", answer: "구름" },
        { prompt: "호랑", answer: "나비" },
        { prompt: "종이", answer: "접기" },
        { prompt: "휴대", answer: "전화" },
        { prompt: "프리", answer: "미엄" },
        { prompt: "협동", answer: "조합" },
        { prompt: "주의", answer: "사항" },
        { prompt: "사용", answer: "방법" },
        { prompt: "제품", answer: "설명" },
        { prompt: "직사", answer: "광선" },
        { prompt: "분리", answer: "수거" },
        { prompt: "폼클", answer: "렝징" },
        { prompt: "세숫", answer: "비누" },
        { prompt: "빨랫", answer: "비누" },
        { prompt: "총각", answer: "김치" },
        { prompt: "배추", answer: "김치" },
        { prompt: "두루", answer: "치기" },
        { prompt: "벼룩", answer: "시장" },
        { prompt: "해바", answer: "라기" },
        { prompt: "코스", answer: "모스" },
        { prompt: "수면", answer: "장애" },
        { prompt: "고지", answer: "혈증" },
        { prompt: "학습", answer: "효과" },
        { prompt: "비선", answer: "실세" },
        { prompt: "초등", answer: "학생" },
        { prompt: "고등", answer: "학생" },
        { prompt: "밀폐", answer: "용기" },
        { prompt: "후라", answer: "이팬" },
        { prompt: "카놀", answer: "라유" },
        { prompt: "톱니", answer: "바퀴" },
        { prompt: "어린", answer: "이날" },
        { prompt: "생활", answer: "용품" },
        { prompt: "즐겨", answer: "찾기" },
        { prompt: "일기", answer: "예보" },
        { prompt: "무념", answer: "무상" },
        { prompt: "공지", answer: "사항" },
        { prompt: "비즈", answer: "공예" },
        { prompt: "헤드", answer: "라인" },
        { prompt: "이용", answer: "약관" },
        { prompt: "황금", answer: "어장" },
        { prompt: "다사", answer: "다난" },
        { prompt: "잠금", answer: "모드" },
        { prompt: "카카", answer: "오톡" },
        { prompt: "대표", answer: "전화" },
        { prompt: "신혼", answer: "여행" },
        { prompt: "칠순", answer: "잔치" },
        { prompt: "백일", answer: "잔치" },
        { prompt: "영어", answer: "사전" },
        { prompt: "코스", answer: "프레" },
        { prompt: "곤충", answer: "채집" },
        { prompt: "공중", answer: "전화" },
        { prompt: "박테", answer: "리아" },
        { prompt: "다이", answer: "어트" },
        { prompt: "애벌", answer: "빨래" }
    ]
}; 