import './Categary.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import slide1 from '../../../images/slide1.jpg';
import slide2 from '../../../images/slide2.jpg';
import slide3 from '../../../images/slide3.jpg';
import slide4 from '../../../images/slide4.jpg';
import slide5 from '../../../images/slide5.jpg';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';


const Categary = () => {
    return (
        <div className='margin-btm'>
            <div className="">
            <SectionTitle subHading={'From 11.00:am to 10.00:pm'}
                hading={"ORDER ONLINE"}>
            </SectionTitle>
            </div>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper "
            >
                <SwiperSlide><img src={slide1} alt="" /><h3>Salads</h3></SwiperSlide>
                <SwiperSlide><img src={slide2} alt="" /><h3>Pizza</h3></SwiperSlide>
                <SwiperSlide><img src={slide3} alt="" /><h3>Soups</h3></SwiperSlide>
                <SwiperSlide><img src={slide4} alt="" /><h3>Degpegers</h3></SwiperSlide>
                <SwiperSlide><img src={slide5} alt="" /><h3>Salads</h3></SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Categary;