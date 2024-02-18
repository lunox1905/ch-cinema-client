import classNames from "classnames/bind";
import styles from './Profile.module.scss';
import { useContext, useEffect, useState } from "react";
import { Table } from 'react-bootstrap';
import Loading from "../../components/Loading";
import { getBooking } from "../../contexts/BookingContext";
import { MovieContext} from '../../contexts/MovieContext'
import { CinemaContext} from '../../contexts/CinemaContext'
import convertDate from "../../utils/convertDate";
import convertPrice from '../../utils/convertPrice'
import ShowQRCode from './ShowQRCode'
import QRCode from "react-qr-code";
const cx = classNames.bind(styles)

function InfoProfile ({user, editPassWord}) {
    const [ show, setShow ] = useState(false)
    const [ value, setValue ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [ bookings, setBookings ] = useState([])
    const { movieState: {movies} } = useContext(MovieContext)
    const { cinemaState: {cinemas} } = useContext(CinemaContext)
    console.log(cinemas)
    useEffect(() => {
        getBooking()
        .then(res => {
            if(res.success) {
                setBookings(res.booking)
                console.log(res.booking)
            }
        })
    }, [])
    if(loading) {
        return <Loading/>
    }
    return (
        <>
        {show && <ShowQRCode value={value} setShow={setShow}/>}
        <Table striped>
            <thead>
                <tr>
                    <th>Ngày giao dịch</th>
                    <th>Phim</th>
                    <th>Rạp chiếu</th>
                    <th>Đơn giá</th>
                    <th>Vé</th>
                </tr>
            </thead>
            <tbody>
                {
                    bookings.map(b => (
                        <tr>
                            <td>{convertDate(b.createdAt)}</td>
                            <td className={cx('col')}>
                                {
                                    movies.find(m => m._id === b.movieId).title
                                }
                            </td>
                            <td className={cx('col')}>
                                {
                                    cinemas.find(c => c._id === b?.cinemaId).name
                                }
                            </td>
                            <td className={cx('col')}>{convertPrice(b.price)}</td>
                            <td onClick={() => {
                                setValue(b._id)
                                setShow(true)
                            }}>
                                <QRCode
                                size={256}
                                style={{ height: "60px", maxWidth: "60px", width: "100%" }}
                                value={b._id}
                                viewBox={`0 0 256 256`}
                                />
                            </td>
                            {/* <td onClick={() => {
                                setValue(`Phim: ${movies.find(m => m._id === b.movie).title}, ` +
                                `Cinema: ${cinemas.find(c => c._id === b.cinema).name}, `+
                                `Seat: ${b.seat.map(s => s + ', ')}, ` +
                                `Food: ${b.food.map(f => (
                                    `Name: ${f.id.title}, amount: ${f.amount}`
                                ))}`)
                                setShow(true)
                            }}>
                                <QRCode
                                size={256}
                                style={{ height: "60px", maxWidth: "60px", width: "100%" }}
                                value={`Phim: ${movies.find(m => m._id === b.movie).title}, ` +
                                    `Cinema: ${cinemas.find(c => c._id === b.cinema).name}, `+
                                    `Seat: ${b.seat.map(s => s + ', ')}, ` +
                                    `Food: ${b.food.map(f => (
                                        `Name: ${f.id.title}, amount: ${f.amount}`
                                    ))}`}
                                viewBox={`0 0 256 256`}
                                />
                            </td> */}
                        </tr>
                    ))
                }
            </tbody>
        </Table>
        </>
    )
}

export default InfoProfile