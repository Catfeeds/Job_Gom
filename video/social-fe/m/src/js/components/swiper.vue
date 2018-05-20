<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="str in listImg">
                <a :href="listUrl">
                    <img :src="str" alt="">
                </a>
            </div>
            
        </div>
        <div class="swiper-pagination swiper-pagination-white"></div>
    </div>
</template>

<script>
    import Swiper from '../vendors/swipe.js';
    
    export default {
        props: ['listImg','listUrl'],
        mounted() {
            var swiper = new Swiper('.swiper-container', {
                pagination: {
                    el:'.swiper-pagination'
                },
                paginationClickable: true,
                loop: true,
                speed: 600,
                autoplay: false,
                onTouchEnd: function() {
                    swiper.startAutoplay()
                }
            });
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../css/utils/swiper.min.css';
    .swiper-container {
        width: 100%;
        .swiper-wrapper {
            width: 100%;
            height: 100%;
        }
        .swiper-slide {
            background-position: center;
            background-size: cover;
            width: 100%;
            height: 100%;
            a{
                display: block;
                width: 100%;
                height: 100%;
                background-position: center;
                background-size: cover;
            }
        }
        .swiper-pagination-bullet {
            width:0.833rem;
            height: 0.833rem;
            display: inline-block;
            background: #7c5e53;
        }
    }
</style>