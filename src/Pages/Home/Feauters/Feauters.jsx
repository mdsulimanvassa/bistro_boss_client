import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import './Feauters.css';
import feauters from '../../../images/featured.jpg';

const Feauters = () => {
    return (
        <div className='bd_url'>
            <SectionTitle
            subHading={'Check it out'}
            hading={'FROM OUR MENU'}
            ></SectionTitle>
            <div className="display_flex">
                <div className="">
                    <img src={feauters} alt="" />
                </div>
                <div className="text-color-containt">
                    <h2>Merch 20, 2024</h2>
                    <h3>WHARE CAN I GET SOME?</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut odit earum exercitationem iste aliquam tempore voluptas quaerat et accusantium eum, quo sit assumenda! Labore vero quis quidem blanditiis adipisci temporibus ad iste voluptatibus aut ducimus. Maiores debitis odit culpa? Obcaecati qui eaque, nulla vitae provident voluptatum aliquam ipsa quisquam cupiditate?</p>
                    <button>READ MORE</button>
                </div>
            </div>
        </div>
    );
};

export default Feauters;