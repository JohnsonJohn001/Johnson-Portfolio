
    /* ── CURSOR ── */
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    let mx = -200, my = -200, rx = -200, ry = -200;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    (function animateCursor() {
      rx += (mx - rx) * .14;
      ry += (my - ry) * .14;
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animateCursor);
    })();

    document.querySelectorAll('a, button, .project-card, .skill-pill, .stat-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.width  = '54px';
        ring.style.height = '54px';
        ring.style.borderColor = 'rgba(0,255,200,.6)';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.width  = '36px';
        ring.style.height = '36px';
        ring.style.borderColor = 'rgba(99,210,255,.5)';
      });
    });

    /* ── TYPEWRITER ── */
    const words = ['web future', 'next big app', 'digital world', 'clean UI', 'open web'];
    let wi = 0, ci = 0, deleting = false;
    const el = document.getElementById('typed-text');

    function type() {
      const word = words[wi];
      if (!deleting) {
        el.textContent = word.slice(0, ++ci);
        if (ci === word.length) { deleting = true; setTimeout(type, 1400); return; }
        setTimeout(type, 75);
      } else {
        el.textContent = word.slice(0, --ci);
        if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; setTimeout(type, 300); return; }
        setTimeout(type, 40);
      }
    }
    setTimeout(type, 1200);

    /* ── SCROLL REVEAL ── */
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    /* ── COUNT-UP ── */
    const numObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = +el.dataset.target;
        const suffix = el.dataset.suffix || '';
        let cur = 0;
        const step = Math.ceil(target / 40);
        const id = setInterval(() => {
          cur = Math.min(cur + step, target);
          el.textContent = cur + suffix;
          if (cur >= target) clearInterval(id);
        }, 35);
        numObserver.unobserve(el);
      });
    }, { threshold: .5 });

    document.querySelectorAll('.stat-num[data-target]').forEach(el => numObserver.observe(el));

    /* ── FORM SUBMIT ── */
    function handleSubmit(btn) {
      btn.textContent = '✓ Message sent!';
      btn.style.background = 'linear-gradient(135deg, #00ffc8, #00b894)';
      setTimeout(() => {
        btn.innerHTML = '<span>→</span> Send message';
        btn.style.background = '';
      }, 3000);
    }

    /* ── HAMBURGER (mobile) ── */
    document.querySelector('.hamburger').addEventListener('click', function() {
      const links = document.querySelector('.nav-links');
      if (links.style.display === 'flex') {
        links.style.display = '';
      } else {
        links.style.cssText = 'display:flex;flex-direction:column;position:fixed;top:70px;left:0;right:0;background:#050810;padding:2rem 8vw;border-bottom:1px solid rgba(99,210,255,.12);gap:1.5rem;z-index:99;';
      }
    });
  