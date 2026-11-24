(() => {
  'use strict';

  const DEMO_RSVP_WA = '919876543210';

  const EVENTS = [
    {
      num: '01',
      date: '2026-12-15',
      dayNum: '15',
      monthYear: 'December 2026',
      time: '10:00 AM',
      title: 'Nalangu & Haldi',
      desc: 'A sunlit South Indian morning of auspicious turmeric, joyful songs, jasmine petals, and warm family blessings.',
      venue: 'TEMPLE COURTYARD, TAJ COROMANDEL',
      mapQuery: 'Taj Coromandel Nungambakkam Chennai',
      img: 'assets/event-nalangu.jpg',
    },
    {
      num: '02',
      date: '2026-12-15',
      dayNum: '15',
      monthYear: 'December 2026',
      time: '5:30 PM',
      title: 'Mehendi Soirée',
      desc: 'Intricate henna artistry, rhythmic nadaswaram melodies, laughter, and the first vibrant hues of our celebration.',
      venue: 'LOTUS PAVILION, TAJ COROMANDEL',
      mapQuery: 'Taj Coromandel Nungambakkam Chennai',
      img: 'assets/event-mehendi.jpg',
    },
    {
      num: '03',
      date: '2026-12-16',
      dayNum: '16',
      monthYear: 'December 2026',
      time: '11:00 AM',
      title: 'Nichayathartham & Vratham',
      desc: 'Sacred betrothal amidst brass tambulam platters, Kanjeevaram silks, coconuts, and heartfelt ancestral blessings.',
      venue: 'KALYANA MANDAPAM, TAJ COROMANDEL',
      mapQuery: 'Taj Coromandel Nungambakkam Chennai',
      img: 'assets/event-nichayathartham.svg',
    },
    {
      num: '04',
      date: '2026-12-16',
      dayNum: '16',
      monthYear: 'December 2026',
      time: '7:30 PM',
      title: 'Sangeet & Carnatic Gala',
      desc: 'An enchanting evening of Carnatic fusion, dazzling family dances, and celebration beneath warm temple lights.',
      venue: 'GRAND BALLROOM, TAJ COROMANDEL',
      mapQuery: 'Taj Coromandel Nungambakkam Chennai',
      img: 'assets/event-sangeet.jpg',
    },
    {
      num: '05',
      date: '2026-12-17',
      dayNum: '17',
      monthYear: 'December 2026',
      time: '9:15 AM',
      title: 'Muhurtham (Kalyanam)',
      desc: 'Join us for Kashi Yatra, Oonjal, Maalai Maatral, and sacred Mangalya Dharanam vows for our new beginning.',
      venue: 'SRI KALYANA MANDAPAM, TAJ COROMANDEL',
      mapQuery: 'Taj Coromandel Nungambakkam Chennai',
      img: 'assets/event-muhurtham.jpg',
    },
    {
      num: '06',
      date: '2026-12-17',
      dayNum: '17',
      monthYear: 'December 2026',
      time: '7:30 PM',
      title: 'Grand Reception & Sadhya',
      desc: 'An elegant evening dinner, heartfelt toasts, and blessings to celebrate the newlyweds Swathi & Lokesh.',
      venue: 'IMPERIAL BALLROOM, TAJ COROMANDEL',
      mapQuery: 'Taj Coromandel Nungambakkam Chennai',
      img: 'assets/event-reception.jpg',
    },
  ];

  const GALLERY_PHOTOS = [
    { src: 'assets/gallery-1.jpg', caption: 'Golden hour promises together' },
    { src: 'assets/gallery-2.jpg', caption: 'Walking hand-in-hand toward forever' },
    { src: 'assets/gallery-3.jpg', caption: 'Laughter, silk & timeless love' },
    { src: 'assets/gallery-4.jpg', caption: 'Quiet moments before the vows' },
    { src: 'assets/gallery-5.jpg', caption: 'Wrapped in jasmine garlands & grace' },
  ];

  // =========================================================
  // 1. OPENING VIDEO INTRO (TAP TO OPEN -> PLAY -> REVEAL MAIN)
  // =========================================================
  const introOverlay = document.getElementById('introOverlay');
  const introVideo = document.getElementById('introVideo');
  const introTapCover = document.getElementById('introTapCover');
  const openInviteBtn = document.getElementById('openInviteBtn');
  const introMuteBtn = document.getElementById('introMuteBtn');
  const introSkipBtn = document.getElementById('introSkipBtn');
  const inviteMain = document.getElementById('inviteMain');
  const previewBar = document.getElementById('previewBar');
  const replayIntroBtn = document.getElementById('replayIntroBtn');
  const heroSection = document.getElementById('sec-hero');
  let introFinished = false;

  function syncMuteLabel() {
    introMuteBtn.textContent = introVideo.muted ? 'Muted' : 'Sound On';
    introMuteBtn.setAttribute('aria-label', introVideo.muted ? 'Unmute intro video' : 'Mute intro video');
  }

  function finishIntro() {
    if (introFinished) return;
    introFinished = true;

    introVideo.pause();
    introOverlay.classList.add('is-finished');
    document.body.classList.remove('intro-locked');
    inviteMain.setAttribute('aria-hidden', 'false');
    heroSection.classList.add('is-visible');
    previewBar.hidden = false;
    requestAnimationFrame(() => previewBar.classList.add('is-visible'));
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function startIntroVideo() {
    if (introFinished || introOverlay.classList.contains('is-playing')) return;

    introOverlay.classList.add('is-playing');
    introVideo.currentTime = 0;
    introVideo.muted = false;
    syncMuteLabel();

    const playPromise = introVideo.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Fallback to muted playback if browser blocks unmuted play
        introVideo.muted = true;
        syncMuteLabel();
        introVideo.play().catch(finishIntro);
      });
    }
  }

  function replayIntroVideo() {
    introFinished = false;
    previewBar.classList.remove('is-visible');
    setTimeout(() => {
      previewBar.hidden = true;
    }, 300);

    window.scrollTo({ top: 0, behavior: 'auto' });
    introVideo.pause();
    introVideo.currentTime = 0;
    introOverlay.classList.remove('is-finished', 'is-playing');
    document.body.classList.add('intro-locked');
    inviteMain.setAttribute('aria-hidden', 'true');
  }

  openInviteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    startIntroVideo();
  });

  introTapCover.addEventListener('click', startIntroVideo);
  introTapCover.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      startIntroVideo();
    }
  });

  introMuteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    introVideo.muted = !introVideo.muted;
    syncMuteLabel();
  });

  introSkipBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    finishIntro();
  });

  introVideo.addEventListener('ended', finishIntro);
  introVideo.addEventListener('error', finishIntro);

  replayIntroBtn.addEventListener('click', replayIntroVideo);

  // =========================================================
  // 2. SECTION REVEAL OBSERVER & ACTIVE NAV DOTS
  // =========================================================
  const sections = document.querySelectorAll('.reveal-section');
  const navDots = document.querySelectorAll('.nav-dot');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          const id = entry.target.id;
          navDots.forEach((dot) => {
            dot.classList.toggle('active', dot.dataset.sec === id);
          });
        }
      });
    },
    { threshold: 0.14, rootMargin: '-4% 0px' }
  );

  sections.forEach((sec) => sectionObserver.observe(sec));

  // Smooth scroll parallax: Hero title glides behind temple gopuram cutout
  const heroParallaxTitle = document.getElementById('heroParallaxTitle');
  const dioramaImg = document.getElementById('dioramaImg');
  const closingMountainsImg = document.getElementById('closingMountainsImg');
  let parallaxPending = false;

  function updateParallax() {
    parallaxPending = false;
    const scrollY = window.scrollY || window.pageYOffset;

    if (heroParallaxTitle) {
      const heroH = heroSection.offsetHeight || window.innerHeight;
      const clamped = Math.min(scrollY, heroH);
      const shift = clamped * 0.42;
      const fade = Math.max(0, 1 - clamped / (heroH * 0.65));
      heroParallaxTitle.style.transform = `translate3d(0, ${shift}px, 0)`;
      heroParallaxTitle.style.opacity = fade.toFixed(3);
    }

    if (dioramaImg) {
      const rect = dioramaImg.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      if (progress > 0 && progress < 1) {
        const scale = 1.04 - progress * 0.04;
        dioramaImg.style.transform = `scale(${scale.toFixed(4)})`;
      }
    }

    if (closingMountainsImg) {
      const rect = closingMountainsImg.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      if (progress > 0 && progress < 1) {
        const lift = (0.5 - progress) * 18;
        closingMountainsImg.style.transform = `translate3d(0, ${lift.toFixed(1)}px, 0) scale(1.03)`;
      }
    }
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!parallaxPending) {
        parallaxPending = true;
        requestAnimationFrame(updateParallax);
      }
    },
    { passive: true }
  );

  // =========================================================
  // 3. INTERACTIVE DECEMBER 2026 CALENDAR WIDGET
  // =========================================================
  const calendarGrid = document.getElementById('calendarGrid');
  const calDayPreview = document.getElementById('calDayPreview');
  const downloadIcsBtn = document.getElementById('downloadIcsBtn');

  // December 1, 2026 is Tuesday (index 2 in SUN..SAT), 31 days total
  const DEC_2026_START_COL = 2;
  const DEC_2026_DAYS = 31;
  const EVENT_DATES = new Set(['2026-12-15', '2026-12-16', '2026-12-17']);
  let selectedDate = '2026-12-17';

  function renderCalendar() {
    calendarGrid.innerHTML = '';

    for (let i = 0; i < DEC_2026_START_COL; i += 1) {
      const empty = document.createElement('span');
      empty.className = 'cal-cell';
      calendarGrid.appendChild(empty);
    }

    for (let d = 1; d <= DEC_2026_DAYS; d += 1) {
      const iso = `2026-12-${String(d).padStart(2, '0')}`;
      const isEvent = EVENT_DATES.has(iso);
      const cell = document.createElement(isEvent ? 'button' : 'span');
      cell.textContent = d;
      cell.className = 'cal-cell';

      if (isEvent) {
        cell.type = 'button';
        cell.classList.add('is-event');
        if (iso === '2026-12-17') cell.classList.add('is-wedding-main');
        if (iso === selectedDate) cell.classList.add('is-selected');
        cell.setAttribute('aria-label', `December ${d}, 2026 celebrations`);
        cell.addEventListener('click', () => {
          selectedDate = iso;
          renderCalendar();
          renderCalendarDayPreview(iso);
        });
      }

      calendarGrid.appendChild(cell);
    }
  }

  function renderCalendarDayPreview(iso) {
    const labels = {
      '2026-12-15': 'Tuesday, Dec 15 · Day 1 — Nalangu & Mehendi',
      '2026-12-16': 'Wednesday, Dec 16 · Day 2 — Nichayathartham & Sangeet',
      '2026-12-17': 'Thursday, Dec 17 · Day 3 — Shubh Muhurtham & Reception',
    };
    const dayEvents = EVENTS.filter((ev) => ev.date === iso);
    calDayPreview.innerHTML = `
      <p class="cal-preview-head">${labels[iso]}</p>
      ${dayEvents
        .map(
          (ev) => `
        <div class="cal-preview-item">
          <strong>${ev.title}</strong>
          <span>${ev.time}</span>
        </div>
      `
        )
        .join('')}
    `;
  }

  downloadIcsBtn.addEventListener('click', () => {
    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//SwathiLokeshWedding//Chennai//EN',
      'BEGIN:VEVENT',
      'UID:swathi-lokesh-2026@chennai',
      'DTSTAMP:20261124T120000Z',
      'DTSTART;VALUE=DATE:20261215',
      'DTEND;VALUE=DATE:20261218',
      'SUMMARY:Swathi & Lokesh South Indian Wedding',
      'DESCRIPTION:Nalangu, Mehendi, Nichayathartham, Sangeet, Muhurtham & Grand Reception at Taj Coromandel, Chennai.',
      'LOCATION:Taj Coromandel, Nungambakkam, Chennai',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsLines], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Swathi-Lokesh-Wedding-Dec2026.ics';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  });

  renderCalendar();
  renderCalendarDayPreview(selectedDate);

  // =========================================================
  // 4. 6 SOUTH INDIAN EVENTS LIST & DAY TABS
  // =========================================================
  const eventsList = document.getElementById('eventsList');
  const dayTabs = document.querySelectorAll('.day-tab');

  function renderEvents(dayFilter) {
    const list = dayFilter === 'all' ? EVENTS : EVENTS.filter((ev) => ev.date === dayFilter);
    eventsList.innerHTML = list
      .map(
        (ev, idx) => `
      <article class="event-card anim-rise is-visible" style="animation-delay: ${idx * 0.06}s">
        <div class="event-art-wrap">
          <img src="${ev.img}" alt="${ev.title}" class="event-art-img" loading="lazy" />
          <span class="event-num-badge">${ev.num}</span>
        </div>
        <div class="event-body">
          <p class="event-kicker">CELEBRATION</p>
          <h4 class="event-title">${ev.title}</h4>
          <p class="event-desc">${ev.desc}</p>
          <div class="event-pills">
            <div class="event-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>${ev.dayNum} ${ev.monthYear}</span>
            </div>
            <div class="event-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 15.5 14" />
              </svg>
              <span>${ev.time}</span>
            </div>
            <div class="event-pill full">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" aria-hidden="true">
                <path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 1 1 13 0c0 5.2-6.5 11-6.5 11z" />
                <circle cx="12" cy="10" r="2.2" />
              </svg>
              <span>${ev.venue}</span>
            </div>
          </div>
          <a
            class="event-map-btn"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ev.mapQuery)}"
          >
            <span>View Location</span>
          </a>
        </div>
      </article>
    `
      )
      .join('');
  }

  dayTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      dayTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      renderEvents(tab.dataset.day);
    });
  });

  renderEvents('all');

  // =========================================================
  // 5. ORNATE GOLD-FRAMED 5-PHOTO GALLERY + LIGHTBOX
  // =========================================================
  const galleryFrameWrap = document.getElementById('galleryFrameWrap');
  const galleryMainImg = document.getElementById('galleryMainImg');
  const galleryOpenLightbox = document.getElementById('galleryOpenLightbox');
  const galPrevBtn = document.getElementById('galPrevBtn');
  const galNextBtn = document.getElementById('galNextBtn');
  const galDots = document.getElementById('galDots');
  const galThumbStrip = document.getElementById('galThumbStrip');
  const galCaption = document.getElementById('galCaption');

  const lightboxModal = document.getElementById('lightboxModal');
  const lbImg = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');
  const lbCounter = document.getElementById('lbCounter');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');

  let activeSlide = 0;
  let touchStartX = 0;

  function renderGalleryControls() {
    galDots.innerHTML = GALLERY_PHOTOS.map(
      (_, i) =>
        `<button type="button" class="gal-dot${i === activeSlide ? ' active' : ''}" data-idx="${i}" aria-label="Photo ${i + 1}"></button>`
    ).join('');

    galThumbStrip.innerHTML = GALLERY_PHOTOS.map(
      (p, i) =>
        `<button type="button" class="gal-thumb${i === activeSlide ? ' active' : ''}" data-idx="${i}" aria-label="Show ${p.caption}">
          <img src="${p.src}" alt="${p.caption}" loading="lazy" />
        </button>`
    ).join('');

    galDots.querySelectorAll('.gal-dot').forEach((btn) => {
      btn.addEventListener('click', () => setSlide(Number(btn.dataset.idx)));
    });
    galThumbStrip.querySelectorAll('.gal-thumb').forEach((btn) => {
      btn.addEventListener('click', () => setSlide(Number(btn.dataset.idx)));
    });
  }

  function setSlide(idx) {
    activeSlide = (idx + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
    const item = GALLERY_PHOTOS[activeSlide];
    galleryMainImg.classList.add('is-switching');
    setTimeout(() => {
      galleryMainImg.src = item.src;
      galleryMainImg.alt = item.caption;
      galleryMainImg.classList.remove('is-switching');
    }, 150);
    galCaption.textContent = `${activeSlide + 1} / ${GALLERY_PHOTOS.length} · ${item.caption}`;
    renderGalleryControls();
  }

  function openLightbox(idx) {
    activeSlide = (idx + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
    const item = GALLERY_PHOTOS[activeSlide];
    lbImg.src = item.src;
    lbImg.alt = item.caption;
    lbCaption.textContent = item.caption;
    lbCounter.textContent = `${activeSlide + 1} / ${GALLERY_PHOTOS.length}`;
    lightboxModal.hidden = false;
  }

  galPrevBtn.addEventListener('click', () => setSlide(activeSlide - 1));
  galNextBtn.addEventListener('click', () => setSlide(activeSlide + 1));

  galleryFrameWrap.addEventListener('click', (e) => {
    if (e.target === galleryOpenLightbox || e.target === galleryMainImg) {
      openLightbox(activeSlide);
    }
  });
  galleryOpenLightbox.addEventListener('click', (e) => {
    e.stopPropagation();
    openLightbox(activeSlide);
  });

  galleryFrameWrap.addEventListener(
    'touchstart',
    (e) => {
      touchStartX = e.changedTouches[0].clientX;
    },
    { passive: true }
  );
  galleryFrameWrap.addEventListener(
    'touchend',
    (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        setSlide(dx < 0 ? activeSlide + 1 : activeSlide - 1);
      }
    },
    { passive: true }
  );

  lbClose.addEventListener('click', () => (lightboxModal.hidden = true));
  lbPrev.addEventListener('click', () => openLightbox(activeSlide - 1));
  lbNext.addEventListener('click', () => openLightbox(activeSlide + 1));
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) lightboxModal.hidden = true;
  });

  renderGalleryControls();

  // =========================================================
  // 6. WHATSAPP RSVP FORM
  // =========================================================
  const rsvpForm = document.getElementById('rsvpForm');
  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('rsvpName').value.trim() || 'Guest';
    const status = document.getElementById('rsvpStatus').value;
    const guests = document.getElementById('rsvpGuests').value;
    const note = document.getElementById('rsvpNote').value.trim();
    const checked = Array.from(rsvpForm.querySelectorAll('.rsvp-checks input:checked')).map(
      (el) => el.value
    );

    const lines = [
      'Vanakkam Swathi & Lokesh! 🌸',
      `RSVP from: *${name}*`,
      `Response: *${status}*`,
      `Guests: *${guests}*`,
      checked.length ? `Celebrations: ${checked.join(', ')}` : 'Celebrations: Will confirm shortly',
      note ? `Note: ${note}` : '',
      'Venue: Sri Kalyana Mandapam, Taj Coromandel, Chennai (15–17 Dec 2026)',
    ].filter(Boolean);

    window.open(
      `https://wa.me/${DEMO_RSVP_WA}?text=${encodeURIComponent(lines.join('\n'))}`,
      '_blank',
      'noopener,noreferrer'
    );
  });

  // =========================================================
  // 7. LIVE COUNTDOWN TO MUHURTHAM (17 DEC 2026, 9:15 AM IST)
  // =========================================================
  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMins = document.getElementById('cdMins');
  const cdSecs = document.getElementById('cdSecs');
  const muhurthamTarget = new Date('2026-12-17T09:15:00+05:30').getTime();

  function tickCountdown() {
    const diff = Math.max(0, muhurthamTarget - Date.now());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    cdDays.textContent = String(days).padStart(2, '0');
    cdHours.textContent = String(hours).padStart(2, '0');
    cdMins.textContent = String(mins).padStart(2, '0');
    cdSecs.textContent = String(secs).padStart(2, '0');
  }

  tickCountdown();
  setInterval(tickCountdown, 1000);

  // =========================================================
  // 8. "TOUCH HERE FOR MAGIC" ROSE PETAL SHOWER & BURSTS
  // =========================================================
  const petalLayer = document.getElementById('petalLayer');
  const magicPetalBtn = document.getElementById('magicPetalBtn');
  const PETAL_PALETTES = [
    ['#c81d45', '#8e0b2a'],
    ['#e63b64', '#ad143b'],
    ['#f26f90', '#c73a61'],
    ['#f9b6c7', '#df7694'],
    ['#fff2f4', '#eab9c3'],
  ];

  function createSvgPetal(size, idx) {
    const [c1, c2] = PETAL_PALETTES[idx % PETAL_PALETTES.length];
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 40 52');
    svg.setAttribute('width', String(size));
    svg.setAttribute('height', String(Math.round(size * 1.25)));

    const gradId = `pg_${idx}_${Math.floor(Math.random() * 10000)}`;
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const lg = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    lg.setAttribute('id', gradId);
    lg.setAttribute('x1', '0');
    lg.setAttribute('y1', '0');
    lg.setAttribute('x2', '1');
    lg.setAttribute('y2', '1');
    const s1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    s1.setAttribute('offset', '0%');
    s1.setAttribute('stop-color', c1);
    const s2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    s2.setAttribute('offset', '100%');
    s2.setAttribute('stop-color', c2);
    lg.append(s1, s2);
    defs.appendChild(lg);

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute(
      'd',
      'M20,3 C31,4 38,16 35,30 C32,42 24,49 18,49 C10,48 4,38 5,24 C6,12 12,3 20,3 Z'
    );
    path.setAttribute('fill', `url(#${gradId})`);
    svg.append(defs, path);
    return svg;
  }

  function spawnPetalBurst(originX, originY, count = 20) {
    for (let i = 0; i < count; i += 1) {
      const wrap = document.createElement('span');
      wrap.className = 'petal-burst-node';
      wrap.appendChild(createSvgPetal(16 + Math.random() * 14, i));

      const tx = (Math.random() - 0.5) * 320;
      const ty = -(130 + Math.random() * 290);
      const rot = (Math.random() - 0.5) * 380;
      const dur = 1.9 + Math.random() * 1.1;

      wrap.style.left = `${originX + (Math.random() - 0.5) * 48}px`;
      wrap.style.top = `${originY}px`;
      wrap.style.setProperty('--tx', `${tx}px`);
      wrap.style.setProperty('--ty', `${ty}px`);
      wrap.style.setProperty('--rot', `${rot}deg`);
      wrap.style.setProperty('--dur', `${dur}s`);

      petalLayer.appendChild(wrap);
      setTimeout(() => wrap.remove(), dur * 1000 + 100);
    }
  }

  function triggerMagicPetalShower() {
    const total = 44;
    for (let i = 0; i < total; i += 1) {
      setTimeout(() => {
        const node = document.createElement('span');
        node.className = 'petal-node';
        const size = 20 + Math.random() * 20;
        node.appendChild(createSvgPetal(size, i));

        const startX = Math.random() * window.innerWidth;
        const sway = (Math.random() - 0.5) * 140;
        const endX = sway + (Math.random() - 0.5) * 90;
        const dur = 3.8 + Math.random() * 2.4;

        node.style.left = `${startX}px`;
        node.style.setProperty('--sway', `${sway}px`);
        node.style.setProperty('--endX', `${endX}px`);
        node.style.setProperty('--rotMid', `${(Math.random() - 0.5) * 240}deg`);
        node.style.setProperty('--rotEnd', `${(Math.random() - 0.5) * 520}deg`);
        node.style.setProperty('--dur', `${dur}s`);

        petalLayer.appendChild(node);
        setTimeout(() => node.remove(), dur * 1000 + 120);
      }, i * 38);
    }
  }

  magicPetalBtn.addEventListener('click', triggerMagicPetalShower);

  // =========================================================
  // 9. PREVIEW CONFIRMATION MODAL (MAYUR & SUMIT ON WHATSAPP)
  // =========================================================
  const previewConfirmBtn = document.getElementById('previewConfirmBtn');
  const confirmModal = document.getElementById('confirmModal');
  const closeConfirmModal = document.getElementById('closeConfirmModal');

  previewConfirmBtn.addEventListener('click', () => {
    confirmModal.hidden = false;
  });

  closeConfirmModal.addEventListener('click', () => {
    confirmModal.hidden = true;
  });

  confirmModal.addEventListener('click', (e) => {
    if (e.target === confirmModal) confirmModal.hidden = true;
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      confirmModal.hidden = true;
      lightboxModal.hidden = true;
    }
  });
})();
