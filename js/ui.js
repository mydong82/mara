// UI 관련 유틸리티 함수들

class UIManager {
    constructor() {
        this.screens = document.querySelectorAll('.screen');
        this.confirmationModal = document.getElementById('confirmation-modal');
        this.currentConfirmCallback = null;
        this.initializeModal();
    }

    /**
     * 화면 전환 함수
     * @param {string} screenId 표시할 화면의 ID
     */
    showScreen(screenId) {
        log('UIManager', `Attempting to show screen: ${screenId}`);
        
        this.screens.forEach(screen => {
            screen.classList.remove('active');
        });
        
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            log('UIManager', `Screen ${screenId} activated`);
        } else {
            log('UIManager', `Screen with ID ${screenId} not found`);
        }
    }

    /**
     * 모달 초기화
     */
    initializeModal() {
        const confirmYesBtn = document.getElementById('confirm-yes-btn');
        const confirmNoBtn = document.getElementById('confirm-no-btn');

        confirmYesBtn.addEventListener('click', () => {
            if (this.currentConfirmCallback) {
                log('UIManager', 'Executing confirmation callback');
                this.currentConfirmCallback();
            }
            this.hideConfirmationModal();
        });

        confirmNoBtn.addEventListener('click', () => {
            this.hideConfirmationModal();
        });
    }

    /**
     * 확인 모달 표시
     * @param {Function} onConfirm 확인 시 실행할 콜백 함수
     */
    showConfirmationModal(onConfirm) {
        this.currentConfirmCallback = onConfirm;
        this.confirmationModal.classList.add('active');
    }

    /**
     * 확인 모달 숨기기
     */
    hideConfirmationModal() {
        this.confirmationModal.classList.remove('active');
        this.currentConfirmCallback = null;
    }

    /**
     * 점수판 렌더링
     * @param {string} targetElementId 점수판을 렌더링할 요소의 ID
     * @param {Array} teamNames 팀 이름 배열
     * @param {Array} teamScores 팀 점수 배열
     * @param {Function} onScoreChange 점수 변경 콜백 함수
     */
    renderScoreboard(targetElementId, teamNames, teamScores, onScoreChange = null) {
        const targetScoreboard = document.getElementById(targetElementId);
        if (!targetScoreboard) {
            log('UIManager', `Scoreboard element ${targetElementId} not found`);
            return;
        }

        targetScoreboard.innerHTML = '';

        // 팀 데이터와 원본 인덱스를 함께 묶기
        const teamsWithData = teamNames.map((name, index) => ({
            name: name,
            score: teamScores[index],
            originalIndex: index
        }));

        // 점수가 모두 0인지 확인
        const allScoresZero = teamScores.every(score => score === 0);

        // 순위 계산 (게임 선택 화면에서만 정렬)
        const rankedTeams = targetElementId === 'game-select-scoreboard' 
            ? this.calculateRanks(teamsWithData)
            : this.calculateRanksWithoutSorting(teamsWithData);

        // 순위별로 카드 생성
        rankedTeams.forEach(team => {
            const card = this.createScoreCard(team, targetElementId, allScoresZero);
            targetScoreboard.appendChild(card);
        });

        // 점수 조절 버튼 이벤트 리스너 추가 (게임 화면에서만)
        if (targetElementId !== 'game-select-scoreboard' && onScoreChange) {
            this.attachScoreButtons(onScoreChange);
        }
    }

    /**
     * 순위 계산 (정렬 포함)
     * @param {Array} teamsWithData 팀 데이터 배열
     * @returns {Array} 순위가 포함된 팀 데이터 배열
     */
    calculateRanks(teamsWithData) {
        // 점수 순으로 정렬 (내림차순)
        const sortedTeams = teamsWithData.sort((a, b) => b.score - a.score);
        
        let rank = 0;
        let lastScore = -1;
        
        return sortedTeams.map((team, index) => {
            if (team.score !== lastScore) {
                rank = index + 1;
            }
            lastScore = team.score;
            return { ...team, rank };
        });
    }

    /**
     * 순위 계산 (정렬 없이)
     * @param {Array} teamsWithData 팀 데이터 배열
     * @returns {Array} 순위가 포함된 팀 데이터 배열
     */
    calculateRanksWithoutSorting(teamsWithData) {
        // 점수별로 순위 매핑 계산
        const uniqueScores = [...new Set(teamsWithData.map(team => team.score))];
        uniqueScores.sort((a, b) => b - a); // 내림차순 정렬
        
        const scoreToRank = {};
        let currentRank = 1;
        
        uniqueScores.forEach(score => {
            scoreToRank[score] = currentRank;
            currentRank += teamsWithData.filter(team => team.score === score).length;
        });
        
        // 원래 순서 유지하면서 순위만 추가
        return teamsWithData.map(team => ({
            ...team,
            rank: scoreToRank[team.score]
        }));
    }

    /**
     * 점수 카드 생성
     * @param {Object} team 팀 데이터
     * @param {string} targetElementId 대상 요소 ID
     * @param {boolean} allScoresZero 모든 점수가 0인지 여부
     * @returns {HTMLElement} 생성된 카드 요소
     */
    createScoreCard(team, targetElementId, allScoresZero) {
        const card = document.createElement('div');
        card.className = 'team-score-card';

        // 순위 클래스 추가
        if (!allScoresZero) {
            if (team.rank === 1) {
                card.classList.add('rank-1');
            } else if (team.rank === 2) {
                card.classList.add('rank-2');
            }
        }

        // 메달 HTML 생성
        let medalHTML = '';
        if (!allScoresZero && targetElementId === 'game-select-scoreboard') {
            if (team.rank === 1) {
                medalHTML = '<div class="medal">🥇</div>';
            } else if (team.rank === 2) {
                medalHTML = '<div class="medal">🥈</div>';
            }
        }

        // 점수 조절 버튼 HTML 생성 (게임 화면에서만)
        const isGameScreen = targetElementId !== 'game-select-scoreboard';
        const scoreControlsHTML = isGameScreen ? `
            <div class="score-controls">
                <button class="score-btn" data-index="${team.originalIndex}" data-change="-1">-</button>
                <div class="score" id="score-${targetElementId}-${team.originalIndex}">${team.score}</div>
                <button class="score-btn" data-index="${team.originalIndex}" data-change="1">+</button>
            </div>
        ` : '';

        // 게임 선택 화면에서는 점수만 표시
        const gameSelectScoreHTML = targetElementId === 'game-select-scoreboard' ? `
            <div class="game-select-score">${team.score}</div>
        ` : '';

        card.innerHTML = `
            ${medalHTML}
            <div class="team-name">${team.name}</div>
            ${scoreControlsHTML}
            ${gameSelectScoreHTML}
        `;

        return card;
    }

    /**
     * 점수 조절 버튼 이벤트 리스너 연결
     * @param {Function} onScoreChange 점수 변경 콜백 함수
     */
    attachScoreButtons(onScoreChange) {
        document.querySelectorAll('.score-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                const change = parseInt(e.target.dataset.change);
                onScoreChange(index, change);
            });
        });
    }

    /**
     * 답안 오버레이 이벤트 설정
     * @param {HTMLElement} container 컨테이너 요소
     * @param {HTMLElement} overlay 오버레이 요소
     */
    setupAnswerOverlay(container, overlay) {
        // 마우스 이벤트
        container.addEventListener('mousedown', () => {
            overlay.style.opacity = '1';
        });
        
        container.addEventListener('mouseup', () => {
            overlay.style.opacity = '0';
        });
        
        container.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
        });

        // 터치 이벤트
        container.addEventListener('touchstart', (e) => {
            e.preventDefault();
            overlay.style.opacity = '1';
        });
        
        container.addEventListener('touchend', () => {
            overlay.style.opacity = '0';
        });
    }
} 