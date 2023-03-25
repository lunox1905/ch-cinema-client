import classNames from "classnames/bind"
import styles from './MovieItem.module.scss'
import { Link } from "react-router-dom"
const cx = classNames.bind(styles)

function MovieItem ({movie, width, height}) {
    console.log(width)
    return (
        <div className={cx('item')}>
            <div className={cx('image')}>
                <Link to={'/' + movie.slug}>
                    <img style={{width: {width}, height: {height}}} src={movie.image} alt='movie'/>
                    <div className={cx('overlay')}>
                        <button>MUA VÉ</button>
                    </div>
                </Link>
            </div>
            <div className={cx('box-title')}>
                <p>{movie.title}</p>
                <p className={cx('titleVi')}>{movie.titleVi}</p>
            </div>
        </div>
    )                       
}

export default MovieItem