// Image Slideshow
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Change slide every 3 seconds
setInterval(nextSlide, 3000);

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    // Form validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex

    if (name === "" || email === "" || message === "") {
        formFeedback.textContent = "Please fill in all fields.";
        formFeedback.style.color = "red";
    } else if (!emailPattern.test(email)) {
        formFeedback.textContent = "Please enter a valid email address.";
        formFeedback.style.color = "red";
    } else {
        formFeedback.textContent = "Message sent successfully!";
        formFeedback.style.color = "green";
        contactForm.reset();
    }
});
