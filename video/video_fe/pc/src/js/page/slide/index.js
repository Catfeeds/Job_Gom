/* css */
import 'css/widgets/slide/slide.scss';

/* header and footer */
import 'widgets/head/index.js';
import 'widgets/footer/index.js';
import Slide from 'components/slide';

new Slide({
    el: '#singleSlide',
    data:{
        autoplay:true,
        nav: true
    }
});

new Slide({
    el: '#multipleSlide',
    data:{
        autoplay:false,
        nav: false
    }
});