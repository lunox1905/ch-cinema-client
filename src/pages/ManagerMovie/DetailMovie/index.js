import classNames from "classnames/bind";
import styles from './DetailMovie.module.scss';
import { useState, useContext, useEffect } from "react";
import { MovieContext } from "../../../contexts/MovieContext";
import { Button, Col, Row, Container } from 'react-bootstrap'
import 'react-calendar/dist/Calendar.css';
import Loading from '../../../components/Loading'
import { useNavigate, useParams } from "react-router-dom";
const cx = classNames.bind(styles)

function EditMovie () {

    const { getMovie } = useContext(MovieContext)

    const [ movies, setMovie ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        getMovie(params.slug)
            .then(res => {
                if(res.success) {
                    setMovie(res.movie)
                    setLoading(false)
                }
            })
    }, [params.slug])


    if(loading) return <Loading />
    return (
        <div className={cx('wrapper')}>
    
            <Container>
                <Row>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Tên phim</span>
                            <p>{movies.title}</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Tên phim tiếng việt</span>
                            <p>{movies.title}</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Thời lượng</span>
                            <p>{movies.duration}</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Đạo diễn</span>
                            <p>{movies.director}</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Nhà sản xuất</span>
                            <p>{movies.producer}</p>
                        </div>
                    </Col>
                    
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Image</span>
                            <img src={movies.image} alt='image poster'/>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Trailer</span>
                            <p>{movies.trailer}</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Diễn viên</span>
                            <p>
                            {   

                                movies.cast.map((item, index) => {
                                    return index + 1 === movies.length ? item : item + ', ' 
                                })  
                            }
                            </p>
                        </div>
                    </Col>

                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Nước sản xuất</span>
                            <p>{movies.country}</p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Thể loại</span>
                            <p>
                            {   
                                movies.category.map((item, index) => {
                                    return index + 1 === movies.length ? item.title : item.title + ', ' 
                                })  
                            }
                            </p>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Ngày khởi chiếu</span>
                            <p>{movies.premiereDate}</p>
                        </div>
                    </Col>
                    <Col lg={12}>
                        <div className={cx('item')}>
                            <span>Nội dung</span>
                            <p>{movies.description}</p>
                        </div>
                    </Col>
                </Row>
                
                <div className={cx('option')}>      
                    <Button size="lg" variant="outline-primary" onClick={() => navigate(-1)}>Trở lại</Button>
                 
                </div>
            </Container>
        </div>
    )
}

export default EditMovie