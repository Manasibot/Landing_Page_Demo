document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial Split Text Logic with better wrapping
    const splitText = (selector) => {
        const element = document.querySelector(selector);
        if (!element) return;
        const text = element.innerHTML;
        const lines = text.split('<br>');
        element.innerHTML = lines.map(line =>
            `<div class="line" style="overflow: hidden;">` +
            line.split('').map(char =>
                `<span class="char" style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`
            ).join('') +
            `</div>`
        ).join('');
    };

    splitText('#main-title');

    // Hero Entry Sequence
    const heroTl = gsap.timeline();

    heroTl.set('.hero-content', { opacity: 1 })
        .from('.char', {
            y: '100%',
            stagger: 0.03,
            duration: 1.2,
            ease: 'expo.out'
        })
        .from('.label', {
            opacity: 0,
            x: -20,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.8')
        .from('.hero-subtext', {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-image-container', {
            clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
            scale: 1.5,
            duration: 2,
            ease: 'expo.inOut'
        }, '-=1.2');

    // Scroll Reveal for sections
    gsap.utils.toArray('.phi-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            delay: i * 0.2,
            ease: 'power4.out'
        });
    });

    // Geometric reveal for faculty images
    gsap.utils.toArray('.faculty-image').forEach((img, i) => {
        gsap.from(img, {
            scrollTrigger: {
                trigger: img,
                start: 'top 80%'
            },
            clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)',
            scale: 1.2,
            duration: 1.5,
            ease: 'expo.inOut'
        });
    });

    // CTA Reveal
    gsap.from('.cta-box', {
        scrollTrigger: {
            trigger: '.cta-box',
            start: 'top 80%'
        },
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        ease: 'expo.out'
    });
});
