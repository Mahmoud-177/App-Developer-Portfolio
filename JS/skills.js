document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.cards-grid .card');
    if (!cards.length) {
        console.warn('No .card elements found. Check your selectors.');
        return;
    }
    const skillBars = document.querySelectorAll(".skill-bar");

    skillBars.forEach(bar => {
    const target = parseInt(bar.dataset.progress); // الرقم اللي في data-progress
    let width = 0;

    // امسك العنصر <p> اللي بعد الـbar
    const percentText = bar.parentElement.nextElementSibling;

    const interval = setInterval(() => {
        if (width >= target) {
            clearInterval(interval);
        } else {
            width++;
            bar.style.width = width + "%";
            percentText.textContent = width + "%";
        }
    }, 2000 / target); // كل 20ms يزود 1%
});

    // flip عند الكليك
    cards.forEach(card => {
        card.addEventListener('click', () => card.classList.toggle('flipped'));
    });

    // animate a card's bars (uses requestAnimationFrame for smoothness)
    function animateCard(card) {
        if (card.dataset.animated === 'true') return; // لو اتعملت قبل كده
        const bars = card.querySelectorAll('.skill-bar');

        bars.forEach(bar => {
        const target = parseInt(bar.dataset.progress, 10) || 0;
        const percentElem = bar.closest('.card-front')?.querySelector('p') || card.querySelector('p');
        const duration = 800; // مدة الأنيميشن بالملي ثانية
        const startTime = performance.now();

        // تأكد البداية 0
        bar.style.width = '0%';
        if (percentElem) percentElem.textContent = '0%';

        function step(now) {
            const elapsed = now - startTime;
            const t = Math.min(elapsed / duration, 1);
            const value = Math.round(t * target);
            bar.style.width = value + '%';
            if (percentElem) percentElem.textContent = value + '%';
            if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        });

        card.dataset.animated = 'true'; // مجرد مرّة وحدة
    }

    // IntersectionObserver
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCard(entry.target);
            obs.unobserve(entry.target); // لو عايز يعمل كل مرة اشطب السطر ده
        }
        });
    }, { threshold: 0.4 });

    // راقب كل كارت
    cards.forEach(card => observer.observe(card));
});
