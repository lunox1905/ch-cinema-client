import { Alert } from "react-bootstrap"
import classNames from "classnames/bind"
import styles from './ManagerShowTime.module.scss'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useContext, useRef, useState } from "react";
import Calendar from "react-calendar";
import { FaCalendar } from "react-icons/fa";
import { CinemaContext } from "../../contexts/CinemaContext";
import { MovieContext } from "../../contexts/MovieContext";

const cx = classNames.bind(styles)

const prices = [60000, 70000, 85000, 90000]
function AddShowTime ({ setShow, title, setLoading, addShowTime}) {

    const { cinemaState: {cinemas }} = useContext(CinemaContext)
    const { movieState: { movies }} = useContext(MovieContext)

    const [ movie, setMovie ] = useState('')
    const [ cinema, setCinema ] = useState(cinemas ? cinemas[0]._id : null)
    const [ date, setDate ] = useState('')
    const [ time, setTime ] = useState('')
    const [ price, setPrice ] = useState(prices[0])
    const [ listMovie, setListMovie ] = useState(null)
    const [ showCalendar, setShowCalendar ] = useState(false)
    const [ validated, setValidated ] = useState(false)
    const searchRef = useRef()
    const handleSearchMovie = (e) => {
        if(e.target.value) {
            const moviesFilter = movies.filter((item) => {
                return item.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
                });
            if(moviesFilter.length > 0) setListMovie(moviesFilter)
        } else {
            setListMovie(null)
        }
    }

    const updateCalendar = e => {
        const d = new Date(e)
        setDate(d.getFullYear()+ '-' +(d.getMonth() + 1)+ '-' +d.getDate())
        setShowCalendar(false)
    }
    
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
            const showTime = {movie, cinema, date, time, price}
            setLoading(true)
            addShowTime(showTime)
            .then(response => {
                if(response.success) {
                    setLoading(false)
                    setShow(false)
                }
            })
            .catch(error => {
                console.log(error);
            })
            
        }
        setValidated(true);
    };
    return (
        <div className={cx('alert-wrapper')}>
            
            <Alert variant="light" onClose={() => setShow(false)} dismissible>
                <div style={{width: '600px', height: '140px;'}}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Container>
                            <h4>{title}</h4>
                                <Row>
                                    <Col md='12'>
                                        
                                        <div className={cx('search_movie')}>
                                            <span>Tên phim</span>
                                            <input title={'Tên phim'} placeholder={'Tên phim'} ref={searchRef} 
                                                onChange={handleSearchMovie} className="form-control" required/> 
                                            <ul style={listMovie ? {display: 'block'} : {display: 'none'}}>
                                                {
                                                    listMovie?.map((movie, index) => (
                                                        <li key={index} onClick={() => {
                                                            searchRef.current.value = movie.title
                                                            setListMovie(null)
                                                            setMovie(movie._id)
                                                        }}>{movie.title}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                        <div className={cx('addShowTime_item')}>
                                            <span>Rạp chiếu</span>
                                            <select value={cinema} onChange={e => setCinema(e.target.value)}>
                                                {
                                                    cinemas.map(cinema => (
                                                        <option value={cinema._id}>{cinema.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className={cx('addShowTime_item')}>
                                            <span>Ngày chiếu</span>
                                            <div className={cx('box')}>
                                                <input className="form-control" value={date} required/>
                                                <FaCalendar onClick={() => setShowCalendar(!showCalendar)}/>

                                                <div className={cx('calendar')} style={showCalendar ? {display: 'block'} : {display: 'none'}}>
                                                <Calendar onChange={e => {
                                                    updateCalendar(e)
                                                }}/>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div className={cx('addShowTime_item')}>
                                            <span>Giờ chiếu</span>
                                            <input placeholder="Giờ chiếu vd: 20:20" onChange={e =>setTime(e.target.value)} value={time} 
                                                className="form-control" required/>
                                        </div>
                                        <div className={cx('addShowTime_item')}>
                                            <span>Giá vé</span>
                                            <select value={price} onChange={e => setPrice(e.target.value)}>
                                                {
                                                    prices.map(price => (
                                                        <option value={price}>{price/1000}.000đ</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </Col>
                                </Row>
                            
                            <Button variant="primary" type="submit">Thêm</Button>

                        </Container>
                    </Form>
                </div>
            </Alert>
        </div>
    )
} 

export default AddShowTime