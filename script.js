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
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    alert('Thanks for joining our waitlist! We\'ll be in touch soon.');
    form.reset();
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