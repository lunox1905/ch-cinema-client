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
                            <p>{title}</p>
                                <Row>
                                    <Col lg='12'>
                                        <span>Tên rạp</span>
                                        <p>{cinema.name}</p>
                                    </Col>
                                    <Col lg='12'>
                                        <span>Số điện thoại</span>
                                        <p>{cinema.name}</p>
                                    </Col>
                                    <Col lg='12'>
                                        <span>Địa chỉ</span>
                                        <p>{cinema.name}</p>
                                    </Col>
                                </Row>
                            <Button variant="primary" type="submit">Sửa</Button>
                        </Container>
                </div>
            </Alert>
        </div>
    )
} 

export default EditCinema