import { Alert } from "react-bootstrap"
import classNames from "classnames/bind"
import styles from './ManagerMovie.module.scss'
import { Container, Col, Row, Button } from 'react-bootstrap';
import { URL } from "../../contexts/constants";
import { useState } from "react";

const cx = classNames.bind(styles)
function EditBanner ({setShow, title}) {
    const [ banner, setBanner ] = useState({
        image: '',
        link: ''
    })
    useEffect(() => {
        axios.get(`http://${URL}/getbanner`)
        .then(response => {
            console.log(response)
            setBanner(response.data.banner)
        })
        .catch(error => {
            console.log(error);
        });
    }, [])

    return (
        <div className={cx('alert-banner')}>
            
            <Alert variant="light" onClose={() => setShow(false)} dismissible>
                <div style={{width: '600px', height: '140px;'}}>
                    <Container>
                        <p>{title}</p>
                        
                            <Row>
                                <Col lg={6}>
                                    <input placeholder="Dường dẫn ảnh" value={banner.image}/>
                                </Col>  
                                <Col lg={6}>
                                    <input placeholder="Path" value={banner.link}/>
                                </Col>
                            
                            </Row>
                        
                        <Button variant="primary">Sửa</Button>

                    </Container>
                </div>
            </Alert>
        </div>
    )
} 

export default EditBanner