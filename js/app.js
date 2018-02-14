let qs = q => document.querySelector(q);
let qsa = q => document.querySelectorAll(q);

document.addEventListener('DOMContentLoaded', _ => {
    /* list */
    let listHide = true,
        $listAll = qs('#list-all'),
        $listFull = qs('#list-full'),
        $listFullDescription = qs('#list-full-description');

    $listFull.onclick = _ => {
        let text = $listFull.dataset.text,
            textDescription = $listFullDescription.dataset.text;

        $listFull.dataset.text = $listFull.innerHTML;
        $listFull.innerHTML = text;

        $listFullDescription.dataset.text = $listFullDescription.innerHTML;
        $listFullDescription.innerHTML = textDescription;

        $listAll.classList.toggle('list-items-hide');
        listHide = !listHide;
    };
    /* /list */

    /* slider */
    let $slider = qs('#slider'),
        $sliderList = qs('#slider-list'),
        sliderWidth = $slider.clientWidth,
        sliderAllWidth = $sliderList.clientWidth,
        sliderStep = 0,
        $sliderArrows = {
            left: qs('#slider-left'),
            right: qs('#slider-right')
        };

    let Slider = direction => {
            let margin = ($sliderList.currentStyle || window.getComputedStyle($sliderList)).marginLeft.replace('px', '') * 1;

            if(direction === 'left') {
                margin += sliderStep;
            } else {
                margin -= sliderStep;
            }

            $sliderArrows.right.disabled = false;
            $sliderArrows.left.disabled = false;

            if(margin >= 0) {
                margin = 0;
                $sliderArrows.left.disabled = true;
            }

            if(margin <= -(sliderAllWidth - sliderWidth)) {
                margin = -(sliderAllWidth - sliderWidth);
                $sliderArrows.right.disabled = true;
            }

            $sliderList.style.marginLeft = margin + 'px';
        },
        SliderReset = _=> {
            let $sliderItem = qs('#slider-list .comments-item:nth-child(2)');
            sliderStep = $sliderItem.clientWidth + ($sliderItem.currentStyle || window.getComputedStyle($sliderItem)).marginLeft.replace('px', '') * 1;
            $sliderList.style.marginLeft = 0;
        };

    $sliderArrows.left.onclick  = _ => { Slider('left'); };
    $sliderArrows.right.onclick  = _ => { Slider('right'); };
    window.onresize = SliderReset;

    SliderReset();
    /* /slider */

    /* menu-mobile */
    let $menu = qs('#menu-mobile'),
        body = qs('body');

    let MenuOpen = _=> {
        $menu.classList.remove('header-menu-close');
        body.style.overflow = 'hidden';
        body.style.overflowX = 'hidden';
    };
    let MenuClose = _=> {
        $menu.classList.add('header-menu-close');
        body.style.overflow = 'auto';
        body.style.overflowX = 'hidden';
    };

    let $menuLinks = qsa('#menu-mobile a');
    for(let i in $menuLinks) $menuLinks[i].onclick = MenuClose;

    qs('#menu-button-close').onclick = MenuClose;
    qs('#menu-button-open').onclick = MenuOpen;
    /* /menu-mobile */
});