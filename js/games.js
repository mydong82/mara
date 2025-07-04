// 게임 클래스들

/**
 * 기본 퀴즈 클래스 (추상 클래스)
 */
class BaseQuiz {
    constructor(uiManager, quizType) {
        if (this.constructor === BaseQuiz) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.uiManager = uiManager;
        this.quizType = quizType;
        this.currentIndex = 0;
        this.quizData = [];
        this.teamNames = [];
        this.teamScores = [];
        this.elements = this.initializeElements();
        this.setupEventListeners();
    }

    /**
     * DOM 요소들을 초기화 (자식 클래스에서 구현)
     */
    initializeElements() {
        throw new Error("Method 'initializeElements()' must be implemented.");
    }

    /**
     * 이벤트 리스너 설정
     */
    setupEventListeners() {
        // 답안 오버레이
        this.uiManager.setupAnswerOverlay(
            this.elements.questionContainer,
            this.elements.answerOverlay
        );

        // 네비게이션 버튼
        this.elements.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.elements.prevBtn.addEventListener('click', () => this.prevQuestion());
        this.elements.backBtn.addEventListener('click', () => {
            this.uiManager.showConfirmationModal(() => {
                this.uiManager.showScreen('game-select-screen');
            });
        });
    }

    /**
     * 퀴즈 시작
     * @param {Array} teamNames 팀 이름 배열
     * @param {Array} teamScores 팀 점수 배열
     */
    start(teamNames, teamScores) {
        this.teamNames = teamNames;
        this.teamScores = teamScores;
        this.quizData = this.prepareQuizData();
        this.currentIndex = 0;
        this.renderScoreboard();
        this.showQuestion();
        this.uiManager.showScreen(`${this.quizType}-quiz-screen`);
        log(this.constructor.name, 'Quiz started');
    }
    
    /**
     * 퀴즈 데이터 준비 (자식 클래스에서 구현)
     */
    prepareQuizData() {
        throw new Error("Method 'prepareQuizData()' must be implemented.");
    }

    /**
     * 점수판 렌더링
     */
    renderScoreboard() {
        this.uiManager.renderScoreboard(
            `${this.quizType}-scoreboard`,
            this.teamNames,
            this.teamScores,
            (index, change) => this.updateScore(index, change)
        );
    }

    /**
     * 점수 업데이트
     * @param {number} teamIndex 팀 인덱스
     * @param {number} change 점수 변경량
     */
    updateScore(teamIndex, change) {
        this.teamScores[teamIndex] += change;
        if (this.teamScores[teamIndex] < 0) {
            this.teamScores[teamIndex] = 0;
        }
        this.updateAllScoreboards();
    }
    
    /**
     * 모든 점수판 업데이트
     */
    updateAllScoreboards() {
        // 현재 게임 점수판 업데이트
        this.renderScoreboard();
        // 게임 선택 화면 점수판 업데이트
        this.uiManager.renderScoreboard('game-select-scoreboard', this.teamNames, this.teamScores);
    }


    /**
     * 문제 표시 (자식 클래스에서 구현)
     */
    showQuestion() {
        throw new Error("Method 'showQuestion()' must be implemented.");
    }

    /**
     * 다음 문제
     */
    nextQuestion() {
        this.currentIndex++;
        this.showQuestion();
    }

    /**
     * 이전 문제
     */
    prevQuestion() {
        this.currentIndex--;
        this.showQuestion();
    }
}


/**
 * 인물 퀴즈 클래스
 */
class PersonQuiz extends BaseQuiz {
    constructor(uiManager) {
        super(uiManager, 'person');
    }

    initializeElements() {
        return {
            title: document.getElementById('quiz-title'),
            image: document.getElementById('quiz-image'),
            answerOverlay: document.getElementById('quiz-answer-overlay'),
            questionContainer: document.querySelector('.image-container'),
            prevBtn: document.getElementById('prev-btn'),
            nextBtn: document.getElementById('next-btn'),
            backBtn: document.getElementById('back-to-games-btn'),
            scoreboard: document.getElementById('scoreboard')
        };
    }
    
    prepareQuizData() {
        return shuffleArray([...PERSON_QUIZ_DATA]);
    }

    showQuestion() {
        this.currentIndex = getSafeIndex(this.currentIndex, this.quizData.length);
        const currentQuiz = this.quizData[this.currentIndex];
        
        this.elements.title.textContent = `인물 퀴즈 #${this.currentIndex + 1}`;
        this.elements.image.src = currentQuiz.image;
        this.elements.answerOverlay.textContent = currentQuiz.answer;
        
        log('PersonQuiz', `Showing question ${this.currentIndex + 1}`, currentQuiz);
    }
    
    renderScoreboard() {
        this.uiManager.renderScoreboard(
            'scoreboard',
            this.teamNames,
            this.teamScores,
            (index, change) => this.updateScore(index, change)
        );
    }
}

/**
 * 초성 퀴즈 클래스
 */
class ChosungQuiz extends BaseQuiz {
    constructor(uiManager) {
        super(uiManager, 'chosung');
        this.currentTopic = null;
        this.setupTopicSelection();
    }

