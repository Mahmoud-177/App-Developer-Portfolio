const projects = document.querySelectorAll(".project-card");
const overlay = document.querySelector(".overlay");
const details = document.querySelectorAll(".project-details"); // هنا من الـ document كله

projects.forEach(project => {
    const btn = project.querySelector(".btn");
    const num = btn.getAttribute("data-num"); // جاي من HTML data-btn

    btn.addEventListener("click", () => {
        details[num - 1].classList.toggle("shown");
        overlay.classList.toggle("shown");
    });
    overlay.addEventListener("click", _ => {
        details.forEach((d) => d.classList.remove("shown"))
        overlay.classList.remove("shown")
    })
});
