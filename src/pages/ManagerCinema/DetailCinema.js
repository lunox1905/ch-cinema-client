import { Alert } from "react-bootstrap"
import classNames from "classnames/bind"
import styles from './ManagerCinema.module.scss'
import { Container, Row, Col, Button} from 'react-bootstrap';
const cx = classNames.bind(styles)

function EditCinema ({cinema, setShow, title}) {

    return (
        <div className={cx('alert-wrapper')}>
            <Alert variant="light" onClose={() => setShow(false)} dismissible>
                <div style={{width: '600px'}}>
                    
                        <Container>
                            <h4>{title}</h4>
                                <Row>
                                    <Col lg='12'>
                                        <div className={cx('detail_item')}>
                                        <span>Tên rạp</span>
                                        <p>{cinema.name}</p>
                                        </div>
                                    </Col>
                                    <Col lg='12'>
                                        <div className={cx('detail_item')}>
                                        <span>Số điện thoại</span>
                                        <p>{cinema.phoneNumber}</p>
                                        </div>
                                    </Col>
                                    <Col lg='12'>
                                        <div className={cx('detail_item')}>
                                        <span>Địa chỉ</span>
                                        <p>{cinema.address}</p>
                                        </div>
                                    </Col>
                                    <Col lg='12'>
                                        <div className={cx('detail_item')}>
                                        <span>Số chỗ ngồi</span>
                                        <p>{cinema.numberOfSeats}</p>
                                        </div>
                                    </Col>
                                </Row>
                        </Container>
                </div>
            </Alert>
        </div>
    )
} 

export default EditCinema