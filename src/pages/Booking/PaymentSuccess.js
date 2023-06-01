import classNames from "classnames/bind";
import styles from './Booking.module.scss'
import { useEffect, useState, useContext } from "react";
import { MovieContext } from "../../contexts/MovieContext";
import convertPrice from "../../utils/convertPrice";
import { Link } from "react-router-dom";
import { addBooking } from "../../contexts/BookingContext";

const cx = classNames.bind(styles)
function VnpayPayment() {
  const { movieState: {movies}} = useContext(MovieContext)
  const [ ticket, setTicket] = useState([])
  useEffect(() => {
    
    const t = JSON.parse(sessionStorage.getItem('ticket'))
    setTicket(t)
    const booking = {
        ticket: t,
        idShowTime: sessionStorage.getItem('idShowTime')
    }
    addBooking(booking)
    .then((res) => {
      
    })
    
  }, [])
  return (
    <div className={cx('wrapper')}>
      <div className={cx('payment_success')}>
          <img src="https://cdn-icons-png.flaticon.com/512/148/148767.png" alt="payment success"/>
          <h1>Thanh toán thành công</h1>
          <div className={cx('item')}>
            <span>Phim:</span>
            <p>{movies.find(movie => movie._id === ticket.movie)?.title}</p>
          </div>
          <div className={cx('item')}>
            <span>Giá vé:</span>
            <p>{convertPrice(ticket.price)}đ</p>
          </div>
          <div className={cx('btn_option')}>
            <button>
              <Link to='/'>Quay lại</Link>
            </button>
            <button>
              <Link to='/thanh-vien'>Xem vé</Link>
            </button>
          </div>
        </div>
    </div>
  );
}

export default VnpayPayment;