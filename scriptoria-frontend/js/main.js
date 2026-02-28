// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({ behavior: "smooth" });
    });
});

// Navbar shadow on scroll
window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    if(window.scrollY > 50){
        header.style.boxShadow = "0 2px 10px rgba(255,165,0,0.3)";
    } else {
        header.style.boxShadow = "none";
    }
});