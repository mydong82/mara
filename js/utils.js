// 유틸리티 함수들

/**
 * 배열을 섞는 함수 (Fisher-Yates shuffle 알고리즘)
 * @param {Array} array 섞을 배열
 * @returns {Array} 섞인 배열
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * 한글 초성 추출 함수
 * @param {string} str 초성을 추출할 한글 문자열
 * @returns {string} 추출된 초성
 */
function getChosung(str) {
    const cho = [
        'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 
        'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    ];
    
    let result = '';
    for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i) - 44032;
        if (code > -1 && code < 11172) {
            result += cho[Math.floor(code / 588)];
        }
    }
    return result;
}

/**
 * 안전한 인덱스 계산 (순환 인덱스)
 * @param {number} index 현재 인덱스
 * @param {number} length 배열 길이
 * @returns {number} 안전한 인덱스
 */
function getSafeIndex(index, length) {
    return (index % length + length) % length;
}

/**
 * 디바운싱 함수
 * @param {Function} func 실행할 함수
 * @param {number} delay 지연 시간 (ms)
 * @returns {Function} 디바운싱된 함수
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * 로깅 유틸리티
 * @param {string} tag 로그 태그
 * @param {string} message 로그 메시지
 * @param {any} data 추가 데이터
 */
function log(tag, message, data = null) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${tag}] ${message}`;
    
    if (data) {
        console.log(logMessage, data);
    } else {
        console.log(logMessage);
    }
} 