    initializeElements() {
        return {
            title: document.getElementById('chosung-quiz-title'),
            question: document.getElementById('chosung-question'),
            answerOverlay: document.getElementById('chosung-answer-overlay'),
            questionContainer: document.getElementById('chosung-question-container'),
            prevBtn: document.getElementById('chosung-prev-btn'),
            nextBtn: document.getElementById('chosung-next-btn'),
            backBtn: document.getElementById('chosung-back-to-games-btn'),
            topicBtns: document.querySelectorAll('.chosung-topic-btn'),
            topicBackBtn: document.getElementById('chosung-topic-back-btn'),
            scoreboard: document.getElementById('chosung-scoreboard')
        };
    }
    
    setupTopicSelection() {
        this.elements.topicBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentTopic = e.currentTarget.dataset.topic;
                // start 메소드가 App 클래스에서 호출되므로, 여기서는 토픽만 설정하고
                // App 클래스에서 start를 호출하도록 변경해야 합니다.
                // 우선 지금 구조에서는 startWithTopic을 호출합니다.
                this.startWithTopic(this.currentTopic);
            });
        });

        this.elements.topicBackBtn.addEventListener('click', () => {
            this.uiManager.showConfirmationModal(() => {
                this.uiManager.showScreen('game-select-screen');
            });
        });
    }
    
    showTopicSelectionScreen() {
        this.uiManager.showScreen('chosung-topic-screen');
    }

    startWithTopic(topic) {
        this.currentTopic = topic;
        super.start(this.teamNames, this.teamScores);
    }
    
    // App.js에서 팀 정보가 설정된 후 호출될 수 있도록 start 재정의
    start(teamNames, teamScores) {
        this.teamNames = teamNames;
        this.teamScores = teamScores;
        this.showTopicSelectionScreen();
    }

    prepareQuizData() {
        if (!this.currentTopic) {
            throw new Error("Topic not selected for ChosungQuiz.");
        }
        return shuffleArray([...CHOSUNG_QUIZ_DATA[this.currentTopic]]);
    }

    showQuestion() {
        this.currentIndex = getSafeIndex(this.currentIndex, this.quizData.length);
        const answer = this.quizData[this.currentIndex];
        const question = getChosung(answer);

        this.elements.title.textContent = `초성 퀴즈 #${this.currentIndex + 1}`;
        this.elements.question.textContent = question;
        this.elements.answerOverlay.textContent = answer;
        
        log('ChosungQuiz', `Showing question ${this.currentIndex + 1}`, { question, answer });
    }
    
    renderScoreboard() {
        this.uiManager.renderScoreboard(
            'chosung-scoreboard',
            this.teamNames,
            this.teamScores,
            (index, change) => this.updateScore(index, change)
        );
    }
}

/**
 * 이어서 말해요 퀴즈 클래스
 */
class ContinueQuiz extends BaseQuiz {
    constructor(uiManager) {
        super(uiManager, 'continue');
        this.currentTopic = null;
        this.setupTopicSelection();
    }

    initializeElements() {
        return {
            title: document.getElementById('continue-quiz-title'),
            question: document.getElementById('continue-question'),
            answerOverlay: document.getElementById('continue-answer-overlay'),
            questionContainer: document.getElementById('continue-question-container'),
            prevBtn: document.getElementById('continue-prev-btn'),
            nextBtn: document.getElementById('continue-next-btn'),
            backBtn: document.getElementById('continue-back-to-games-btn'),
            topicBtns: document.querySelectorAll('.continue-topic-btn'),
            topicBackBtn: document.getElementById('continue-topic-back-btn'),
            scoreboard: document.getElementById('continue-scoreboard')
        };
    }

    setupTopicSelection() {
        this.elements.topicBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentTopic = e.currentTarget.dataset.topic;
                this.startWithTopic(this.currentTopic);
            });
        });

        this.elements.topicBackBtn.addEventListener('click', () => {
            this.uiManager.showConfirmationModal(() => {
                this.uiManager.showScreen('game-select-screen');
            });
        });
    }

    showTopicSelectionScreen() {
        this.uiManager.showScreen('continue-topic-screen');
    }

    startWithTopic(topic) {
        this.currentTopic = topic;
        super.start(this.teamNames, this.teamScores);
    }

    start(teamNames, teamScores) {
        this.teamNames = teamNames;
        this.teamScores = teamScores;
        this.showTopicSelectionScreen();
    }

    prepareQuizData() {
        if (!this.currentTopic) {
            throw new Error("Topic not selected for ContinueQuiz.");
        }
        return shuffleArray([...CONTINUE_QUIZ_DATA[this.currentTopic]]);
    }

    showQuestion() {
        this.currentIndex = getSafeIndex(this.currentIndex, this.quizData.length);
        const currentQuiz = this.quizData[this.currentIndex];

        this.elements.title.textContent = `이어서 말해요 #${this.currentIndex + 1}`;
        this.elements.question.textContent = currentQuiz.prompt;
        this.elements.answerOverlay.textContent = currentQuiz.answer;

        log('ContinueQuiz', `Showing question ${this.currentIndex + 1}`, currentQuiz);
    }

    renderScoreboard() {
        this.uiManager.renderScoreboard(
            'continue-scoreboard',
            this.teamNames,
            this.teamScores,
            (index, change) => this.updateScore(index, change)
        );
    }
} 