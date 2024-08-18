import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import './Testimonials.css';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/review')
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);
    return (
        <section>
            <SectionTitle hading={'TESTIMONIALS'} subHading={'What Our Client Say'}></SectionTitle>
            <div className="">
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                    {
                        reviews.map(review =>
                            <SwiperSlide key={review._id}>
                                <div className="wsipe_pading">
                                    <Rating className="rating_containt"
                                        style={{ maxWidth: 150 }}
                                        value={review.rating
                                        }
                                        readOnly
                                    />
                                    <p>{review.details}</p>
                                    <h1>{review.name}</h1>
                                </div>
                            </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;
