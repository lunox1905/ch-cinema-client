import { Alert } from "react-bootstrap"
import classNames from "classnames/bind"
import styles from './ManagerFood.module.scss'
import { Container, Form, Row, Button } from 'react-bootstrap';
import { useState } from "react";
import Input from '../../components/Input'

const cx = classNames.bind(styles)
function AddFood ({ setShow, title, setLoading, addFood}) {
    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [ food, setFood ] = useState({
        title: '',
        description: '',
        price: null,
    })

    const [ validated, setValidated ] = useState(false)
    const handleChange =(e) => {
        setFood({...food, [e.target.name]: e.target.value});
    }
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
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
            setLoading(true)
            if (!selectedFile) return;
            food.image = selectedFile
            addFood(food)
            .then(response => {
                if(response) {
                    setLoading(false)
                    setShow(false)
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
        setValidated(true);
    };
    return (
        <div className={cx('alert-wrapper')}>
            
            <Alert variant="light" onClose={() => setShow(false)} dismissible>
                <div style={{width: '600px', height: '140px;'}}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Container>
                            <p>{title}</p>
                                <Row>
                                    <Input title={'Title'} placeholder={'Title'} value={food.title} name={'title'} handleUpdate={handleChange}/> 
                                    <Input title={'Mô tả'} placeholder={'Mô tả'} value={food.description} name={'description'} handleUpdate={handleChange}/> 
                                    <Input title={'Giá'} placeholder={'Giá'} value={food.price} name={'price'} handleUpdate={handleChange}/> 
                                    <span>Image</span>
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
                                            style={{ height: '60px' }}
                                        />
                                    )}
                                </Row>
                            
                            <Button variant="primary" type="submit">Thêm</Button>

                        </Container>
                    </Form>
                </div>
            </Alert>
        </div>
    )
} 

export default AddFood