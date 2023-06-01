import classNames from "classnames/bind";
import styles from './Booking.module.scss'
import { useContext, useState } from "react";
import { AuthContext } from '../../contexts/AuthContext'
import querystring from 'qs'
import crypto from 'crypto-js'
const cx = classNames.bind(styles)

const typePayments = [
    'VNPAY', 'MoMo', 'ZaloPay'
]

function sortObject(obj) {
    var sorted = {};
    var str = [];
    var key;
    for (key in obj){
        if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

const createDate = () => {
    const d = new Date()
    let date = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()]
    let t = ''
    date.map(d => {
        if(d < 10) {
            return t += '0'+d
        } else return t += d
    })
    return t
}

function Payment ({setShowComponent, showTime, selectedFood, chooseSeat, sum}) {
    const [ typePayment, setTypePayment ] = useState(typePayments[0])
    const { authState: { user }} = useContext(AuthContext)
   
    const handlePayment = () => {
        const ticket = {
            cinema: showTime.cinema,
            movie: showTime.movie,
            food: selectedFood,
            seat: chooseSeat,
            price: sum,
            user: user._id
        }
        
        var vnpUrl ='https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'
          
            var vnp_Params = {};
            vnp_Params['vnp_Version'] = '2.1.0';
            vnp_Params['vnp_Command'] = 'pay';
            vnp_Params['vnp_TmnCode'] = 'TCFH914M';
            // vnp_Params['vnp_Merchant'] = ''
            vnp_Params['vnp_Locale'] = 'vn';
            vnp_Params['vnp_CurrCode'] = 'VND';
            vnp_Params['vnp_TxnRef'] = 'V' + Math.random(1000);
            vnp_Params['vnp_OrderInfo'] = 'CHUYEN TIEN MUA VE';
            vnp_Params['vnp_OrderType'] = 'JD';
            vnp_Params['vnp_Amount'] = sum * 100;
            vnp_Params['vnp_ReturnUrl'] = "http://localhost:3000/paymentsuccess";
            vnp_Params['vnp_IpAddr'] = '127.0.0.1';
            vnp_Params['vnp_CreateDate'] = createDate();
            vnp_Params = sortObject(vnp_Params);
        
        var secretKey = 'CFUUYTUIZLPISYJQVBPQHSTIMYKTYLKN'
        var signData = querystring.stringify(vnp_Params, { encode: false }); 
        const hmac = crypto.HmacSHA512(signData, secretKey);
        const signed = hmac.toString(crypto.enc.Hex);
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
        if(vnpUrl) {
            sessionStorage.setItem('ticket', JSON.stringify(ticket))
            sessionStorage.setItem('idShowTime', showTime._id)
            
            window.location = vnpUrl
        }
        
    }
    return (
        <div className={cx('booking')}>
            <h1 className={cx('heading')}>THANH TOÁN</h1>
            <div className={cx('container')}>
                <ul>
                    <li>
                        <div className={cx('left')}>
                            <span>Hình thức thanh toán</span>
                        </div>
                        <div className={cx('right')}>
                            <select value={typePayment} onChange={(e) => setTypePayment(e.target.value)}>
                                {
                                    typePayments.map(t => (
                                        <option value={t}>{t}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </li>
                    <li>
                        <div className={cx('left')}>
                            <span>Họ tên</span>
                        </div>
                        <div className={cx('right')}>
                            <div>{user.username}</div>
                        </div>
                    </li>
                    <li>
                        <div className={cx('left')}>
                            <span>Email</span>
                        </div>
                        <div className={cx('right')}>
                            <div>{user.email}</div>
                        </div>
                    </li>
                    <li>
                        <div className={cx('left')}>
                            <span>Số điện thoại</span>
                        </div>
                        <div className={cx('right')}>
                            <div>{user.phoneNumber}</div>
                        </div>
                    </li>
                    <li>
                        <div className={cx('left')}>
                        </div>
                        <div className={cx('right')}>
                            <button onClick={() => setShowComponent(1)}>QUAY LẠI</button>
                            <button onClick={handlePayment}>THANH TOÁN</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Payment