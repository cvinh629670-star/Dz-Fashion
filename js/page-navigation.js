(() => {
  // Các màn hình được giữ trong một sân khấu cố định.
  // Mọi lần bấm navbar: màn hình mới đi vào từ phải, màn hình cũ trượt sang trái.
  const pages = {
    outfit: { kicker:'DZ-FASHION / LOOKBOOK', title:'Khám phá Outfit', desc:'Những bản phối Hàn Quốc thanh lịch, hiện đại và dễ ứng dụng trong cuộc sống hằng ngày.', cards:[['01','Campus Casual','Năng động, tối giản, hợp đi học.'],['02','Clean Minimal','Màu trung tính, phom dáng gọn gàng.'],['03','Soft Streetwear','Layering nhẹ nhàng với điểm nhấn xanh navy.']] },
    nam: { kicker:'DZ-FASHION / MEN', title:'Thời trang Nam', desc:'Khám phá cảm hứng phối đồ dành cho nam: dễ mặc, chỉn chu và mang hơi thở Hàn Quốc.', cards:[['01','Preppy Campus','Áo khoác, áo len và quần suông.'],['02','Smart Casual','Lịch sự nhưng vẫn thoải mái.'],['03','Everyday Street','Đơn giản, linh hoạt, có cá tính.']] },
    nu: { kicker:'DZ-FASHION / WOMEN', title:'Thời trang Nữ', desc:'Những gợi ý phối đồ nữ nhẹ nhàng, thanh lịch và trẻ trung theo phong cách Hàn Quốc.', cards:[['01','Soft Korean','Sắc màu dịu nhẹ, đường nét nữ tính.'],['02','City Minimal','Thanh lịch với những món đồ cơ bản.'],['03','Campus Mood','Thoải mái và đáng yêu mỗi ngày.']] },
    xuhuong: { kicker:'DZ-FASHION / MONETIZATION', title:'Khám phá & Đề xuất', desc:'Không gian giới thiệu nội dung và quảng cáo từ đối tác. Các vị trí tài trợ được phân biệt rõ ràng.', cards:[] }
  };

  const hero = document.getElementById('hero');
  const template = document.getElementById('explore').cloneNode(true);
  document.getElementById('explore').remove();
  const stage = document.createElement('div');
  stage.className = 'dz-stage';
  stage.id = 'dzStage';
  stage.setAttribute('aria-label','Nội dung Dz-Fashion');
  document.body.insertBefore(stage,hero);
  stage.appendChild(hero);
  hero.classList.add('dz-screen');
  hero.dataset.screen = 'home';

  const nav = document.getElementById('siteNav');
  const toggle = document.getElementById('menuToggle');
  const dialog = document.getElementById('lookDialog');
  const links = [...document.querySelectorAll('.nav [data-page]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  // Timeline điện ảnh: (1) vật thể lớn, (2) vật thể nhỏ, (3) toàn cảnh.
  // Các lớp vào theo chiều ngược lại, sau khi nền trang mới đã bắt đầu xuất hiện.
  const MOTION = Object.freeze({
    bigStart: 0, bigDuration: 500,
    smallStart: 310, smallDuration: 410,
    pageStart: 650, pageDuration: 800,
    revealBigStart: 1120, revealBigDuration: 460,
    revealSmallStart: 1320, revealSmallDuration: 390,
    total: 1850
  });
  const EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';
  let current = 'home';
  let activeScreen = hero;
  let inFlight = false;
  let pendingPage = null;

  function normalizePage(page) { return page === 'home' || pages[page] ? page : 'home'; }
  function closeMenu() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Mở menu điều hướng');
  }
  function updateNav(page) {
    links.forEach(link => {
      const active = link.dataset.page === page;
      link.classList.toggle('active',active);
      if (active) link.setAttribute('aria-current','page');
      else link.removeAttribute('aria-current');
    });
  }
  function makeScreen(page) {
    if (page === 'home') {
      hero.style.display = '';
      hero.setAttribute('aria-hidden','false');
      return hero;
    }
    const data = pages[page];
    const screen = template.cloneNode(true);
    screen.classList.remove('is-active');
    screen.classList.add('dz-screen');
    screen.id = 'screen-' + page;
    screen.dataset.screen = page;
    screen.setAttribute('aria-hidden','false');
    const title = screen.querySelector('#pageTitle');
    title.id = 'pageTitle-' + page;
    screen.setAttribute('aria-labelledby',title.id);
    screen.querySelector('#pageKicker').textContent = data.kicker;
    title.textContent = data.title;
    screen.querySelector('#pageDescription').textContent = data.desc;
    const grid = screen.querySelector('#lookGrid');
    grid.replaceChildren();
    const toolbar = document.createElement('div');
    toolbar.className='collection-toolbar';
    toolbar.innerHTML='<strong>THE LOOKBOOK &nbsp; / &nbsp; 03 CURATED IDEAS</strong><span>DZ FASHION ✦ 2026</span>';
    grid.before(toolbar);
    if(page==='xuhuong') {
      toolbar.remove();
      screen.classList.add('dz-trends-editorial');
      const pageContent=screen.querySelector('.page-content');
      const intro=pageContent?.querySelector('.page-intro, .explore-head, .section-heading');
      if(intro) intro.classList.add('dz-trends-original-intro');
      grid.classList.add('dz-trends-grid');
      const shell=document.createElement('div');
      shell.className='dz-trends-shell';
      shell.innerHTML=`
        <div class="dz-trends-topline"><span>THE DZ EDIT / VOL. 01</span><span class="dz-trends-live"><i></i> THE CURATED SPACE</span><span>SEOUL · SAIGON / 2026</span></div>
        <div class="dz-trends-lead">
          <div class="dz-trends-lead-copy"><span class="dz-trends-eyebrow">DISCOVER WHAT'S NEXT — DZ FASHION</span><h2>THE <em>NEW</em><br><span>WAVE.</span></h2><p>Một góc nhìn mới về phong cách, cảm hứng và những khám phá đáng chú ý. Tinh tế trong từng chi tiết.</p><div class="dz-trends-scrollnote"><span class="dz-trends-line"></span> EXPLORE THE EDITION <span>↓</span></div></div>
          <div class="dz-trends-visual" aria-hidden="true"><span class="dz-trends-visual-word">FASHION<br>IN MOTION</span><div class="dz-trends-orb dz-trends-orb-one"></div><div class="dz-trends-orb dz-trends-orb-two"></div><div class="dz-trends-visual-frame"></div><span class="dz-trends-visual-index">01 — 03 / SELECTED SPACES</span></div>
          <span class="dz-trends-vertical" aria-hidden="true">THE ART OF DISCOVERY · DZ / 2026</span>
        </div>
        <div class="dz-trends-section-head"><div><span class="dz-trends-eyebrow">01 / PARTNER SHOWCASE</span><h3>Selected <em>Spaces.</em></h3></div><p>Những vị trí giới thiệu từ đối tác, được sắp xếp để hài hòa với trải nghiệm khám phá thời trang.</p></div>
      `;
      grid.before(shell);
      const slots=[
        {id:'banner',number:'01',type:'FEATURED PLACEMENT',title:'Spotlight',subtitle:'Không gian nổi bật',desc:'Vị trí banner dành cho nội dung quảng cáo từ đối tác.'},
        {id:'native',number:'02',type:'EDITORIAL PLACEMENT',title:'Discover',subtitle:'Khám phá thêm',desc:'Vị trí quảng cáo native với cách trình bày tối giản.'},
        {id:'secondary',number:'03',type:'ADDITIONAL PLACEMENT',title:'The Edit',subtitle:'Góc đề xuất',desc:'Không gian quảng cáo bổ sung khi có chiến dịch phù hợp.'}
      ];
      for(const slot of slots){
        const card=document.createElement('section');card.className='dz-trends-slot dz-trends-slot-'+slot.id;card.dataset.adSlot=slot.id;
        const top=document.createElement('div');top.className='dz-trends-slot-top';
        const number=document.createElement('span');number.textContent=slot.number+' / '+slot.type;
        const sponsored=document.createElement('span');sponsored.className='dz-trends-sponsored';sponsored.textContent='QUẢNG CÁO · SPONSORED';top.append(number,sponsored);
        const content=document.createElement('div');content.className='dz-trends-slot-content';
        const subtitle=document.createElement('span');subtitle.className='dz-trends-slot-subtitle';subtitle.textContent=slot.subtitle;
        const titleEl=document.createElement('h4');titleEl.textContent=slot.title;
        const desc=document.createElement('p');desc.textContent=slot.desc;content.append(subtitle,titleEl,desc);
        const mount=document.createElement('div');mount.className='dz-ad-mount dz-trends-ad-mount';mount.dataset.monetagMount=slot.id;
        const placeholder=document.createElement('div');placeholder.className='dz-trends-placeholder';placeholder.innerHTML='<span class="dz-trends-placeholder-icon" aria-hidden="true">✳</span><strong>PARTNER CONTENT</strong><small>Vị trí quảng cáo Monetag chưa được cấu hình</small>';mount.append(placeholder);
        card.append(top,content,mount);grid.append(card);
      }
      const foot=document.createElement('div');foot.className='dz-trends-footer';foot.innerHTML='<span>DZ-FASHION © 2026</span><span>CURATED WITH INTENTION ✳</span><span>ADVERTISEMENTS ARE CLEARLY LABELED</span>';grid.after(foot);
      return screen;
    }
    const catalog=window.DzOutfitUtils.forPage(page);
    toolbar.querySelector('strong').textContent='THE LOOKBOOK / '+String(catalog.length).padStart(2,'0')+' OUTFITS';
    catalog.forEach((outfit,idx) => {
      const number=String(idx+1).padStart(2,'0');
      const heading=outfit.ten;
      const description=outfit.moTa || outfit.phongCach;
      const tile = document.createElement('article');
      tile.className = 'look-tile';
      const num = document.createElement('span');
      num.className = 'look-number';
      num.textContent = 'LOOK / ' + number;
      const body = document.createElement('div');
      const h = document.createElement('h3');
      h.textContent = heading;
      const p = document.createElement('p');
      p.textContent = description;
      body.append(h,p);
      tile.append(num,body);
      // Bespoke editorial visual: no stock URLs, works fully offline.
      const visual = document.createElement('div');
      visual.className = 'look-visual';
      const sticker = document.createElement('span');
      sticker.className = 'look-sticker';
      sticker.textContent = outfit.phongCach;
      const index = document.createElement('span');
      index.className = 'look-index';
      index.textContent = number;
      const serif = document.createElement('span');
      serif.className = 'visual-serif';
      serif.textContent = number;
      visual.append(sticker,index,serif);
      const artKind = outfit.gioiTinh==='nu'?'cardigan':outfit.danhMuc==='streetwear'?'jacket':'knit';
      if(outfit.trangThai==='demo'){
        const flag=document.createElement('span');flag.className='dz-demo-flag';flag.textContent='DEMO';visual.append(flag);
      }
      if (outfit.anh) {
        const image = document.createElement('img');
        image.className = 'dz-product-img';
        image.src = outfit.anh;
        image.alt = outfit.ten;
        image.loading = 'lazy';
        visual.append(image);
      } else {
        const art = document.createElement('div');
        art.className = 'look-art';
        art.setAttribute('aria-hidden','true');
        art.innerHTML = window.DzLookArtwork(artKind);
        visual.append(art);
      }
      const info = document.createElement('div');
      info.className = 'look-info';
      const tag=document.createElement('span');tag.className='dz-style-tag';tag.textContent=outfit.phongCach;
      body.prepend(tag);
      const price=document.createElement('span');price.className='dz-price';price.textContent=window.DzOutfitUtils.formatPrice(outfit.gia)+(outfit.trangThai==='demo'?' · giá minh họa':'');body.append(price);
      info.append(body);
      const arr = document.createElement('span');
      arr.className = 'look-arrow';
      arr.textContent = '↗';
      arr.setAttribute('aria-hidden','true');
      info.append(arr);
      tile.replaceChildren(visual,info);
      tile.tabIndex=0;
      tile.setAttribute('role','button');
      tile.setAttribute('aria-label','Xem chi tiết: '+heading);
      const showLook = () => {
        document.querySelector('#lookDialog .dialog-kicker').textContent = data.kicker+' / '+number;
        document.getElementById('lookDialogTitle').textContent = heading;
        document.querySelector('#lookDialogTitle + p').textContent = description;
        const pieces=document.getElementById('dzLookPieces');pieces.replaceChildren();
        const meta=document.createElement('p');meta.className='dz-outfit-meta';
        meta.textContent='ID: '+outfit.id+' · '+outfit.phongCach+' · '+(outfit.trangThai==='demo'?'Giá demo: ':'Giá: ')+window.DzOutfitUtils.formatPrice(outfit.gia);
        pieces.append(meta);
        const link=document.createElement(outfit.linkAffiliate?'a':'span');
        link.className='dz-outfit-buy';link.textContent=outfit.linkAffiliate?'Xem sản phẩm ↗':'Chưa có link affiliate';
        if(outfit.linkAffiliate){link.href=outfit.linkAffiliate;link.target='_blank';link.rel='noopener noreferrer sponsored';}
        else link.setAttribute('aria-disabled','true');
        pieces.append(link);
        document.getElementById('dzLookTip').textContent='';
        document.getElementById('dzLookFooter').textContent=outfit.trangThai==='demo'?'Dữ liệu minh họa — thay giá, ảnh và link thật trước khi công bố.':'Thông tin sản phẩm được cung cấp để tham khảo.';
        dialog.hidden = false;
        document.getElementById('closeLookDialog').focus();
      };
      tile.addEventListener('click',showLook);
      tile.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();showLook();}});
      grid.append(tile);
    });
    return screen;
  }
  // Chọn phần tử theo kích thước thị giác thay vì di chuyển tất cả cùng lúc.
  function getLayers(screen) {
    if (screen === hero) {
      return {
        big: [...screen.querySelectorAll('.model, .copy h1, .orb, .hero-halo')],
        small: [...screen.querySelectorAll('.eyebrow, .desc, .cta, .right-card, .hero-chapter, .hero-bottom-band')]
      };
    }
    return {
      big: [...screen.querySelectorAll('.page-content h2, .look-tile')],
      small: [...screen.querySelectorAll('.page-kicker, .page-description, .page-note')]
    };
  }
  // Hoạt ảnh Web Animations chạy bằng compositor, không cần thư viện ngoài.
  function animateLayer(element, keyframes, options, animations) {
    const animation = element.animate(keyframes, { ...options, fill: 'both' });
    animations.push(animation);
    return animation;
  }
  function runLayerSequence(screen, kind, entering, animations, verticalDirection = 0) {
    const layers = getLayers(screen);
    const elements = layers[kind];
    const isBig = kind === 'big';
    const start = entering
      ? (isBig ? MOTION.revealBigStart : MOTION.revealSmallStart)
      : (isBig ? MOTION.bigStart : MOTION.smallStart);
    const duration = entering
      ? (isBig ? MOTION.revealBigDuration : MOTION.revealSmallDuration)
      : (isBig ? MOTION.bigDuration : MOTION.smallDuration);
    const count = elements.length;
    elements.forEach((element, index) => {
      // Tạo độ lệch ngắn giữa các vật thể, nhưng giữ đúng thứ tự 3 pha.
      const stagger = Math.min(index * (isBig ? 38 : 46), isBig ? 92 : 138);
      // Giữ nguyên translate/rotate gốc của các chi tiết định vị bằng CSS.
      const base = element.classList.contains('orb')
        ? ' translate(-50%,-50%) rotate(-20deg)'
        : element.classList.contains('hero-halo') ? ' translate(-50%,-50%)'
        : element.classList.contains('right-card') ? ' translateY(-50%)' : '';
      const frames = verticalDirection ? (entering ? [
        { transform: `translate3d(0,${verticalDirection * 140}px,0) scale(.96)` + base, opacity: 0 },
        { transform: `translate3d(0,${-verticalDirection * 9}px,0) scale(1.005)` + base, opacity: 1, offset: .83 },
        { transform: 'translate3d(0,0,0) scale(1)' + base, opacity: 1 }
      ] : [
        { transform: 'translate3d(0,0,0) scale(1)' + base, opacity: 1 },
        { transform: `translate3d(0,${-verticalDirection * 42}vh,0) scale(.985)` + base, opacity: .96, offset: .65 },
        { transform: `translate3d(0,${-verticalDirection * 112}vh,0) scale(.96)` + base, opacity: 0 }
      ]) : (entering ? [
        { transform: 'translate3d(150px,0,0) scale(.96)' + base, opacity: 0 },
        { transform: 'translate3d(-9px,0,0) scale(1.005)' + base, opacity: 1, offset: .83 },
        { transform: 'translate3d(0,0,0) scale(1)' + base, opacity: 1 }
      ] : [
        { transform: 'translate3d(0,0,0) scale(1)' + base, opacity: 1 },
        { transform: 'translate3d(-42vw,0,0) scale(.985)' + base, opacity: .96, offset: .65 },
        { transform: 'translate3d(-112vw,0,0) scale(.96)' + base, opacity: 0 }
      ]);
      animateLayer(element, frames, {
        delay: start + stagger,
        duration,
        easing: entering ? EASING : 'cubic-bezier(.64, 0, .84, .37)'
      }, animations);
    });
  }
  function finishTransition(outgoing, incoming, page, animations) {
    // Xóa toàn bộ hiệu ứng tạm; giữ nguyên parallax, ảnh và trạng thái navbar.
    animations.forEach(animation => { try { animation.cancel(); } catch(e) {} });
    incoming.style.transform = 'translate3d(0,0,0)';
    incoming.style.opacity = '1';
    incoming.classList.remove('dz-entering','dz-vertical-entering');
    incoming.setAttribute('aria-hidden','false');
    if (outgoing === hero) {
      hero.style.display = 'none';
      hero.setAttribute('aria-hidden','true');
      hero.style.transform = '';
      hero.style.opacity = '';
    } else {
      outgoing.remove();
    }
    stage.classList.remove('dz-is-transitioning');
    if (page === 'xuhuong') incoming.querySelector('.page-content')?.scrollTo(0,0);
    activeScreen = incoming;
    current = page;
    inFlight = false;
    if (pendingPage !== null) {
      const next = pendingPage;
      pendingPage = null;
      if (next !== current) goToPage(next);
    }
  }
  function goToPage(requested) {
    const page = normalizePage(requested);
    if (inFlight) { pendingPage = page; closeMenu(); return; }
    if (page === current) { closeMenu(); return; }
    const outgoing = activeScreen;
    const incoming = makeScreen(page);
    if (incoming !== hero) stage.appendChild(incoming);
    else stage.appendChild(hero);
    // Chỉ HOME ↔ XU HƯỚNG đi theo trục dọc; các tab khác vẫn giữ cinematic slide ngang.
    const verticalDirection = current === 'home' && page === 'xuhuong' ? 1 :
                              current === 'xuhuong' && page === 'home' ? -1 : 0;
    incoming.style.transform = verticalDirection
      ? `translate3d(0,${verticalDirection * 100}%,0)`
      : 'translate3d(100%,0,0)';
    incoming.style.opacity = '1';
    incoming.classList.add(verticalDirection ? 'dz-vertical-entering' : 'dz-entering');
    incoming.setAttribute('aria-hidden','false');
    outgoing.setAttribute('aria-hidden','true');
    updateNav(page);
    closeMenu();
    dialog.hidden = true;
    inFlight = true;
    stage.classList.add('dz-is-transitioning');
    const animations = [];
    if (reducedMotion.matches || !Element.prototype.animate) {
      finishTransition(outgoing,incoming,page,animations);
      return;
    }
    // 01 — Những vật thể lớn lướt qua trước.
    runLayerSequence(outgoing, 'big', false, animations, verticalDirection);
    // 02 — Nhãn, mô tả, nút và các chi tiết nhỏ tiếp nối.
    runLayerSequence(outgoing, 'small', false, animations, verticalDirection);
    // 03 — Sau cùng, toàn bộ nền/màn hình mới trượt vào từ bên phải.
    const pageSettings = {delay:MOTION.pageStart, duration:MOTION.pageDuration,
      easing:EASING, fill:'both'};
    animateLayer(outgoing, [
      {transform:'translate3d(0,0,0)',opacity:1},
      {transform:verticalDirection ? `translate3d(0,${-verticalDirection * 100}%,0)` : 'translate3d(-100%,0,0)',opacity:1}
    ], pageSettings, animations);
    animateLayer(incoming, [
      {transform:verticalDirection ? `translate3d(0,${verticalDirection * 100}%,0)` : 'translate3d(100%,0,0)',opacity:1},
      {transform:'translate3d(0,0,0)',opacity:1}
    ], pageSettings, animations);
    // Trang mới xuất hiện theo lớp: vật thể lớn trước, chi tiết nhỏ sau.
    runLayerSequence(incoming, 'big', true, animations, verticalDirection);
    runLayerSequence(incoming, 'small', true, animations, verticalDirection);
    // Chờ mọi lớp hoàn tất, không cắt ngang animation cuối.
    Promise.all(animations.map(animation => animation.finished.catch(() => {})))
      .then(() => finishTransition(outgoing,incoming,page,animations))
      .catch(() => finishTransition(outgoing,incoming,page,animations));
  }
  function initialPage() {
    const page = normalizePage(location.hash.slice(1) || 'home');
    if (page !== 'home') {
      const incoming = makeScreen(page);
      stage.appendChild(incoming);
      hero.style.display = 'none';
      hero.setAttribute('aria-hidden','true');
      activeScreen = incoming;
      current = page;
    }
    updateNav(page);
  }

  links.forEach(link => link.addEventListener('click',event => {
    event.preventDefault();
    const page = normalizePage(link.dataset.page);
    if (page !== current || inFlight) {
      try { history.pushState({page},'', '#' + page); } catch(e) {}
    }
    goToPage(page);
  }));
  toggle.addEventListener('click',() => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'Đóng menu điều hướng':'Mở menu điều hướng');
  });
  document.getElementById('lookButton').addEventListener('click',() => {
    dialog.hidden = false;
    document.getElementById('closeLookDialog').focus();
  });
  document.getElementById('closeLookDialog').addEventListener('click',() => {
    dialog.hidden = true;
    document.getElementById('lookButton').focus();
  });
  dialog.addEventListener('click',event => { if(event.target === dialog) dialog.hidden = true; });
  document.addEventListener('keydown',event => {
    if(event.key === 'Escape') { dialog.hidden = true; closeMenu(); }
  });
  window.addEventListener('popstate',() => goToPage(location.hash.slice(1) || 'home'));

  // Chuyển màn hình bằng lăn chuột: một lần cuộn = một lần chuyển, không cuộn toàn trang.
  // Khi nội dung quảng cáo dài (mobile), cho phép cuộn bên trong mục Xu hướng.
  let lastScrollSnap = -Infinity;
  const wheelThreshold = 62;
  let wheelSum = 0, lastWheelAt = 0;
  function navigateByScroll(toPage) {
    const now = performance.now();
    if (inFlight || now - lastScrollSnap < 1000) return;
    lastScrollSnap = now;
    try { history.pushState({page:toPage}, '', '#' + toPage); } catch(e) {}
    goToPage(toPage);
  }
  function canReturnFromTrends() {
    const pane = activeScreen.querySelector('.page-content');
    return !pane || pane.scrollTop <= 3;
  }
  document.addEventListener('wheel', event => {
    if (!dialog.hidden || nav.classList.contains('is-open') || event.ctrlKey) return;
    const wantsTrends = current === 'home' && event.deltaY > 0;
    const wantsHome = current === 'xuhuong' && event.deltaY < 0 && canReturnFromTrends();
    if (!wantsTrends && !wantsHome) { wheelSum = 0; return; }
    event.preventDefault();
    const now = performance.now();
    if (now - lastWheelAt > 380) wheelSum = 0;
    lastWheelAt = now;
    const px = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
    wheelSum += px;
    if (Math.abs(wheelSum) >= wheelThreshold) {
      wheelSum = 0;
      navigateByScroll(wantsTrends ? 'xuhuong' : 'home');
    }
  }, {passive:false});
  // Mobile: vuốt lên từ Trang chủ hoặc vuốt xuống khi đầu mục Xu hướng.
  let touchStart = null;
  stage.addEventListener('touchstart',event => {
    if (event.touches.length !== 1 || !dialog.hidden || nav.classList.contains('is-open')) return;
    if (event.target.closest('a,button,[role="button"]')) return;
    touchStart = {y:event.touches[0].clientY, x:event.touches[0].clientX};
  }, {passive:true});
  stage.addEventListener('touchend',event => {
    if (!touchStart || event.changedTouches.length !== 1) return;
    const dx=event.changedTouches[0].clientX-touchStart.x;
    const dy=event.changedTouches[0].clientY-touchStart.y;
    touchStart=null;
    if (Math.abs(dy)<65 || Math.abs(dy)<Math.abs(dx)*1.3) return;
    if (current==='home' && dy<0) navigateByScroll('xuhuong');
    else if (current==='xuhuong' && dy>0 && canReturnFromTrends()) navigateByScroll('home');
  }, {passive:true});
  // Nút nhỏ, chỉ xuất hiện ở Trang chủ, giúp người dùng nhận biết có màn hình bên dưới.
  const cue = document.createElement('button');
  cue.type='button'; cue.className='dz-scroll-cue';
  cue.setAttribute('aria-label','Cuộn xuống để mở Xu hướng');
  cue.innerHTML='<span>Xu hướng</span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="m5 9 7 7 7-7"/></svg>';
  hero.appendChild(cue);
  cue.addEventListener('click',()=>navigateByScroll('xuhuong'));

  initialPage();
})();
