document.addEventListener('DOMContentLoaded', () => {
    // Add the render class after a short delay to trigger fade-in
    setTimeout(() => {
        document.body.classList.add('render')
    }, 60);

    // Select all navigation links
    const navdemos = Array.from(document.querySelectorAll('nav.demos > .demo'));

    // Navigation function
    const navigate = (linkEl) => {
        // Remove the render class to trigger fade-out
        document.body.classList.remove('render')
        document.body.classList.add('fade-out')

        // Listen for the end of the transition and navigate to the target URL
        document.body.addEventListener('transitionend', () => {
            window.location = linkEl.dataset.href;
        }, { once: true }); // Ensure execution only happens once
    };

    // Attach click event listeners to all navigation links
    navdemos.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            navigate(event.currentTarget);
        });
    });
});