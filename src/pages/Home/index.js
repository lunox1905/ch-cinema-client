import classNames from "classnames/bind";
import styles from './Home.module.scss'
import Banner from "../../components/Banner";
import { MovieContext } from '../../contexts/MovieContext';
import { useContext, useState } from "react";
import { Container, Row, Col} from 'react-bootstrap';
import axios from "axios";
import MovieItem from "../../components/MovieItem";

const cx = classNames.bind(styles)

function Home () {
    
    const { movieState: { movies }} = useContext(MovieContext)
    const [ stateMovie, setStateMovie ] = useState(true) 
    const moviesFilter = []
    movies.forEach(m => {
        const now = new Date()
        const date = new Date(m.premiereDate.toString())
        if((now > date) === stateMovie && m.state) {
            moviesFilter.push(m)
        }
        if(moviesFilter.length > 8) {
            return
        }
    })
    return (
        <div className={cx('wrapper')}>
            <Banner/>
            <div className={cx('container')}> 
                <div className={cx('option')}>
                    <ul>
                        <li onClick={() => setStateMovie(true)} className={stateMovie === true ? cx('active') : null}>PHIM ĐANG CHIẾU</li>
                        <li onClick={() => setStateMovie(false)} className={stateMovie === false ? cx('active') : null}>PHIM SẮP CHIẾU</li>
                    </ul>
                </div>
                <Container>
                    <Row lg={4} md={3} sm={1}>
                        {
                            moviesFilter ? moviesFilter.map(movie => (
                                <Col>
                                    <MovieItem movie={movie}/>
                                </Col>
                            )) : <></>
                        }
                    </Row>
                </Container>
            </div>
            
        </div>
    )
}

export default Home