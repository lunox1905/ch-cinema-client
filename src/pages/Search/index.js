import classNames from "classnames/bind";
import styles from './Search.module.scss'
import { MovieContext } from '../../contexts/MovieContext';
import { useContext, useState } from "react";
import { Container, Row, Col} from 'react-bootstrap';
import { Link, useParams, useSearchParams } from "react-router-dom";
import MovieItem from "../../components/MovieItem";

const cx = classNames.bind(styles)

function Movie () {
    const [searchParams, setSearchParams] = useSearchParams();
    const { movieState: { movies }} = useContext(MovieContext)
    const moviesFilter = movies.filter((movie) => {
        return movie.title.toLowerCase().indexOf(searchParams.get("title").toLowerCase()) !== -1;
    })
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}> 
                <div className={cx('result_search')}>
                    <h3>KẾT QUẢ TÌM KIẾM: </h3>
                    <h3>{searchParams.get("title")}</h3>
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