import React,{memo} from 'react'
import './slider.scss'

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";

const Slider = () => {
  return (
    <section className='slider'>
        <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <img src="https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2021/02/09075323/Sample-151-1024x724.png" alt="img" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2021/02/09075323/Sample-151-1024x724.png" alt="img" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2021/02/09075323/Sample-151-1024x724.png" alt="img" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2021/02/09075323/Sample-151-1024x724.png" alt="img" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2021/02/09075323/Sample-151-1024x724.png" alt="img" />
        </SwiperSlide>
      </Swiper>
        <div className="slider__ad">
            <img src="https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2021/02/09075323/Sample-151-1024x724.png" alt="ad" />
            <img src="https://d1whtlypfis84e.cloudfront.net/guides/wp-content/uploads/2021/02/09075323/Sample-151-1024x724.png" alt="ad" />
        </div>
        
    </section>
  )
}

export default memo(Slider)