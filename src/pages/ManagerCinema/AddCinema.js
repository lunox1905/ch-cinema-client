import { Alert } from "react-bootstrap"
import classNames from "classnames/bind"
import styles from './ManagerCinema.module.scss'
import { Container, Form, Row, Button } from 'react-bootstrap';
import { useState } from "react";
import Input from '../../components/Input'

const cx = classNames.bind(styles)
function AddCinema ({ setShow, title, setLoading, addCinema}) {

    const [ cinema, setCinema ] = useState({
        name: '',
        phoneNumber: '',
        address: '',
    })

    const [ validated, setValidated ] = useState(false)
    const handleChange =(e) => {
        setCinema({...cinema, [e.target.name]: e.target.value});
    }
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
            setLoading(true)
            addCinema(cinema)
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
                                    <Input title={'Tên rạp'} placeholder={'Tên rạp'} value={cinema.name} name={'name'} handleUpdate={handleChange}/> 
                                    <Input title={'Số điện thoại'} placeholder={'Số điện thoại'} value={cinema.phoneNumber} name={'phoneNumber'} handleUpdate={handleChange}/> 
                                    <Input title={'Địa chỉ'} placeholder={'Địa chỉ'} value={cinema.address} name={'address'} handleUpdate={handleChange}/> 
                                    
                                </Row>
                            
                            <Button variant="primary" type="submit">Thêm</Button>

                        </Container>
                    </Form>
                </div>
            </Alert>
        </div>
    )
} 

export default AddCinema