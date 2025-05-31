class BubbleGame {
    constructor() {
        this.timer = 60;
        this.score = 0;
        this.target = 0;
        this.gameActive = true;
        this.timerInterval = null;

        this.elements = {
            target: document.getElementById('target'),
            timer: document.getElementById('timer'),
            score: document.getElementById('score'),
            gameArea: document.getElementById('gameArea')
        };

        this.init();
    }

    init() {
        this.generateTarget();
        this.createBubbles();
        this.startTimer();
        this.addEventListeners();
    }

    generateTarget() {
        this.target = Math.floor(Math.random() * 10);
        this.elements.target.textContent = this.target;
    }

    createBubbles() {
        const bubbleCount = 63;
        let bubblesHTML = '';

        for (let i = 0; i < bubbleCount; i++) {
            const number = Math.floor(Math.random() * 10);
            bubblesHTML += `<div class="bubble" data-number="${number}" style="--i: ${i}">${number}</div>`;
        }

        this.elements.gameArea.innerHTML = bubblesHTML;
    }

    startTimer() {
        this.updateTimer();
        this.timerInterval = setInterval(() => {
            this.timer--;
            this.updateTimer();

            if (this.timer <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    updateTimer() {
        this.elements.timer.textContent = this.timer;
        if (this.timer <= 10) {
            this.elements.timer.style.background = 'rgba(255, 82, 82, 0.4)';
            this.elements.timer.style.animation = 'urgentPulse 0.5s infinite';
            this.elements.timer.style.borderColor = '#fc8181';
        } else {
            this.elements.timer.style.background = 'rgba(255, 255, 255, 0.25)';
            this.elements.timer.style.animation = 'statPulse 2s ease-in-out infinite';
            this.elements.timer.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        }
    }

    addEventListeners() {
        this.elements.gameArea.addEventListener('click', (e) => {
            if (!this.gameActive || !e.target.classList.contains('bubble')) return;

            const clickedNumber = parseInt(e.target.dataset.number);

            if (clickedNumber === this.target) {
                this.handleCorrectClick(e.target);
            }
        });
    }

    handleCorrectClick(bubble) {
        bubble.classList.add('correct');
        this.score += 10;
        this.elements.score.textContent = this.score;

        setTimeout(() => {
            this.generateTarget();
            this.createBubbles();
        }, 200);
    }

    endGame() {
        this.gameActive = false;
        clearInterval(this.timerInterval);

        this.elements.gameArea.innerHTML = `
                    <div class="game-over">
                        <h1>🎯 Game Over!</h1>
                        <div class="final-score">Final Score: ${this.score}</div>
                        <button class="restart-btn" onclick="location.reload()">Play Again</button>
                    </div>
                `;
    }
}
new BubbleGame();
