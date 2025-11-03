// Quiz answer key with correct answers and explanations
const answerKey = {
    q1: {
        correct: 'b',
        explanation: 'Building permits for new homes is a leading indicator because it predicts future economic activity. Leading indicators change before the economy begins to follow a particular pattern.'
    },
    q2: {
        correct: 'b',
        explanation: 'During inflation, the Fed uses contractionary monetary policy, including increasing reserve requirements, to reduce money supply and cool down the economy.'
    },
    q3: {
        correct: 'c',
        explanation: 'Contraction (or recession) is characterized by declining GDP, increasing unemployment, and decreasing consumer spending.'
    },
    q4: {
        correct: 'a',
        explanation: 'When purchasing a call option, the maximum loss is limited to the premium paid. This is one of the benefits of being an option buyer.'
    },
    q5: {
        correct: 'b',
        explanation: 'Bonds have an inverse relationship with interest rates. When interest rates rise, existing bond values fall because new bonds offer higher yields.'
    },
    q6: {
        correct: 'b',
        explanation: 'Closed-end funds have a fixed number of shares that trade on exchanges, unlike open-end mutual funds which continuously issue and redeem shares.'
    },
    q7: {
        correct: 'c',
        explanation: 'TIPS (Treasury Inflation-Protected Securities) protect against purchasing power risk (inflation risk) by adjusting the principal based on CPI changes.'
    },
    q8: {
        correct: 'c',
        explanation: 'A young client (35) with high risk tolerance and long time horizon (25 years) can tolerate market volatility and benefit from higher equity allocation (80% stocks, 20% bonds).'
    },
    q9: {
        correct: 'c',
        explanation: 'Roth IRA allows for tax-free qualified withdrawals in retirement. Contributions are made with after-tax dollars, but qualified distributions are tax-free.'
    },
    q10: {
        correct: 'b',
        explanation: 'The wash sale rule prohibits claiming a loss if a substantially identical security is purchased within 30 days before or after the sale (61-day window total).'
    },
    q11: {
        correct: 'b',
        explanation: 'Tax-equivalent yield = Municipal yield / (1 - Tax bracket) = 4% / (1 - 0.32) = 4% / 0.68 = 5.88%'
    },
    q12: {
        correct: 'c',
        explanation: 'The primary purpose of portfolio rebalancing is to maintain the target asset allocation as market movements cause portfolio weights to drift from targets.'
    },
    q13: {
        correct: 'c',
        explanation: 'Investment advisers must register with the SEC if they have assets under management exceeding $110 million. Below that threshold, they typically register with states.'
    },
    q14: {
        correct: 'b',
        explanation: 'Form ADV Part 2 (brochure) must be delivered at least 48 hours before signing the contract, or at the time of signing if the client has a 5-day right to cancel.'
    },
    q15: {
        correct: 'b',
        explanation: 'Investment adviser records must be maintained for a minimum of 5 years, with the first 2 years in the principal office.'
    },
    q16: {
        correct: 'c',
        explanation: 'The three main fiduciary duties are duty of care, duty of loyalty, and duty of obedience. "Duty of profitability" is not a recognized fiduciary duty.'
    },
    q17: {
        correct: 'b',
        explanation: 'Performance-based fees may only be charged to qualified clients who have at least $1 million invested with the adviser or a net worth exceeding $2.5 million.'
    },
    q18: {
        correct: 'c',
        explanation: 'Under the Uniform Securities Act, the statute of limitations for civil liabilities is 3 years from the date of sale or the violation.'
    },
    q19: {
        correct: 'c',
        explanation: 'Unsystematic risk (company-specific risk) can be reduced through diversification. Systematic risk (market risk) cannot be diversified away.'
    },
    q20: {
        correct: 'b',
        explanation: 'Duration measures a bond\'s sensitivity to interest rate changes. The higher the duration, the more sensitive the bond is to rate changes.'
    },
    q21: {
        correct: 'b',
        explanation: 'Custody of client funds is permitted but requires special safeguards including annual surprise audits by independent accountants and use of a qualified custodian.'
    },
    q22: {
        correct: 'c',
        explanation: 'The wash sale rule is 30 days before or after. Selling on Dec 15, the client must wait until at least Jan 15 (31 days later) to avoid the wash sale.'
    },
    q23: {
        correct: 'c',
        explanation: 'By definition, the market has a beta of 1.0. Securities with beta > 1 are more volatile than the market; beta < 1 are less volatile.'
    },
    q24: {
        correct: 'c',
        explanation: 'An adviser may only borrow from a client if the client is a financial institution in the business of lending (e.g., a bank).'
    }
};

// Track user's quiz progress
let quizScores = {
    economics: { attempted: false, score: 0, total: 3 },
    investments: { attempted: false, score: 0, total: 4 },
    recommendations: { attempted: false, score: 0, total: 5 },
    regulations: { attempted: false, score: 0, total: 6 },
    final: { attempted: false, score: 0, total: 6 }
};

