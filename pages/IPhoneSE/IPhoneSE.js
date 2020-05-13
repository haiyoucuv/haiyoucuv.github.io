window.document.addEventListener('scroll', function () {
    let noStickyHeight = document.documentElement.clientHeight * 2;
    // 滚动百分比 0最顶 1最底
    // 滚动距离 / (滚动高度 - 窗口高度)
    var scrolled = document.documentElement.scrollTop / noStickyHeight;
    // var scrolled = document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight);


    var $white = document.querySelector('.white');
    var $red = document.querySelector('.red');

    $white.style.clipPath = 'inset(' + (0.5 - scrolled) / 0.5 * 100 + '% 0 0 0)';
    $red.style.clipPath = 'inset(' + (1 - scrolled) / 0.5 * 100 + '% 0 0 0)';

    if (scrolled >= 1) {
        document.querySelector('.sticky-container').classList.add('no-sticky');
    } else {
        document.querySelector('.sticky-container').classList.remove('no-sticky');
    }
});

