import { Alert } from "react-bootstrap"
import classNames from "classnames/bind"
import styles from './Movie.module.scss'

const cx = classNames.bind(styles)
function Trailer ({link, setShow, title}) {
    return (
        <div className={cx('trailer')}>
            
            <Alert variant="light" onClose={() => setShow(false)} dismissible>
                <p>{title}</p>
                <div className={cx('ytb')}>
                <iframe width="730" height="420" src={link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            
                </div>
            </Alert>
        </div>
    )
} 

export default Trailer