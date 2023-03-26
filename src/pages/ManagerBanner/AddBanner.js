import { Alert } from "react-bootstrap"
import classNames from "classnames/bind"
import styles from './ManagerMovie.module.scss'
import { Container, Col, Row, Button } from 'react-bootstrap';

const cx = classNames.bind(styles)
function AddBanner ({setShow, title}) {
    return (
        <div className={cx('alert-banner')}>
            
            <Alert variant="light" onClose={() => setShow(false)} dismissible>
                <div style={{width: '600px', height: '140px;'}}>
                    <Container>
                        <p>{title}</p>
                        
                            <Row>
                                <Col lg={6}>
                                    <input placeholder="Dường dẫn ảnh"/>
                                </Col>  
                                <Col lg={6}>
                                    <input placeholder="Path"/>
                                </Col>
                            
                            </Row>
                        
                        <Button variant="primary">Thêm</Button>

                    </Container>
                </div>
            </Alert>
        </div>
    )
} 

export default AddBanner