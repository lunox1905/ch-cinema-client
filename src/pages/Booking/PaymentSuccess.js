import classNames from "classnames/bind";
import styles from './Booking.module.scss'
import { useEffect, useState, useContext } from "react";
import { MovieContext } from "../../contexts/MovieContext";
import convertPrice from "../../utils/convertPrice";
import { Link, useLocation } from "react-router-dom";
import { addBooking } from "../../contexts/BookingContext";

const cx = classNames.bind(styles)
function VnpayPayment() {
  const { movieState: {movies}} = useContext(MovieContext)
  const [ ticket, setTicket] = useState([])
  const [ paymentSuccess, setPaymentSuccess ] = useState(true)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Lấy giá trị của 'search' và 'value' từ URL
  const vnp_ResponseCode = searchParams.get('vnp_ResponseCode');
  const vnp_TransactionStatus = searchParams.get('vnp_TransactionStatus');
  useEffect(() => {
    if(vnp_TransactionStatus === '00') {
      const t = JSON.parse(sessionStorage.getItem('ticket'))
      setTicket(t)
      const booking = {
          ticket: t,
          idShowTime: sessionStorage.getItem('idShowTime')
      }
      addBooking(booking)
      .then((res) => {
        setPaymentSuccess(true)
      })
    } else {
      setPaymentSuccess(false)
    }
    
    
  }, [])
  return (
    <div className={cx('wrapper')}>
      {paymentSuccess ? (
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
      ) : (
        <div className={cx('payment_success')}>
          <img src="https://printme.online/wp-content/uploads/2020/04/payment_fail_icon.png" alt="payment success"/>
          <h1>Thanh toán thất bại</h1>
          <div className={cx('item')}>
            <p>Thanh toán không thành công, vui lòng thử lại!</p>
          </div>
         
          <div className={cx('btn_option')} style={{justifyContent: "center"}}>
            <button>
              <Link to='/'>Quay lại</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VnpayPayment;