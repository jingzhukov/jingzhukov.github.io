// Series 65 Practice Exam Engine
let examState = {
    questions: [],
    currentIndex: 0,
    userAnswers: {},
    flaggedQuestions: new Set(),
    startTime: null,
    endTime: null,
    timerInterval: null,
    timeRemaining: 180 * 60 // 180 minutes in seconds
};

// Initialize exam
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('start-exam-btn').addEventListener('click', startExam);
    document.getElementById('prev-btn').addEventListener('click', () => navigateQuestion(-1));
    document.getElementById('next-btn').addEventListener('click', () => navigateQuestion(1));
    document.getElementById('flag-btn').addEventListener('click', toggleFlag);
    document.getElementById('submit-exam-btn').addEventListener('click', confirmSubmit);
    document.getElementById('retake-exam-btn').addEventListener('click', retakeExam);
    document.getElementById('review-wrong-btn').addEventListener('click', showReview);
    document.getElementById('exit-review-btn').addEventListener('click', exitReview);
});

function startExam() {
    // Load random questions
    examState.questions = getRandomQuestions(95);
    examState.currentIndex = 0;
    examState.userAnswers = {};
    examState.flaggedQuestions = new Set();
    examState.startTime = Date.now();

    // Update UI
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('exam-screen').style.display = 'block';
    document.getElementById('total-questions').textContent = examState.questions.length;

    // Initialize question navigator
    initializeQuestionNavigator();

    // Display first question
    displayQuestion();

    // Start timer
    startTimer();
}

