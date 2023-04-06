import { Container, Col, Row  } from "react-bootstrap";
import { useContext, useState } from "react";
import './Auth.scss'
import { AuthContext } from "../../contexts/AuthContext";

function Register({setShow}) {
    const { registerUser } = useContext(AuthContext)
    const [ register, setRegister ] = useState({
        username: '',
        phoneNumber: '',
        email: '',
        password: '',
        repassword: '',
        gender: 'male'
    })

    const [ err, setErr ] = useState(null)
    const handleChange =(e) => {
      setRegister({...register, [e.target.name]: e.target.value});
    }

    function validate() {
        const val = {
          username: '',
          phoneNumber: '',
          email: '',
          password: '',
          repassword: '',
        }
        if(register.email) {
            !(/\S+@\S+\.\S+/.test(register.email)) && (val.email = 'Email không hợp lệ')
        } else {
            val.email = 'Không được để trống email'
        }
        if(register.password.trim()) {
            register.password.trim().length < 6 && (val.password = "Mật khẩu phải lớn hơn 5 ký tự")
        } else {
            val.password = 'Không được để trống mật khẩu'
        }

        if(register.repassword.trim()) {
          register.password.trim() !== register.repassword.trim() && (val.repassword = "Nhập lại mật khẩu không chính xác")
        } else {
          val.password = 'Không được để trống mật khẩu'
        }

        if(!register.username) val.username = 'Không được để họ tên'

        var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        if(register.phoneNumber) {
          !(register.phoneNumber.match(phoneno)) && (val.phoneNumber = 'Số điện thoại không hợp lệ')
        } else {
          val.phoneNumber = 'Không được để trống số điện thoại'
        }
        if(val.email || val.password || val.email || val.repassword || val.phoneNumber || val.username){
       
            setErr(val)
            return false
        } 
        return true
    }

    const submit = () => {
        if(validate()) {
          registerUser(register)
          setShow(false)
        }
    }

    
    return (
        <Container>
            <Row>
                <Col lg={12}>
                    <input placeholder="Họ tên" name="username" value={register.username} onChange={handleChange}/>
                    <span>{err?.username}</span>
                </Col>  
                <Col lg={6}>
                    <input placeholder="Số điện thoại" name="phoneNumber" value={register.phoneNumber} onChange={handleChange}/>
                    <span>{err?.phoneNumber}</span>
                </Col>  
                <Col lg={6}>
                    <select placeholder="Giới tính" name="gender" value={register.gender} onChange={handleChange}>
                        <option value={'Nam'}>Nam</option>
                        <option value={'Nữ'}>Nữ</option>
                        <option value={'Khác'}>Khác</option>
                    </select>
                </Col>  
                <Col lg={12}>
                    <input placeholder="Email" name="email" value={register.email} onChange={handleChange}/>
                    <span>{err?.email}</span>
                </Col>  
                <Col lg={6}>
                    <input placeholder="Mật khẩu" name="password" value={register.password} onChange={handleChange}/>
                    <span>{err?.password}</span>
                </Col>
                <Col lg={6}>
                    <input placeholder="Xác nhận mật khẩu" name="repassword" value={register.repassword} onChange={handleChange}/>
                    <span>{err?.repassword}</span>
                </Col>
            </Row>
            
            <button onClick={submit}>Đăng nhập</button>
        </Container>
    )
}

export default Register