// Check answers for a specific section
function checkAnswers(section) {
    const container = document.querySelector(`[data-section="${section}"]`);
    const questions = container.querySelectorAll('.question');
    let score = 0;
    let total = questions.length;

    questions.forEach(question => {
        const questionNum = question.getAttribute('data-question');
        const selectedAnswer = question.querySelector(`input[name="q${questionNum}"]:checked`);
        const feedbackDiv = question.querySelector('.answer-feedback');

        if (!selectedAnswer) {
            feedbackDiv.innerHTML = '<p class="feedback warning">Please select an answer.</p>';
            return;
        }

        const userAnswer = selectedAnswer.value;
        const correctAnswer = answerKey[`q${questionNum}`].correct;
        const explanation = answerKey[`q${questionNum}`].explanation;

        if (userAnswer === correctAnswer) {
            score++;
            feedbackDiv.innerHTML = `
                <p class="feedback correct">✓ Correct!</p>
                <p class="explanation">${explanation}</p>
            `;
            feedbackDiv.classList.add('show');
        } else {
            feedbackDiv.innerHTML = `
                <p class="feedback incorrect">✗ Incorrect. The correct answer is ${correctAnswer.toUpperCase()}.</p>
                <p class="explanation">${explanation}</p>
            `;
            feedbackDiv.classList.add('show');
        }
    });

    // Update quiz scores
    quizScores[section].attempted = true;
    quizScores[section].score = score;
    quizScores[section].total = total;

    // Display score
    const scoreDiv = container.querySelector('.quiz-score');
    const percentage = Math.round((score / total) * 100);
    let scoreClass = 'score-low';
    if (percentage >= 80) scoreClass = 'score-high';
    else if (percentage >= 70) scoreClass = 'score-medium';

    scoreDiv.innerHTML = `
        <div class="score-result ${scoreClass}">
            <h4>Your Score: ${score}/${total} (${percentage}%)</h4>
            <p>${getScoreMessage(percentage)}</p>
        </div>
    `;
    scoreDiv.classList.add('show');

    // Scroll to score
    scoreDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Get encouraging message based on score
function getScoreMessage(percentage) {
    if (percentage >= 90) {
        return 'Excellent! You\'re mastering this material!';
    } else if (percentage >= 80) {
        return 'Great job! You\'re on the right track.';
    } else if (percentage >= 70) {
        return 'Good effort! Review the explanations and try again.';
    } else if (percentage >= 60) {
        return 'Keep studying! Focus on the areas you missed.';
    } else {
        return 'Review the study materials and try again. You can do this!';
    }
}

// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for nav links
    const navLinks = document.querySelectorAll('.nav-link, .study-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Add interactive radio button styling
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    radioInputs.forEach(input => {
        input.addEventListener('change', function() {
            // Clear previous selection highlighting in this question
            const question = this.closest('.question');
            const labels = question.querySelectorAll('label');
            labels.forEach(label => label.classList.remove('selected'));

            // Highlight selected option
            this.closest('label').classList.add('selected');
        });
    });

    // Reset feedback when changing answers
    radioInputs.forEach(input => {
        input.addEventListener('change', function() {
            const question = this.closest('.question');
            const feedback = question.querySelector('.answer-feedback');
            if (feedback.classList.contains('show')) {
                feedback.classList.remove('show');
                feedback.innerHTML = '';
            }
        });
    });
});

// Add progress tracking
function updateOverallProgress() {
    let totalQuestions = 0;
    let answeredCorrectly = 0;
    let attemptedSections = 0;

    Object.keys(quizScores).forEach(section => {
        if (quizScores[section].attempted) {
            attemptedSections++;
            totalQuestions += quizScores[section].total;
            answeredCorrectly += quizScores[section].score;
        }
    });

    if (attemptedSections > 0) {
        const overallPercentage = Math.round((answeredCorrectly / totalQuestions) * 100);
        console.log(`Overall Progress: ${answeredCorrectly}/${totalQuestions} (${overallPercentage}%)`);
    }
}

// Keyboard shortcuts for accessibility
document.addEventListener('keydown', function(e) {
    // Press 'R' to reset current quiz (if you want to add reset functionality)
    if (e.key === 'r' || e.key === 'R') {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            // Add reset functionality if needed
        }
    }
});

// Back to Top Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('backToTop');

    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Scroll to top when button is clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Prevent body scroll while maintaining smooth scrolling
let scrollPosition = 0;
const body = document.body;

// Optimize scroll performance on mobile
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            scrollPosition = window.pageYOffset;
            ticking = false;
        });
        ticking = true;
    }
});

// Add haptic feedback for touch devices (if supported)
if ('vibrate' in navigator) {
    document.querySelectorAll('.check-answers-btn, .nav-link').forEach(element => {
        element.addEventListener('click', function() {
            navigator.vibrate(10); // Very subtle vibration
        });
    });
}
