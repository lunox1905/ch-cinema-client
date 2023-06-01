import { Alert } from "react-bootstrap"
import classNames from "classnames/bind"
import styles from './ManagerShowTime.module.scss'
import { Container, Row, Col, Button} from 'react-bootstrap';
const cx = classNames.bind(styles)

function DetailShowTime ({showTime, setShow, title}) {
    const handleDate = (date) => {
        const d = new Date(date)
        return  `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }
    
    return (
        <div className={cx('alert-wrapper')}>
            <Alert variant="light" onClose={() => setShow(false)} dismissible>
                <div style={{width: '600px'}}>
                    
                        <Container>
                            <h4>{title}</h4>
                                <Row>
                                    <Col lg='12'>
                                        <div class={cx('detail-box')}>
                                        <span>Tên phim</span>
                                        <p>{showTime.movie.title}</p>
                                        </div>
                                    </Col>
                                    <Col lg='12'>
                                        <div class={cx('detail-box')}>
                                        <span>Rạp chiếu</span>
                                        <p>{showTime.cinema.name}</p>
                                        </div>
                                    </Col>
                                    <Col lg='12'>
                                        <div class={cx('detail-box')}>
                                        <span>Ngày chiếu</span>
                                        <p>{handleDate(showTime.date)}</p>
                                        </div>
                                    </Col>
                                    <Col lg='12'>
                                        <div class={cx('detail-box')}>
                                        <span>Giờ chiếu</span>
                                        <p>{showTime.time}</p>
                                        </div>
                                    </Col>
                                    <Col lg='12'>
                                        <div class={cx('detail-box')}>
                                        <span>Giá vé</span>
                                        <p>{showTime.price}</p>
                                        </div>
                                    </Col>
                                </Row>
                            <Button variant="primary" onClick={() => setShow(false)}>Quay lại</Button>
                        </Container>
                </div>
            </Alert>
        </div>
    )
} 

export default DetailShowTime