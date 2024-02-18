import classNames from "classnames/bind";
import styles from './Movie.module.scss'
import { MovieContext } from '../../contexts/MovieContext';
import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { FaClock, FaPlay, FaStar } from "react-icons/fa";
import InfoMovie from './InfoMovie'
import Loading from '../../components/Loading'
import Trailer from "./Trailer";
import HeadingTitle from "../../components/HeadingTitle";
import MovieItem from "../../components/MovieItem";
import Rating from "./Rating";
import ShowTime from "./ShowTime";
const cx = classNames.bind(styles)

function Home () {
    const [show, setShow] = useState(false);
    const [showListRating, setShowListRating] = useState(false)
    const { movieState: { movie, movies }, getMovie, updateRating} = useContext(MovieContext)
    const params = useParams()
    const [ loading, setLoading ] = useState(true)
    useEffect(() => {
        getMovie(params.slug)
        .then(res => {
            if(res.movie) {
                setLoading(false)
            }
        })
        
        
    }, [params.slug])

    const handleDate = (date) => {
        const d = new Date(date)
        return  `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`
    }
    if(loading) {
        return <Loading/>
    }
    return (
        <div className={cx('wrapper')}>
            
            <Container>
                <Breadcrumb style={{"--cui-breadcrumb-divider": "'';"}}>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/">Đặt vé</Breadcrumb.Item>
                    <Breadcrumb.Item active>{movie?.title}</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col lg='8' sm='12'>
                        <Row>
                            <Col lg='4'>
                                <div className={cx('image')}>
                                    <img src={movie?.image} alt='image-movie'/>
                                    <button onClick={() => setShow(true)}>
                                        <FaPlay />
                                    </button>
                                </div>
                            </Col>
                            <Col lg='8'>
                                <div className={cx('detail-movie')}>
                                    <h2>{movie?.title}</h2>
                                    <h2 className={cx('title_vi')}>{movie?.titleVi}</h2>
                                    <div className={cx('rating')}>
                                        <FaStar/>
                                        <div className={cx('score')}>
                                            <p>{movie?.rating.score}/10</p>
                                            <p>{movie?.rating.amount}</p>
                                        </div>
                                        <button onClick={() => setShowListRating(true)}>Đánh giá</button>
                                        <Rating show={showListRating} id={movie?._id} updateRating={updateRating}/>
                                    </div>
                                    <InfoMovie title={<FaClock/>} content={movie?.duration + ' phút'}/>
                                    <InfoMovie title={'Thể loại'} content={movie?.category}/>
                                    <InfoMovie title={'Quốc gia'} content={movie?.country}/>
                                    <InfoMovie title={'Đạo diễn'} content={movie?.director}/>
                                    <InfoMovie title={'Diễn viên'} content={movie?.cast}/>
                                    <InfoMovie title={'Nhà sản xuất'} content={movie?.producer}/>
                                    <InfoMovie title={'Ngày khởi chiếu'} content={handleDate(movie?.premiereDate)}/>
                                </div>
                            </Col>
                        </Row>
                        <div className={cx('content')}>
                            <HeadingTitle title={'NỘI DUNG'}/>
                            <p>{movie?.description}</p>
                        </div>

                        <div className={cx('show-time')}>
                            <HeadingTitle title={'LỊCH CHIẾU'}/>
                            <ShowTime id={movie?._id}/>
                        </div>
                    </Col>
                    <Col lg='4' sm='12'>
                        <div className={cx('movie-other')}>
                            <div className={cx('container-other')}>
                                <HeadingTitle title={'PHIM ĐANG CHIẾU'}/>
                                <div className={cx('box-other')}>
                                    <Row md={12}>
                                        {
                                            movies.map((movie, index) =>  {
                                                const now = new Date()
                                                const date = new Date(movie.premiereDate.toString())
                                                if(movie.state && now > date && index < 3) {
                                                    return (
                                                        <MovieItem movie={movie} width={'254px;'} height={'350px;'}/>
                                                        )
                                                }
                                            })
                                        }
                                        
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                
            </Container>
            {
                show ? <Trailer link={movie?.trailer} setShow={setShow} title={movie?.title}/> : <></>
            }
            
        </div>
    )
}

export default Home