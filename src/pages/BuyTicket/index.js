import classNames from "classnames/bind";
import styles from './BuyTicket.module.scss'
import { MovieContext } from '../../contexts/MovieContext';
import { useContext, useState } from "react";
import { Container, Row, Col} from 'react-bootstrap';
import ByMovie from "./ByMovie";
import ByCinema from "./ByCinema";

const cx = classNames.bind(styles)

function BuyTicket () {

    const { movieState: { movies }} = useContext(MovieContext)
    const [ showByMovie, setShowByMovie ] = useState(true) 
   
    return (
        <div className={cx('wrapper')}>
            <div className={cx('option')}>
                <h1 onClick={() => setShowByMovie(true)} className={showByMovie === true ? cx('active') : null}>THEO PHIM</h1>
                <h1 onClick={() => setShowByMovie(false)} className={showByMovie === false ? cx('active') : null}>THEO RẠP</h1>
            </div>
            <Container>
                {
                    showByMovie ? <ByMovie/> : <ByCinema />
                }
            </Container>
        </div>
    )
}

export default BuyTicket