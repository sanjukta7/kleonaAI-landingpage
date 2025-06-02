// Smooth scroll for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Highlight active section in navigation
const observeSection = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
};

const sectionObserver = new IntersectionObserver(observeSection, {
    threshold: 0.5
});

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Protein structure symbols
const helixSymbols = ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ'];
const sheetSymbols = ['∏', '∑', '∫', '∮', '∴', '∵', '⊂', '⊃'];
const loopSymbols = ['∞', '≈', '≠', '≡', '∈', '∉', '∋', '∅'];

// Create protein structure
const createProteinStructure = () => {
    const structures = {
        'structure-A': {
            pattern: [
                { type: 'helix', count: 8 },
                { type: 'sheet', count: 12 },
                { type: 'loop', count: 6 },
                { type: 'helix', count: 10 }
            ]
        },
        'structure-B': {
            pattern: [
                { type: 'helix', count: 12 },
                { type: 'loop', count: 8 },
                { type: 'sheet', count: 10 },
                { type: 'helix', count: 6 }
            ]
        },
        'structure-C': {
            pattern: [
                { type: 'sheet', count: 10 },
                { type: 'loop', count: 6 },
                { type: 'helix', count: 12 },
                { type: 'sheet', count: 8 }
            ]
        },
        'structure-D': {
            pattern: [
                { type: 'helix', count: 10 },
                { type: 'sheet', count: 8 },
                { type: 'loop', count: 6 },
                { type: 'helix', count: 12 }
            ]
        }
    };

    Object.entries(structures).forEach(([id, config]) => {
        const container = document.getElementById(id).querySelector('.symbol-row');
        
        config.pattern.forEach(segment => {
            const symbolSet = segment.type === 'helix' ? helixSymbols :
                            segment.type === 'sheet' ? sheetSymbols : loopSymbols;
            
            for (let i = 0; i < segment.count; i++) {
                const symbol = document.createElement('div');
                symbol.className = `symbol ${segment.type}`;
                symbol.textContent = symbolSet[i % symbolSet.length];
                symbol.style.transform = `translateZ(${Math.random() * 40}px)`;
                container.appendChild(symbol);
            }
        });
    });
};

// Initialize protein structure when the page loads
window.addEventListener('load', createProteinStructure);

// Add animation to feature cards when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Form submission handling
const form = document.querySelector('.contact-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    const submitButton = form.querySelector('.submit-button');
    const originalButtonText = submitButton.textContent;
    
    try {
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;

        // Encode the data as URL parameters
        const params = new URLSearchParams({
            email: email,
            timestamp: new Date().toISOString()
        });

        console.log('Sending request with params:', params.toString());

        // REPLACE THIS URL WITH YOUR NEW WEB APP URL
        const response = await fetch(`https://script.google.com/macros/s/AKfycbxpUJtWRT1Vt_ocbFUKsm0yVLSJJZkU3cS48WAbVvN2PNznHQUiRoc3FFgZx8z9A1WZ/exec?${params.toString()}`, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json'
            }
        });

        console.log('Response received:', response);

        // Add a small delay to ensure the data is processed
        await new Promise(resolve => setTimeout(resolve, 1000));

        alert('Thanks for joining our waitlist! We\'ll be in touch soon.');
        form.reset();
    } catch (error) {
        console.error('Detailed error:', error);
        alert('Sorry, there was an error submitting your email. Please try again.');
    } finally {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
});

// Add particle effect to hero section
const createParticle = () => {
    const hero = document.querySelector('.hero');
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = Math.random() * 3 + 2 + 's';
    hero.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 5000);
};

setInterval(createParticle, 300); 