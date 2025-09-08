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

    const bars = document.querySelectorAll(".skill-bar")
    const counters = document.querySelectorAll(".skill-bar-cont + p")

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            let target = parseInt(entry.target.dataset.progress)
            let counterEl = counters[i]

            // ✅ حرك العرض
            entry.target.style.width = target + "%"

            // ✅ عدّاد الرقم
            let count = 0
            let step = Math.ceil(target / 50) // 50 خطوة تقريبًا
            let interval = setInterval(() => {
            count += step
            if (count >= target) {
                count = target
                clearInterval(interval)
            }
            counterEl.textContent = count + "%"
            }, 2500 / target) // كل 30ms
        observer.unobserve(entry.target)
        }
        })
    }, { threshold: 0.3 })

    bars.forEach(bar => observer.observe(bar))
});
