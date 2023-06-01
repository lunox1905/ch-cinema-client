import classNames from "classnames/bind";
import styles from './Movie.module.scss'
import Banner from "../../components/Banner";
import { MovieContext } from '../../contexts/MovieContext';
import { useContext, useState } from "react";
import { Container, Row, Col} from 'react-bootstrap';
import { Link } from "react-router-dom";
import MovieItem from "../../components/MovieItem";

const cx = classNames.bind(styles)

function Movie () {

    const { movieState: { movies }} = useContext(MovieContext)
    const [ stateMovie, setStateMovie ] = useState(true) 
   
    const moviesFilter = movies.filter((movie) => {
        const now = new Date()
        const date = new Date(movie.premiereDate.toString())
        return (now > date) === stateMovie && movie.state
    })
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}> 
                <div className={cx('option')}>
                    <ul>
                        <li onClick={() => setStateMovie(true)} className={stateMovie === true ? cx('active') : null}>PHIM ĐANG CHIẾU</li>
                        <li onClick={() => setStateMovie(false)} className={stateMovie === false ? cx('active') : null}>PHIM SẮP CHIẾU</li>
                    </ul>
                </div>
                <Container>
                    <Row md={4}>
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

export default Movie