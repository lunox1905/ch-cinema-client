import Carousel from 'react-bootstrap/Carousel';
import "./Banner.scss"
import { URL } from '../../contexts/constants';
import axios from 'axios';
import { useEffect, useState, meno } from 'react';
import Loading from '../Loading';
import { Link } from 'react-router-dom';
const Banner = () => {
    const [slides, setSlides] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`http://${URL}/getbanner`)
        .then(response => {
            setSlides(response.data.banner)
            setLoading(false)
        })
        .catch(error => {
            console.log(error);
        });
    }, [])

    if(loading) return <Loading />

    return (
        <Carousel>
            {
                slides.map((slide) => (
                    <Carousel.Item interval={2000}>
                        <Link to={slide.link}>
                            <img
                            className="d-block w-100"
                            src={slide.image}
                            alt="banner"
                            />
                        </Link>
    
                    </Carousel.Item>
                ))
            }
      
     </Carousel>
    )
}

export default memo(Banner)
