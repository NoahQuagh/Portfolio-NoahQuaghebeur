document.addEventListener("DOMContentLoaded", function () {
    const langBtn = document.getElementById("lang-btn");
    const langBubbles = document.querySelectorAll(".lang-bubble");

    if (!langBtn) return;

    langBtn.addEventListener("click", function (e) {
        if (e.target.closest(".lang-bubbles")) return;
        this.classList.toggle("open");
    });

    langBubbles.forEach(bubble => {
        bubble.addEventListener("click", function () {
            const selectedLang = this.getAttribute("data-lang");

            // écrit langue dans un cookie valide 1 an
            document.cookie = `user_lang=${selectedLang}; path=/; max-age=${365 * 86400}; SameSite=Lax`;

            window.location.reload();
        });
    });

    document.addEventListener("click", function (e) {
        if (!langBtn.contains(e.target)) {
            langBtn.classList.remove("open");
        }
    });
});