import classNames from "classnames/bind";
import styles from './Booking.module.scss'
const cx = classNames.bind(styles)
const a = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P']

function ChosseSeat ({cinema, numberOfSeat, chooseSeat, setChooseSeat, seatsAvailable}) {
    var seats = []
    for(let i = 0; i < cinema?.numberOfSeats/16; i++) {
        let arr = []
        for( let j = 1; j <= 16; j++) {
            arr.push(j)
        }
        seats.push({
            row: a[i],
            seatNumber: arr
        })
    }
    const seatRow = () => (
        a.map((a, i) => {
            if(i < cinema.numberOfSeats/16) {
                return (
                    <li key={i}>{a}</li>
                )
            }
        })
    )
    return (
        <div className={cx('booking')}>
            <h1 className={cx('heading')}>CHỌN GHẾ: </h1>
            {
                chooseSeat.map((s, i) => (
                    <span className={cx('selected_seat')}>
                        {i < chooseSeat.length-1 ? s + ',' : s}
                    </span>
                ))
            }
            
            <div className={cx('container')}>
                <p className={cx('screen')}>Màn hình</p>
                <div className={cx('seat')}>
                    <ul className={cx('seat_row')}>
                        {
                            seatRow()
                        }
                    </ul>
                    
                    <div className={cx('seat_list')}>
                        {
                            seats.map((seat) => (
                                <ul>
                                    {
                                        seat.seatNumber.map(s => {
                                            if(seatsAvailable.includes(seat.row + s)) {
                                                return (
                                                    <li
                                                        className={chooseSeat.includes(seat.row + s) ? cx('active') : undefined}
                                                        style={seatsAvailable.includes(seat.row + s) ? {background: 'green'} : undefined}
                                                    >
                                                        {s}
                                                    </li>
                                                )
                                            } else {
                                                return (
                                                    <li onClick={() => {
                                                        if(chooseSeat.length < numberOfSeat) {
                                                            if(!seatsAvailable.includes(seat.row + s)) {
                                                                setChooseSeat([...chooseSeat, seat.row + s])
                                                            }
                                                        } else {
                                                            if(!chooseSeat.includes(seat.row + s)) 
                                                            {
                                                                let newArr = chooseSeat
                                                                for(let i = 0; i < chooseSeat.length - 1; i++) {
                                                                    newArr[i] = newArr[i + 1]
                                                                }
                                                                newArr[chooseSeat.length - 1] = seat.row + s
                                                                setChooseSeat([...newArr])
                                                            }
                                                        }
                                                    }} 
                                                    className={chooseSeat.includes(seat.row + s) ? cx('active') : undefined}
                                                    >
                                                        {s}
                                                    </li>
                                                )
                                            }
                                        })
                                    }
                                </ul>  
                            ))
                        }
                    </div>
                    <ul className={cx('seat_row')}>
                        {
                            seatRow()
                        }
                    </ul>
                </div>
                <ul className={cx('instruc')}>
                    <li>
                        <div className={cx('primary')} style={{backgroundColor: 'var(--primary-color);'}}></div>
                        <span>Ghế đang chọn</span>
                    </li>
                    <li>
                        <div className={cx('green')}></div>
                        <span>Ghế đã bán</span>
                    </li>
                    <li>
                        <div className={cx('gray')} style={{backgroundColor: '#ccc;'}}></div>
                        <span>Ghế có thể chọn</span>
                    </li>
                    <li>
                        <div className={cx('blue')} style={{background: '#ccc;'}}></div>
                        <span>Ghế không thể chọn</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ChosseSeat