document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    let form = e.target;
    let isValid = true;
    let formMessage = document.getElementById("formMessage");
    formMessage.textContent = "";
    formMessage.style.color = "";

    // امسح الأخطاء القديمة
    form.querySelectorAll(".error").forEach(el => el.textContent = "");

    // Validation بسيط
    form.querySelectorAll("input[placeholder=' ']").forEach(input => {
        if (input.value.trim() === "") {
        isValid = false;
        input.parentElement.querySelector(".error").textContent = input.labels[0].innerText + " is required";
        }
        if (input.type === "email" && input.value.trim() !== "") {
        let emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailRegex.test(input.value)) {
            isValid = false;
            input.parentElement.querySelector(".error").textContent = "Enter a valid email";
        }
        }
    });

    if (!isValid) return;

    // ابعت الفورم
    let formData = new FormData(form);
    try {
        let res = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: "application/json" }
        });

        if (res.ok) {
        formMessage.textContent = "✅ Your message has been sent successfully!";
        formMessage.style.color = "green";
        form.reset();
        } else {
        formMessage.textContent = "❌ There was a problem, please try again.";
        formMessage.style.color = "red";
        }
    } catch (err) {
        formMessage.textContent = "⚠️ Network error, try again later.";
        formMessage.style.color = "red";
    }
});