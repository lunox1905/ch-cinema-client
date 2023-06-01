import classNames from "classnames/bind";
import styles from './BuyTicket.module.scss'
import { MovieContext } from '../../contexts/MovieContext';
import { CinemaContext } from '../../contexts/CinemaContext';
import { ShowTimeContext } from '../../contexts/ShowTimeContext'
import { useContext, useEffect, useState } from "react";
import { Row, Col} from 'react-bootstrap';
import ShowTime from "./ShowTime";
import convertDate from "../../utils/convertDate";

const cx = classNames.bind(styles)

function ByMovie () {

    const { movieState: { movies }} = useContext(MovieContext)
    const { cinemaState: { cinemas }} = useContext(CinemaContext)
    const { getShowTimeByMovie } = useContext(ShowTimeContext)
    const [ movie, setMovie ] = useState(null)
    const [ cinema, setCinema ] = useState(null)
    const [ showTimes, setShowTimes ] = useState([])
    const moviesFilter = movies.filter((movie) => {
        return movie.state
    })
    const showTimeFilter = []
    if(cinema && movie) {
        showTimes.forEach((item, index) => {
            if(item.cinema._id === cinema) {
                if(index === 0) {
                    showTimeFilter.push({
                        showTime: [{
                            time: item.time,
                            _id: item._id
                        }],
                        date: convertDate(item.date)
                    })
                }
                else {
                    const f = showTimeFilter.find(f => f.date === convertDate(item.date))
                    if(f) {
                        f.showTime.push({
                            time: item.time,
                            _id: item._id
                        })
                    } else {
                        showTimeFilter.push({
                            showTime: [{
                                time: item.time,
                                _id: item._id
                            }],
                            date: convertDate(item.date)
                        })
                    }
                }
            }
        })
    }
    useEffect(() => {
        if(movie) {
            getShowTimeByMovie(movie)
            .then(res => {
                if(res.success) {
                    setShowTimes(res.showTime)
                }
            })
        }
    }, [movie])
    return (
        <Row md={3}>
            <Col>
                <ul>
                    <div className={cx('header_showtime')}>
                        <h3>CHỌN PHIM</h3>
                    </div>
                    {
                        moviesFilter.map(m => (
                            <li onClick={() => setMovie(m._id)}>
                                <img src={m.image}/>
                                <span>{m.title}</span>
                            </li>
                        ))
                    }
                </ul>
            </Col> 
            <Col>
                <ul>
                    <div className={cx('header_showtime')}>
                        <h3>CHỌN RẠP</h3>
                    </div>
                    {
                        movie ? cinemas.map(c => {
                            if(showTimes.find(s => s.cinema._id === c._id)) {
                                return (
                                    <li onClick={() => setCinema(c._id)}>{c.name}</li>
                                )
                            }
                        }) :
                        <div className={cx('notification')}>Vui lòng chọn rạp chiếu</div>
                    }
                </ul>
            </Col>
            <Col>
                <div className={cx('showtime_wrapper')}>
                    <div className={cx('header_showtime')}>
                        <h3>CHỌN SUẤT</h3>
                    </div>
                    {
                        cinema ? showTimeFilter.map(s => (
                            <ShowTime date={s.date} showTime={s.showTime}/>
                        )) : <div className={cx('notification')}>Vui lòng chọn rạp chiếu</div>
                    }
                </div>
            </Col>
        </Row>
    )
}

export default ByMovie