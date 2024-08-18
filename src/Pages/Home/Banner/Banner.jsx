import './Banner.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../../images/01.jpg';
import img2 from '../../../images/02.jpg';
import img3 from '../../../images/03.jpg';
import img4 from '../../../images/04.jpg';
import img5 from '../../../images/04.jpg';

const Banner = () => {
    return (
        <div>
            <Carousel>
                <div className='height-main'>
                    <img src={img4} />

                </div>
                <div className='height-main'>
                    <img src={img2} />
                </div>
                <div className='height-main'>
                    <img src={img3} />
                </div>
                <div className='height-main'>
                    <img src={img1} />
                </div>
                <div className='height-main'>
                    <img src={img5} />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;