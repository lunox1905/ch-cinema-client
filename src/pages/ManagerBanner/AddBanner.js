import { Alert } from "react-bootstrap"
import classNames from "classnames/bind"
import styles from './ManagerMovie.module.scss'
import { Container, Col, Row, Button } from 'react-bootstrap';
import { URL } from "../../contexts/constants";
import { useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles)
function AddBanner ({ setShow, title, setLoading}) {

    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [ link, setLink ] = useState('')
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setSelectedFile(reader.result);
        };
    };
    const submit = () => {
        setLoading(true)
        const banner = {
            link: link,
            image: selectedFile
        }
        axios.post(`http://${URL}/addbanner/`, banner)
        .then(response => {
            if(response.data.success) {
                setShow(false)
                setLoading(false)
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
                                <input
                                        className={cx('input_file')}
                                        type="file"
                                        name="image"
                                        onChange={handleFileInputChange}
                                        value={fileInputState}
                                        required
                                    />
                                    {selectedFile && (
                                        <img
                                            src={selectedFile}
                                            alt="chosen"
                                            style={{ height: '200px' }}
                                        />
                                    )}
                                <Col lg={12}>
                                    <input placeholder="Path" name="link" value={link} onChange={(e) => setLink(e.target.value)}/>
                                </Col>
                            
                            </Row>
                        
                        <Button variant="primary" onClick={submit}>Thêm</Button>

                    </Container>
                </div>
            </Alert>
        </div>
    )
} 

export default AddBanner