document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.cards-grid .card');
    if (!cards.length) {
        console.warn('No .card elements found. Check your selectors.');
        return;
    }

    // flip عند الكليك
    cards.forEach(card => {
        card.addEventListener('click', () => card.classList.toggle('flipped'));
    });

    // animate a card's bars (smooth باستخدام requestAnimationFrame)
    function animateCard(card) {
        if (card.dataset.animated === 'true') return; // لو اتعملت قبل كده
        const bars = card.querySelectorAll('.skill-bar');

        bars.forEach(bar => {
            const target = parseInt(bar.dataset.progress, 10) || 0;
            const percentElem = bar.closest('.card-front')?.querySelector('p') || card.querySelector('p');
            const duration = 1200; // مدة الأنيميشن بالملي ثانية
            const startTime = performance.now();

            // ابدأ من 0
            bar.style.width = '0%';
            if (percentElem) percentElem.textContent = '0%';

            function step(now) {
                const elapsed = now - startTime;
                const t = Math.min(elapsed / duration, 1); // من 0 لـ 1
                const value = Math.round(t * target);
                bar.style.width = value + '%';
                if (percentElem) percentElem.textContent = value + '%';
                if (t < 1) requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
        });

        card.dataset.animated = 'true';
    }

    // IntersectionObserver
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCard(entry.target);
                obs.unobserve(entry.target); // لو عايز يعيدها كل مرة شيل السطر ده
            }
        });
    }, { threshold: 0.4 });

    // راقب كل كارت
    cards.forEach(card => observer.observe(card));
});
