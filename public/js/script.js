 document.addEventListener('DOMContentLoaded', () => {
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = document.querySelectorAll('.category-section');

            // Function to show a specific section and activate its nav link
            const showSection = (category) => {
                // Remove active class from all nav links and sections
                navLinks.forEach(link => link.classList.remove('active'));
                sections.forEach(section => section.classList.remove('active'));

                // Add active class to the selected nav link
                const activeNavLink = document.querySelector(`.nav-link[data-category="${category}"]`);
                if (activeNavLink) {
                    activeNavLink.classList.add('active');
                }

                // Add active class to the corresponding section
                const activeSection = document.getElementById(category);
                if (activeSection) {
                    activeSection.classList.add('active');
                }
            };

            // Event listeners for navigation links
            navLinks.forEach(link => {
                link.addEventListener('click', (event) => {
                    event.preventDefault(); // Prevent default link behavior
                    const category = event.target.dataset.category;
                    showSection(category);

                    // Update URL hash without reloading the page
                    window.history.pushState(null, '', `#${category}`);
                });
            });

            // Handle initial page load or direct link to a hash
            const initialHash = window.location.hash.substring(1); // Remove '#'
            if (initialHash) {
                showSection(initialHash);
            } else {
                showSection('home'); // Default to home section if no hash
            }
        });