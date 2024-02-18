import classNames from "classnames/bind";
import styles from './Movie.module.scss'
import { useContext, useEffect, useState, memo } from "react";
import Loading from '../../components/Loading'
import { ShowTimeContext } from "../../contexts/ShowTimeContext";
import { CinemaContext } from '../../contexts/CinemaContext'
import ShowTime from "../../components/ShowTime";
import Calendar from "react-calendar";
import { FaCalendar } from "react-icons/fa";

const cx = classNames.bind(styles)

function ShowTimes ({id}) {
   
    const [showTime, setShowTime] = useState(null)
    const { getShowTimeByMovie } = useContext(ShowTimeContext)
    const { cinemaState: { cinemas} } = useContext(CinemaContext)
    const [ loading, setLoading ] = useState(true)
    const dateNow = new Date()
    const [ date, setDate ] = useState(dateNow.getFullYear()+ '-' +(dateNow.getMonth() + 1)+ '-' +dateNow.getDate())
    const [ showCalendar, setShowCalendar ] = useState(false)
    const [ cinema, setCinema ] = useState(cinemas[0].name)
    useEffect(() => {
        if(id) {
            getShowTimeByMovie(id)
            .then(res => {
                if(res.success) {
                    const show = [] 
                    res.showTime.forEach((item, index) => {
                        if(index === 0) {
                            show.push({
                                cinema: item.cinemaId.name,
                                showTime: [{
                                    time: item.time,
                                    _id: item._id
                                }],
                                date: item.date
                            })
                        } else {
                            const f = show.find(f => f.cinema === item.cinemaId.name)
                            if(f) {
                                f.showTime.push({
                                    time: item.time,
                                    _id: item._id
                                })
                            } else {
                                show.push({
                                    cinemaId: item.cinemaId.name,
                                    showTime: [{
                                        time: item.time,
                                        _id: item._id
                                    }],
                                    date: item.date
                                })
                            }
                        }
                    })
                    setShowTime(show)
                }
            })
        setLoading(false)
        }
    }, [id])

    const updateCalendar = e => {
        const d = new Date(e)
        setDate(d.getFullYear()+ '-' +(d.getMonth() + 1)+ '-' +d.getDate())
        setShowCalendar(false)
    }
    const showTimeFilter = showTime?.filter(showTime => (new Date(showTime.date).getDay() === new Date(date).getDay() 
        && showTime.cinema.indexOf(cinema) !== -1))
    if(loading) {
        return <Loading/>
    }
    return (
        <div className={cx('showtime_wrapper')}>
            <div className={cx('option')}>
                <select onChange={e => {setCinema(e.target.value)}} value={cinema}>
                    {
                        cinemas.map((cinema, index) => (
                            <option value={cinema.name}>{cinema.name}</option>
                        ))
                    }
                </select>
                <div className={cx('option_calendar')}>
                    <input value={date}/>
                    
                    <FaCalendar onClick={() => setShowCalendar(!showCalendar)}/>

                    <div className={cx('calendar')} style={showCalendar ? {display: 'block'} : {display: 'none'}}>
                    <Calendar onChange={e => {
                        updateCalendar(e)
                    }}/>
                    </div>
                </div>
            </div>
            {
                showTimeFilter?.map(item => (
                    <ShowTime cinema={item.cinema} showTime={item.showTime}/>
                ))
            }
        </div>
    )
}

export default memo(ShowTimes)