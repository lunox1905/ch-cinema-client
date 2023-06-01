import { Alert } from "react-bootstrap"
import classNames from "classnames/bind"
import styles from './ManagerFood.module.scss'
import { Container, Row, Button, Form } from 'react-bootstrap';
import { useState } from "react";
import Input from "../../components/Input";
const cx = classNames.bind(styles)
function EditFood ({data, setShow, title, setLoading, editFood}) {
    const [ food, setFood ] = useState(data)
    const [ validated, setValidated ] = useState(false)
    const handleChange =(e) => {
        setFood({...food, [e.target.name]: e.target.value});
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
            setLoading(true)
            editFood(food, food._id)
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
                <div style={{width: '600px'}}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Container>
                            <p>{title}</p>
                                <Row>
                                    <Input title={'Title'} placeholder={'Title'} value={food.title} name={'title'} handleUpdate={handleChange}/> 
                                    <Input title={'Mô tả'} placeholder={'Mô tả'} value={food.description} name={'description'} handleUpdate={handleChange}/> 
                                    <Input title={'Giá'} placeholder={'Giá'} value={food.price} name={'price'} handleUpdate={handleChange}/> 
                                    <Input title={'Image'} placeholder={'Image'} value={food.image} name={'image'} handleUpdate={handleChange}/> 
                                    <img src={food.image}/>
                                </Row>
                            <Button variant="primary" type="submit">Sửa</Button>
                        </Container>
                    </Form>
                </div>
            </Alert>
        </div>
    )
} 

export default EditFood