import './sectionTitle.css';

const SectionTitle = ({hading, subHading}) => {
    return (
        <div className='hading'>
            <p>...{subHading}...</p>
            <h1>{hading}</h1>
        </div>
    );
};

export default SectionTitle;