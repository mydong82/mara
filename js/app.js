// 메인 애플리케이션 클래스

class QuizApp {
    constructor() {
        this.playerCount = 0;
        this.teamNames = [];
        this.teamScores = [];
        
        this.uiManager = new UIManager();
        this.personQuiz = new PersonQuiz(this.uiManager);
        this.chosungQuiz = new ChosungQuiz(this.uiManager);
        this.continueQuiz = new ContinueQuiz(this.uiManager);
        
        this.elements = this.initializeElements();
        this.setupEventListeners();
        this.init();
    }

    /**
     * DOM 요소들 초기화
     */
    initializeElements() {
        return {
            startBtn: document.getElementById('start-btn'),
            playerCountBtns: document.querySelectorAll('.player-count-btn'),
            teamNameInputsContainer: document.getElementById('team-name-inputs'),
            submitTeamsBtn: document.getElementById('submit-teams-btn'),
            personQuizBtn: document.getElementById('person-quiz-btn'),
            chosungQuizBtn: document.getElementById('chosung-quiz-btn'),
            continueQuizBtn: document.getElementById('continue-quiz-btn'),
            backButtons: {
                playerCountBack: document.getElementById('player-count-back-btn'),
                teamNameBack: document.getElementById('team-name-back-btn'),
                gameSelectBack: document.getElementById('game-select-back-btn')
            }
        };
    }

    /**
     * 이벤트 리스너 설정
     */
    setupEventListeners() {
        // 시작 버튼
        this.elements.startBtn.addEventListener('click', () => {
            this.uiManager.showScreen('player-count-screen');
        });

        // 플레이어 수 선택
        this.elements.playerCountBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.selectPlayerCount(parseInt(btn.dataset.count));
            });
        });

        // 팀 이름 제출
        this.elements.submitTeamsBtn.addEventListener('click', () => {
            this.submitTeamNames();
        });

        // 게임 선택
        this.elements.personQuizBtn.addEventListener('click', () => {
            this.startPersonQuiz();
        });

        this.elements.chosungQuizBtn.addEventListener('click', () => {
            this.startChosungQuiz();
        });

        this.elements.continueQuizBtn.addEventListener('click', () => {
            this.startContinueQuiz();
        });

        // 뒤로가기 버튼들
        this.setupBackButtons();
    }

    /**
     * 뒤로가기 버튼 설정
     */
    setupBackButtons() {
        this.elements.backButtons.playerCountBack.addEventListener('click', () => {
            this.uiManager.showConfirmationModal(() => {
                this.uiManager.showScreen('start-screen');
            });
        });

        this.elements.backButtons.teamNameBack.addEventListener('click', () => {
            this.uiManager.showConfirmationModal(() => {
                this.uiManager.showScreen('player-count-screen');
            });
        });

        this.elements.backButtons.gameSelectBack.addEventListener('click', () => {
            this.uiManager.showConfirmationModal(() => {
                this.uiManager.showScreen('team-name-screen');
            });
        });
    }

    /**
     * 플레이어 수 선택
     * @param {number} count 선택된 플레이어 수
     */
    selectPlayerCount(count) {
        this.playerCount = count;
        this.createTeamNameInputs();
        this.uiManager.showScreen('team-name-screen');
        log('QuizApp', `Player count selected: ${count}`);
    }

    /**
     * 팀 이름 입력 필드 생성
     */
    createTeamNameInputs() {
        const container = this.elements.teamNameInputsContainer;
        container.innerHTML = '';
        
        for (let i = 0; i < this.playerCount; i++) {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = `팀 ${i + 1} 이름`;
            input.className = 'team-name-input';
            container.appendChild(input);
        }
    }

    /**
     * 팀 이름 제출
     */
    submitTeamNames() {
        const inputs = document.querySelectorAll('.team-name-input');
        this.teamNames = Array.from(inputs).map(input => input.value.trim());

        if (this.teamNames.some(name => name === '')) {
            alert('모든 팀의 이름을 입력해주세요.');
            return;
        }

        // 팀 점수 초기화
        this.teamScores = new Array(this.playerCount).fill(0);
        
        log('QuizApp', 'Team names submitted', this.teamNames);
        this.uiManager.showScreen('game-select-screen');
        this.renderGameSelectScoreboard();
    }

    /**
     * 게임 선택 화면 점수판 렌더링
     */
    renderGameSelectScoreboard() {
        this.uiManager.renderScoreboard(
            'game-select-scoreboard',
            this.teamNames,
            this.teamScores
        );
    }

    /**
     * 인물 퀴즈 시작
     */
    startPersonQuiz() {
        this.personQuiz.start(this.teamNames, this.teamScores);
        log('QuizApp', 'Person quiz started');
    }

    /**
     * 초성 퀴즈 시작
     */
    startChosungQuiz() {
        this.chosungQuiz.start(this.teamNames, this.teamScores);
        log('QuizApp', 'Chosung quiz started');
    }

    /**
     * 이어서 말해요 퀴즈 시작
     */
    startContinueQuiz() {
        this.continueQuiz.start(this.teamNames, this.teamScores);
        log('QuizApp', 'Continue quiz started');
    }

    /**
     * 애플리케이션 초기화
     */
    init() {
        this.uiManager.showScreen('start-screen');
        log('QuizApp', 'Application initialized');
    }
}

// 애플리케이션 시작
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
}); 