function startTimer() {
    examState.timeRemaining = 180 * 60; // Reset to 180 minutes

    examState.timerInterval = setInterval(() => {
        examState.timeRemaining--;

        if (examState.timeRemaining <= 0) {
            clearInterval(examState.timerInterval);
            autoSubmitExam();
        }

        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    const hours = Math.floor(examState.timeRemaining / 3600);
    const minutes = Math.floor((examState.timeRemaining % 3600) / 60);
    const seconds = examState.timeRemaining % 60;

    const display = `Time Remaining: ${hours > 0 ? hours + ':' : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timer').textContent = display;

    // Warning color when less than 30 minutes
    if (examState.timeRemaining < 1800) {
        document.getElementById('timer').style.color = '#ff9800';
    }
    if (examState.timeRemaining < 600) {
        document.getElementById('timer').style.color = '#dc3545';
    }
}

function initializeQuestionNavigator() {
    const grid = document.getElementById('question-grid');
    grid.innerHTML = '';

    examState.questions.forEach((_, index) => {
        const qNum = document.createElement('div');
        qNum.className = 'q-num';
        qNum.textContent = index + 1;
        qNum.addEventListener('click', () => jumpToQuestion(index));
        grid.appendChild(qNum);
    });

    updateNavigatorHighlight();
}

function displayQuestion() {
    const question = examState.questions[examState.currentIndex];
    const container = document.getElementById('question-container');

    container.innerHTML = `
        <div class="question-number">Question ${examState.currentIndex + 1} of ${examState.questions.length}</div>
        <div class="question-text">${question.question}</div>
        <div class="answer-options">
            ${Object.entries(question.options).map(([key, value]) => `
                <label class="option ${examState.userAnswers[examState.currentIndex] === key ? 'selected' : ''}">
                    <input type="radio" name="answer" value="${key}"
                           ${examState.userAnswers[examState.currentIndex] === key ? 'checked' : ''}
                           onchange="selectAnswer('${key}')">
                    <span class="option-label">${key.toUpperCase()}. ${value}</span>
                </label>
            `).join('')}
        </div>
    `;

    // Update current question display
    document.getElementById('current-question').textContent = examState.currentIndex + 1;

    // Update flag button
    const flagBtn = document.getElementById('flag-btn');
    if (examState.flaggedQuestions.has(examState.currentIndex)) {
        flagBtn.classList.add('flagged');
        flagBtn.textContent = 'Unflag';
    } else {
        flagBtn.classList.remove('flagged');
        flagBtn.textContent = 'Flag for Review';
    }

    // Update navigation buttons
    document.getElementById('prev-btn').disabled = examState.currentIndex === 0;

    // Show submit button on last question
    if (examState.currentIndex === examState.questions.length - 1) {
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('submit-exam-btn').style.display = 'block';
    } else {
        document.getElementById('next-btn').style.display = 'block';
        document.getElementById('submit-exam-btn').style.display = 'none';
    }

    updateNavigatorHighlight();
}

function selectAnswer(answer) {
    examState.userAnswers[examState.currentIndex] = answer;

    // Update option styling
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    event.target.closest('.option').classList.add('selected');

    updateNavigatorHighlight();
}

function navigateQuestion(direction) {
    const newIndex = examState.currentIndex + direction;
    if (newIndex >= 0 && newIndex < examState.questions.length) {
        examState.currentIndex = newIndex;
        displayQuestion();
    }
}

function jumpToQuestion(index) {
    examState.currentIndex = index;
    displayQuestion();
}

function toggleFlag() {
    if (examState.flaggedQuestions.has(examState.currentIndex)) {
        examState.flaggedQuestions.delete(examState.currentIndex);
    } else {
        examState.flaggedQuestions.add(examState.currentIndex);
    }
    displayQuestion();
}

function updateNavigatorHighlight() {
    const qNums = document.querySelectorAll('.q-num');
    qNums.forEach((qNum, index) => {
        qNum.classList.remove('current', 'answered', 'flagged');

        if (index === examState.currentIndex) {
            qNum.classList.add('current');
        } else if (examState.userAnswers[index] !== undefined) {
            qNum.classList.add('answered');
        }

        if (examState.flaggedQuestions.has(index)) {
            qNum.classList.add('flagged');
        }
    });
}

function confirmSubmit() {
    const unanswered = examState.questions.length - Object.keys(examState.userAnswers).length;

    let message = 'Are you sure you want to submit your exam?';
    if (unanswered > 0) {
        message += `\n\nYou have ${unanswered} unanswered question(s).`;
    }
    if (examState.flaggedQuestions.size > 0) {
        message += `\n\nYou have ${examState.flaggedQuestions.size} question(s) flagged for review.`;
    }

    if (confirm(message)) {
        submitExam();
    }
}

function autoSubmitExam() {
    alert('Time is up! Your exam will be submitted automatically.');
    submitExam();
}

function submitExam() {
    examState.endTime = Date.now();
    clearInterval(examState.timerInterval);

    // Calculate results
    const results = calculateResults();

    // Show results screen
    displayResults(results);
}

function calculateResults() {
    let correct = 0;
    let topicScores = {
        economics: { correct: 0, total: 0 },
        investments: { correct: 0, total: 0 },
        recommendations: { correct: 0, total: 0 },
        regulations: { correct: 0, total: 0 },
        advanced: { correct: 0, total: 0 }
    };

    const wrongAnswers = [];

    examState.questions.forEach((question, index) => {
        const userAnswer = examState.userAnswers[index];
        const isCorrect = userAnswer === question.correct;

        if (isCorrect) {
            correct++;
        } else {
            wrongAnswers.push({ question, index, userAnswer });
        }

        // Track by topic
        const topic = question.id.split('_')[0];
        const topicMap = {
            'econ': 'economics',
            'inv': 'investments',
            'rec': 'recommendations',
            'reg': 'regulations',
            'adv': 'advanced'
        };
        const topicKey = topicMap[topic] || 'advanced';

        topicScores[topicKey].total++;
        if (isCorrect) {
            topicScores[topicKey].correct++;
        }
    });

    const percentage = Math.round((correct / examState.questions.length) * 100);
    const passed = percentage >= 72;
    const timeTaken = Math.floor((examState.endTime - examState.startTime) / 1000);

    return {
        correct,
        total: examState.questions.length,
        percentage,
        passed,
        timeTaken,
        topicScores,
        wrongAnswers
    };
}

function displayResults(results) {
    // Hide exam screen, show results
    document.getElementById('exam-screen').style.display = 'none';
    document.getElementById('results-screen').style.display = 'block';

    // Pass/Fail indicator
    const passFail = document.getElementById('pass-fail');
    if (results.passed) {
        passFail.className = 'pass-fail pass';
        passFail.textContent = '✓ PASSED';
    } else {
        passFail.className = 'pass-fail fail';
        passFail.textContent = '✗ FAILED';
    }

    // Score display
    document.getElementById('final-score').textContent = results.percentage + '%';
    document.getElementById('correct-count').textContent = `${results.correct}/${results.total} Correct`;

    // Time taken
    const hours = Math.floor(results.timeTaken / 3600);
    const minutes = Math.floor((results.timeTaken % 3600) / 60);
    const seconds = results.timeTaken % 60;
    document.getElementById('time-taken').textContent =
        `${hours > 0 ? hours + ':' : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    // Topic breakdown
    const topicBreakdown = document.getElementById('topic-breakdown');
    const topicNames = {
        economics: 'Economic Factors & Business Information',
        investments: 'Investment Vehicle Characteristics',
        recommendations: 'Client Investment Recommendations',
        regulations: 'Laws, Regulations & Guidelines',
        advanced: 'Advanced Topics'
    };

    let breakdownHTML = '<h3>Performance by Topic</h3>';
    Object.entries(results.topicScores).forEach(([topic, score]) => {
        if (score.total > 0) {
            const percent = Math.round((score.correct / score.total) * 100);
            breakdownHTML += `
                <div class="topic-score">
                    <span class="topic-name">${topicNames[topic]}</span>
                    <span class="topic-result">${score.correct}/${score.total} (${percent}%)</span>
                </div>
            `;
        }
    });
    topicBreakdown.innerHTML = breakdownHTML;

    // Store wrong answers for review
    examState.wrongAnswers = results.wrongAnswers;
}

function showReview() {
    document.getElementById('results-screen').style.display = 'none';
    document.getElementById('review-screen').style.display = 'block';

    const container = document.getElementById('review-container');
    container.innerHTML = '';

    if (examState.wrongAnswers.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:40px;"><h2>Perfect Score! No incorrect answers to review.</h2></div>';
        return;
    }

    examState.wrongAnswers.forEach(({ question, index, userAnswer }) => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';

        const userAnswerText = userAnswer ? question.options[userAnswer] : 'No answer selected';
        const correctAnswerText = question.options[question.correct];

        reviewItem.innerHTML = `
            <div class="review-question-text">Question ${index + 1}: ${question.question}</div>

            <div class="review-your-answer">
                <strong>Your Answer:</strong> ${userAnswer ? userAnswer.toUpperCase() + '. ' : ''}${userAnswerText}
            </div>

            <div class="review-correct-answer">
                <strong>Correct Answer:</strong> ${question.correct.toUpperCase()}. ${correctAnswerText}
            </div>

            <div class="review-explanation">
                <strong>Explanation:</strong> ${question.explanation}
            </div>
        `;

        container.appendChild(reviewItem);
    });
}

function exitReview() {
    document.getElementById('review-screen').style.display = 'none';
    document.getElementById('results-screen').style.display = 'block';
}

function retakeExam() {
    // Reset everything
    examState = {
        questions: [],
        currentIndex: 0,
        userAnswers: {},
        flaggedQuestions: new Set(),
        startTime: null,
        endTime: null,
        timerInterval: null,
        timeRemaining: 180 * 60
    };

    // Show start screen
    document.getElementById('results-screen').style.display = 'none';
    document.getElementById('review-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'block';

    // Reset timer display
    document.getElementById('timer').textContent = 'Time Remaining: 180:00';
    document.getElementById('timer').style.color = 'white';
}

// Make selectAnswer available globally
window.selectAnswer = selectAnswer;
