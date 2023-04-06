import { Alert } from "react-bootstrap"
import classNames from "classnames/bind"
import styles from './ManagerMovie.module.scss'
import { Container, Col, Row, Button } from 'react-bootstrap';
import { URL } from "../../contexts/constants";
import { useState } from "react";
import axios from "axios";
const cx = classNames.bind(styles)
function EditBanner ({slide,setShow, title, setLoading}) {
    const [ banner, setBanner ] = useState(slide)
    const handleChange =(e) => {
        setBanner({...banner, [e.target.name]: e.target.value});
    }

    const submit = () => {
        setLoading(true)
        axios.post(`http://${URL}/editbanner/${banner._id}`, banner)
        .then(response => {
                if(response.data.success) {
                    setLoading(false)
                    setShow(false)
                }
        })
        .catch(error => {
            console.log(error);
        });
    }


    return (
        <div className={cx('alert-banner')}>
            <Alert variant="light" onClose={() => setShow(false)} dismissible>
                <div style={{width: '600px', height: '140px;'}}>
                    <Container>
                        <p>{title}</p>
                        
                            <Row>
                                <Col lg={12}>
                                    <input placeholder="Dường dẫn ảnh" name="image" value={banner.image} onChange={handleChange}/>
                                </Col>  
                                <Col lg={12}>
                                    <input placeholder="Path" name="link" value={banner.link} onChange={handleChange}/>
                                </Col>
                            
                            </Row>
                        
                        <Button variant="primary" onClick={submit}>Sửa</Button>

                    </Container>
                </div>
            </Alert>
        </div>
    )
} 

export default EditBanner