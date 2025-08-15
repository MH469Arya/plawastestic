document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Statistics counter animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            
            const inc = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCount();
    });

    // 3D Workshop functionality - Fixed
    const launch3DWorkshopBtn = document.getElementById('launch-3d-workshop');
    console.log('Button found:', launch3DWorkshopBtn); // Debug log

    if (launch3DWorkshopBtn) {
        launch3DWorkshopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Workshop button clicked!');
            
            // Navigate to workshop.html
            window.location.href = 'workshop.html';
        });
        
        // Also add a backup click handler
        launch3DWorkshopBtn.onclick = function(e) {
            e.preventDefault();
            console.log('Backup click handler triggered');
            window.location.href = 'workshop.html';
        };
    } else {
        console.error('Launch button not found!');
    }

    // Demo preview click handler
    const demoPreview = document.querySelector('.demo-preview');
    if (demoPreview) {
        demoPreview.addEventListener('click', () => {
            console.log('Demo preview clicked');
            if (launch3DWorkshopBtn) {
                launch3DWorkshopBtn.click();
            }
        });
    }
});

