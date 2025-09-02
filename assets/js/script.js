const galleries = {
    1: [
        { src: './assets/img/standing/1.webp' },
        { src: './assets/img/standing/2.webp' },
        { src: './assets/img/standing/3.webp' },
        { src: './assets/img/standing/4.webp' },
        { src: './assets/img/standing/5.webp' },
        { src: './assets/img/standing/6.webp' },
        { src: './assets/img/standing/7.webp' },
        { src: './assets/img/standing/8.webp' },
        { src: './assets/img/standing/9.webp' },
        { src: './assets/img/standing/10.webp' },
    ],
    2: [
        { src: './assets/img/sitting/1.webp' },
        { src: './assets/img/sitting/2.webp' },
        { src: './assets/img/sitting/3.webp' },
        { src: './assets/img/sitting/4.webp' },
        { src: './assets/img/sitting/5.webp' },
        { src: './assets/img/sitting/6.webp' },
        { src: './assets/img/sitting/7.webp' },
        { src: './assets/img/sitting/9.webp' },
        { src: './assets/img/sitting/10.webp' }
    ],
    3: [
        { src: './assets/img/lying/1.webp' },
        { src: './assets/img/lying/2.webp' },
        { src: './assets/img/lying/3.webp' },
        { src: './assets/img/lying/4.webp' },
        { src: './assets/img/lying/5.webp' },
        { src: './assets/img/lying/6.webp' },
        { src: './assets/img/lying/7.webp' },
        { src: './assets/img/lying/8.webp' },
        { src: './assets/img/lying/9.webp' },
        { src: './assets/img/lying/10.webp' }
    ],
    4: [
        { src: './assets/img/kneeling/1.webp' },
        { src: './assets/img/kneeling/2.webp' },
        { src: './assets/img/kneeling/3.webp' },
        { src: './assets/img/kneeling/4.webp' },
        { src: './assets/img/kneeling/5.webp' },
        { src: './assets/img/kneeling/6.webp' },
        { src: './assets/img/kneeling/7.webp' },
        { src: './assets/img/kneeling/8.webp' },
        { src: './assets/img/kneeling/9.webp' },
        { src: './assets/img/kneeling/10.webp' }
    ],
    5: [
        { src: './assets/img/all-forurs/1.webp' },
        { src: './assets/img/all-forurs/2.webp' },
        { src: './assets/img/all-forurs/3.webp' },
        { src: './assets/img/all-forurs/4.webp' },
        { src: './assets/img/all-forurs/5.webp' },
        { src: './assets/img/all-forurs/6.webp' },
        { src: './assets/img/all-forurs/7.webp' },
        { src: './assets/img/all-forurs/8.webp' },
        { src: './assets/img/all-forurs/9.webp' },
        { src: './assets/img/all-forurs/10.webp' }
    ],
    6: [
        { src: './assets/img/squatting/1.webp' },
        { src: './assets/img/squatting/2.webp' },
        { src: './assets/img/squatting/3.webp' },
        { src: './assets/img/squatting/4.webp' },
        { src: './assets/img/squatting/5.webp' },
        { src: './assets/img/squatting/6.webp' },
        { src: './assets/img/squatting/7.webp' },
        { src: './assets/img/squatting/8.webp' },
        { src: './assets/img/squatting/9.webp' },
        { src: './assets/img/squatting/10.webp' }

    ],
    7: [
        { src: './assets/img/walking/1.webp' },
        { src: './assets/img/walking/2.webp' },
        { src: './assets/img/walking/3.webp' },
        { src: './assets/img/walking/4.webp' },
        { src: './assets/img/walking/5.webp' },
        { src: './assets/img/walking/6.webp' },
        { src: './assets/img/walking/7.webp' },
        { src: './assets/img/walking/8.webp' },
        { src: './assets/img/walking/9.webp' },
        { src: './assets/img/walking/10.webp' },

    ]
};

// 各ギャラリーの現在のインデックス
const currentIndex = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
const intervals = {};
const isPlaying = { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true };

