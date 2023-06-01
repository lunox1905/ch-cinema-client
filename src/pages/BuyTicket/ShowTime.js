import classNames from "classnames/bind";
import style from './BuyTicket.module.scss'
import { Link } from "react-router-dom";

const cx = classNames.bind(style)

function ShowTime ({date, showTime}) {
    return (
        <div className={cx('showtime')}>
            <span>{date}</span>
            <div className={cx('box_showtime')}>
                <p>2D - Phụ đề</p>
                <ul className={cx('showtime_list')}>
                {   
                    showTime.map(item => (
                        <li>
                            <Link to={'/booking/' + item._id}>{item.time}</Link>
                        </li>
                    ))
                }
                </ul>
            </div>
        </div>
    )
}

export default ShowTime