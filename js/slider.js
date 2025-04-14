document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем все слайдеры на странице
    document.querySelectorAll('.slider-container').forEach(container => {
        new Slider(container);
    });
});

class Slider {
    constructor(container) {
        this.container = container;
        this.slides = container.querySelectorAll('.slide');
        this.dotsContainer = container.querySelector('.dots');
        this.prevBtn = container.querySelector('.prev');
        this.nextBtn = container.querySelector('.next');
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        
        this.init();
    }

    init() {
        this.createDots();
        this.startAutoPlay();
        this.addEventListeners();
    }

    createDots() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
        this.updateDots();
    }

    updateDots() {
        this.dotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    goToSlide(n) {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = (n + this.slides.length) % this.slides.length;
        this.slides[this.currentSlide].classList.add('active');
        this.updateDots();
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.goToSlide(this.currentSlide + 1);
        }, 3000);
    }

    addEventListeners() {
        this.prevBtn.addEventListener('click', () => {
            clearInterval(this.autoPlayInterval);
            this.goToSlide(this.currentSlide - 1);
            this.startAutoPlay();
        });

        this.nextBtn.addEventListener('click', () => {
            clearInterval(this.autoPlayInterval);
            this.goToSlide(this.currentSlide + 1);
            this.startAutoPlay();
        });

        // Пауза при наведении
        this.container.addEventListener('mouseenter', () => 
            clearInterval(this.autoPlayInterval));
        this.container.addEventListener('mouseleave', () => 
            this.startAutoPlay());
    }
}
