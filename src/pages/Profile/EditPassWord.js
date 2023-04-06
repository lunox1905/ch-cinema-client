import classNames from "classnames/bind";
import styles from './Profile.module.scss'
import { useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
const cx = classNames.bind(styles)

function EditPassWord ({editPassWord, setShow, setLoading}) {
    const [ pass, setPass ] = useState({
        password: '',
        newPassword: '',
        reNewPassword: ''
    })
    
    const [ err, setErr ] = useState({
        password: '',
        newPassword: '',
        reNewPassword: ''
    })

    const handleChange =(e) => {
      setPass({...pass, [e.target.name]: e.target.value});
    }

    function validate() {
        const val = {
            password: '',
            newPassword: '',
            reNewPassword: ''
        }

        if(pass.password.trim()) {
            pass.password.trim().length < 6 && (val.password = "Mật khẩu phải lớn hơn 5 ký tự")
        } else {
            val.password = 'Không được để trống mật khẩu'
        }
        
        if(pass.newPassword.trim()) {
            pass.newPassword.trim().length < 6 && (val.newPassword = "Mật khẩu phải lớn hơn 5 ký tự")
        } else {
            val.newPassword = 'Không được để trống mật khẩu'
        }

        if(pass.reNewPassword.trim()) {
          pass.reNewPassword.trim() !== pass.reNewPassword.trim() && (val.reNewPassword = "Nhập lại mật khẩu không chính xác")
        } else {
            val.reNewPassword = 'Không được để trống mật khẩu'
        }
        console.log(val)

        if(val.newPassword || val.password || val.reNewPassword){
       
            setErr(val)
            return false
        } 
        return true
    }

    const submit = () => {
        setLoading(true)
        if(validate()) {
          editPassWord(pass.newPassword)
          .then((res) => {
            if(res.data.success) {
                setShow(false)
                setLoading(false)
            }
          })
          
        }
    }

    return (
        <div className={cx('wrapper-pass')}>
            
            <Container>
                <Row>
                    <Col lg='8'>
                        <Row>
                            <Col lg='8'>
                                <div className={cx('form-edit')}>
                                    <input className="form-controll" value={pass.password} name="password" required placeholder="Mật khẩu hiện tại" onChange={handleChange}/>
                                    <span>{err?.password}</span>
                                </div>
                            </Col>
                            <Col lg='8'>
                                <div className={cx('form-edit')}>
                                    <input className="form-controll" value={pass.newPassword} name="newPassword" required placeholder="Mật khẩu mới" onChange={handleChange}/>
                                    <span>{err?.newPassword}</span>
                                </div>
                            </Col>
                            <Col lg='8'>
                                <div className={cx('form-edit')}>
                                    <input className="form-controll" value={pass.reNewPassword} name="reNewPassword" required placeholder="Nhập lại mật khẩu mới" onChange={handleChange}/>
                                    <span>{err?.reNewPassword}</span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <button type="submit" onClick={submit}>LƯU LẠI</button>
            </Container>
            
        </div>
    )
}

export default EditPassWord