// 画像を表示
function showPhoto(galleryNum, index) {
    const photos = galleries[galleryNum];
    if (!photos || photos.length === 0) return;

    const photo = document.getElementById(`photo${galleryNum}`);
    const caption = document.getElementById(`caption${galleryNum}`);

    photo.src = photos[index].src;
    photo.alt = photos[index].name;
    caption.textContent = photos[index].name;

    // インジケーター更新
    updateIndicators(galleryNum, index);
}

// インジケーター更新
function updateIndicators(galleryNum, activeIndex) {
    const container = document.getElementById(`indicators${galleryNum}`);
    const dots = container.querySelectorAll('.indicator');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
    });
}

// 次の写真
function nextPhoto(galleryNum) {
    const photos = galleries[galleryNum];
    currentIndex[galleryNum] = (currentIndex[galleryNum] + 1) % photos.length;
    showPhoto(galleryNum, currentIndex[galleryNum]);
}

// 前の写真
function prevPhoto(galleryNum) {
    const photos = galleries[galleryNum];
    currentIndex[galleryNum] = (currentIndex[galleryNum] - 1 + photos.length) % photos.length;
    showPhoto(galleryNum, currentIndex[galleryNum]);
}

// スライドショー開始
function startSlideshow(galleryNum) {
    if (intervals[galleryNum]) clearInterval(intervals[galleryNum]);
    intervals[galleryNum] = setInterval(() => {
        nextPhoto(galleryNum);
    }, 2500);
}

// スライドショー停止
function stopSlideshow(galleryNum) {
    if (intervals[galleryNum]) {
        clearInterval(intervals[galleryNum]);
        intervals[galleryNum] = null;
    }
}

// 初期化
function init() {
    for (let i = 1; i <= 7; i++) {
        // インジケーター作成
        const indicatorContainer = document.getElementById(`indicators${i}`);
        galleries[i].forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'indicator';
            if (index === 0) dot.classList.add('active');
            dot.onclick = () => {
                currentIndex[i] = index;
                showPhoto(i, index);
            };
            indicatorContainer.appendChild(dot);
        });

        // 最初の画像を表示
        showPhoto(i, 0);

        // スライドショーは開始しない（最初のセクションのみ後で開始）

        // トグルボタンの設定
        document.getElementById(`toggle${i}`).onclick = function () {
            isPlaying[i] = !isPlaying[i];
            this.classList.toggle('active', isPlaying[i]);
            // 現在表示中のセクションの場合のみ動作を変更
            // const currentSection = swiper.activeIndex + 1;
            const currentSection = swiper.activeIndex;   // 0=Cover, 1..7=ギャラリーID
            if (i === currentSection) {
                if (isPlaying[i]) {
                    startSlideshow(i);
                } else {
                    stopSlideshow(i);
                }
            }
        };
    }
}

// Swiper初期化
const swiper = new Swiper('.swiper', {
    direction: 'vertical',
    mousewheel: true,
    speed: 800,
    grabCursor: false,
    keyboard: {
        enabled: true,
        onlyInViewport: false,
    },
    on: {
        slideChange: function () {
            updateActiveNav(this.activeIndex);
            updateSlideshows(this.activeIndex);
        }
    }
});

// ナビゲーションクリックでセクション移動
function goToSection(index) {
    swiper.slideTo(index);
}

// アクティブなナビゲーションを更新
function updateActiveNav(index) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

// スライドショーの更新（表示中のセクションのみ動作）
function updateSlideshows(activeSection) {
    // すべてのスライドショーを停止
    for (let i = 1; i <= 7; i++) {
        stopSlideshow(i);
    }
    // アクティブが Cover(0) なら何もしない
    if (activeSection < 1 || activeSection > 7) return;
    const galleryNum = activeSection;   // 1..7 がそのままギャラリーID
    if (isPlaying[galleryNum]) startSlideshow(galleryNum);
}

// ページ読み込み時に初期化
window.onload = function () {
    init();

    // 今表示中（Coverなら何もしない）だけ開始
    updateSlideshows(swiper.activeIndex);
};