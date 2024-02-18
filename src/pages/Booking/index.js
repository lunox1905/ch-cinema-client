import classNames from "classnames/bind";
import styles from './Booking.module.scss'
import { MovieContext } from '../../contexts/MovieContext';
import { FoodContext } from '../../contexts/FoodContext'
import { CinemaContext } from '../../contexts/CinemaContext'
import { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import Food from './Food'
import ChooseSeat from './ChooseSeat'
import Payment from "./Payment";
import Loading from '../../components/Loading'
import { ShowTimeContext } from "../../contexts/ShowTimeContext";
import { AuthContext } from "../../contexts/AuthContext";
import Auth from '../../components/Auth'
import convertPrice from "../../utils/convertPrice";
import { LOCAL_STORAGE_TOKEN_NAME } from "../../contexts/constants";
const cx = classNames.bind(styles)
var price = 0
var time
function Booking () {
    const { movieState: {movies}} = useContext(MovieContext)
    const { getFoods } = useContext(FoodContext)
    const { cinemaState: { cinemas }} = useContext(CinemaContext)
    const { authState: {user, isAuthenticated }, loadUser} = useContext(AuthContext)
    const { getShowTime } = useContext(ShowTimeContext)
    const params = useParams()
    const [ showTime, setShowTime ] = useState(null)
    const [ foods, setFoods ] = useState([])
    const [ numberOfSeat, setNumberOfSeat ] = useState(0)
    const [ loading, setLoading] = useState(true)
    const [ chooseSeat, setChooseSeat ] = useState([])
    const [ selectedFood, setSelectedFood ] = useState([])
    const [ showComponent, setShowComponent ] = useState(0)
    const [ showLogin, setShowLogin ] = useState(false)

    const movie = movies.find(movie => movie._id === showTime?.movieId)
    const cinema = cinemas.find(c => c._id === showTime?.cinemaId)
    const sumFood = selectedFood.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount * foods.find(f => f._id === currentValue.id).price,
        0
    );
    useEffect(() => {
        getShowTime(params.id)
            .then(res => {
                if(res.success) {
                    setShowTime(res.showTime)
                    price = res.showTime.price
                    time = res.showTime.time
                }
                getFoods()
                    .then(res => {
                        if(res.success) {
                            setLoading(false)
                            setFoods(res.food)
                        }
                    })
            })
        if(!localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setShowLogin(true)
        }
    }, [showComponent])
    const innerFood = (food, i) => {
        const f = foods.find(f => f._id === food?.id)
        if(food?.amount > 1) {
            return (
                <span>{f.title} <span className={cx('small')}>{'('+food.amount+')'}</span>{i < selectedFood.length - 1 ? ', ' : ''}</span>
            )
        } else {
            return (
                <span>{f.title}</span>
            )
        }
    }
    const showComponentFunc = () => {
        switch(showComponent) {
            case 0: 
                return <Food foods={foods} 
                    selectedFood={selectedFood} 
                    setSelectedFood={setSelectedFood}
                    numberOfSeat={numberOfSeat}
                    setNumberOfSeat={setNumberOfSeat}
                    moviePrice={price}
                />
            case 1:
                return <ChooseSeat cinema={cinema}
                    numberOfSeat={numberOfSeat} 
                    chooseSeat={chooseSeat}
                    setChooseSeat={setChooseSeat}
                    seatsAvailable={showTime.seats_available}
                />
            case 2:
                return <Payment setShowComponent={setShowComponent}
                    showTime={showTime}
                    selectedFood={selectedFood} 
                    chooseSeat={chooseSeat}
                    sum={sumFood + (numberOfSeat*price)}
                />
            default:
                return
        }
    }
    if(loading) return <Loading/>
    return (
        <div className={cx('wrapper')}>
            {showLogin && <Auth setShow={setShowLogin}/>}
            <Container>
                <Breadcrumb style={{"--cui-breadcrumb-divider": "'';"}}>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/">Đặt vé</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col lg='12'>
                        <Row>
                            <Col lg='9'>
                                {
                                    showComponentFunc()
                                }
                            </Col>
                            <Col lg='3'>
                                <div className={cx('ticket')}>
                                    <img src={movie?.image}/>
                                    <h2>{movie?.title}</h2>
                                    <div>
                                        <p>Rạp:</p>
                                        <span>{cinema?.name}</span>
                                    </div>
                                    <div>
                                        <p>Suất chiếu:</p>
                                        <span>{time}</span>
                                    </div>
                                    <div>
                                        <p>Combo:</p>
                                        {
                                            selectedFood.map((s,i) => (
                                                innerFood(s,i)
                                            ))
                                        }
                                    </div>
                                    <div>
                                        <p>Chỗ ngồi:</p>
                                        {
                                            chooseSeat?.map((c,i) => {
                                                if(i < chooseSeat.length - 1) {
                                                    return (
                                                        <span>{c + ', '}</span>
                                                    )
                                                } else return (
                                                    <span>{c}</span>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className={cx('sum')}>
                                        <p>Tổng:</p>
                                        <p>{convertPrice(sumFood + (numberOfSeat*price))} VNĐ</p>
                                    </div>
                                    <div>
                                        {
                                            (showComponent === 0) && <button onClick={() => {
                                                if(numberOfSeat > 0) setShowComponent(1)
                                            }}>TIẾP TỤC</button> 
                                        }
                                        {
                                            (showComponent === 1) && (
                                                <>
                                                <button onClick={() => {setShowComponent(0)
                                                }}>QUAY LẠI
                                                </button>
                                                <button onClick={() => {
                                                    if(!user) {
                                                        setShowLogin(true)
                                                    }
                                                    else if(chooseSeat.length === numberOfSeat) setShowComponent(2)
                                                }}>TIẾP TỤC
                                                </button>
                                                </>
                                            )  
                                        }
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                
            </Container>
            
            
        </div>
    )
}

export default Booking