import classNames from "classnames/bind";
import style from './ShowTime.module.scss'
import { Link } from "react-router-dom";

const cx = classNames.bind(style)

function ShowTime ({cinema, showTime}) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h2>{cinema}</h2>
            </div>
            <div className={cx('container')}>
                <p>2D - Phụ đề</p>
                <ul>
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