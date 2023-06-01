import { Alert } from "react-bootstrap"
import classNames from "classnames/bind"
import styles from './ManagerFood.module.scss'
import { Container, Row, Col, Button} from 'react-bootstrap';
const cx = classNames.bind(styles)

function EditFood ({food, setShow, title}) {

    return (
        <div className={cx('alert-wrapper')}>
            <Alert variant="light" onClose={() => setShow(false)} dismissible>
                <div style={{width: '600px'}}>
                    
                        <Container>
                            <h4>{title}</h4>
                                <Row>
                                    <Col lg='12'>
                                        <div className={cx('detail_item')}>
                                            <span>Title</span>
                                            <p >{food.title}</p>
                                        </div>
                                    </Col>
                                    <Col lg='12'>
                                        <div className={cx('detail_item')}>
                                        <span>Nội dung</span>
                                        <p >{food.description}</p>
                                        </div>
                                    </Col>
                                    <Col lg='12'>
                                        <div className={cx('detail_item')}>
                                        <span>Giá</span>
                                        <p >{food.price}</p>
                                        </div>
                                    </Col>
                                    <Col lg='12'>
                                        <div className={cx('detail_item')}>
                                        <span>Hình ảnh</span>
                                        <img src={food.image}/>
                                        </div>
                                    </Col>
                                </Row>
                        </Container>
                </div>
            </Alert>
        </div>
    )
} 

export default EditFood