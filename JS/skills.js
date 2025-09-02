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

    // easing function
    function easeOutQuad(t) {
        return t * (2 - t);
    }

    // animate a card's bars
    function animateCard(card) {
        if (card.dataset.animated === 'true') return; 
        const bars = card.querySelectorAll('.skill-bar');

        bars.forEach(bar => {
            const target = parseInt(bar.dataset.progress, 10) || 0;
            const percentElem = bar.closest('.card-front')?.querySelector('p') || card.querySelector('p');
            const duration = 1500; // مدة أطول شوية علشان يبان التدريج
            const startTime = performance.now();

            // ابدأ من 0
            bar.style.width = '0%';
            if (percentElem) percentElem.textContent = '0%';

            function step(now) {
                const elapsed = now - startTime;
                let t = Math.min(elapsed / duration, 1);
                t = easeOutQuad(t); 
                const value = Math.round(t * target);
                bar.style.width = value + '%';
                if (percentElem) percentElem.textContent = value + '%';

                if (t < 1) {
                    requestAnimationFrame(step);
                }
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
                // obs.unobserve(entry.target); // لو عايز يعيدها كل مرة شيل الكومنت
            }
        });
    }, { threshold: 0.4 });

    cards.forEach(card => observer.observe(card));
});
