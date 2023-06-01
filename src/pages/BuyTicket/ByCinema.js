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
    const { getShowTimeByCinema } = useContext(ShowTimeContext)
    const [ movie, setMovie ] = useState(null)
    const [ cinema, setCinema ] = useState(null)
    const [ showTimes, setShowTimes ] = useState([])
    const moviesFilter = movies.filter((movie) => {
        return movie.state
    })
    const showTimeFilter = []
    if(cinema && movie) {
        showTimes.forEach((item, index) => {
            if(item.movie._id === movie) {
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
        if(cinema) {
            getShowTimeByCinema(cinema)
            .then(res => {
                console.log(res)
                if(res.success) {
                    setShowTimes(res.showTime)
                }
            })
        }
    }, [cinema])
    return (
        <Row md={3}>
            <Col>
                <ul>
                    <div className={cx('header_showtime')}>
                        <h3>CHỌN RẠP</h3>
                    </div>
                    {
                        cinemas.map(c => (
                            <li onClick={() => setCinema(c._id)}>{c.name}</li>    
                        ))
                    }
                </ul>
            </Col>
            <Col>
                <ul>
                    <div className={cx('header_showtime')}>
                        <h3>CHỌN PHIM</h3>
                    </div>
                    {
                        moviesFilter.map(m => {
                            if(showTimes.find(s => s.movie._id === m._id)) {
                                return (
                                <li onClick={() => setMovie(m._id)}>
                                    <img src={m.image}/>
                                    <span>{m.title}</span>
                                </li>
                            )}
                        })
                    }
                </ul>
            </Col> 
            <Col>
                <div className={cx('showtime_wrapper')}>
                    <div className={cx('header_showtime')}>
                        <h3>CHỌN SUẤT</h3>
                    </div>
                    {
                        showTimeFilter.map(s => (
                            <ShowTime date={s.date} showTime={s.showTime}/>
                        ))
                    }
                </div>
            </Col>
        </Row>
    )
}

export default ByMovie