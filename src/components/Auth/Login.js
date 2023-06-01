import { Container, Col, Row } from "react-bootstrap";
import { useContext, useState } from "react";
import './Auth.scss'
import { AuthContext } from "../../contexts/AuthContext";


function Login({setShow}) {
    const { loginUser } = useContext(AuthContext)
    const [ login, setLogin ] = useState({
        email: '',
        password: ''
    })

    const [ err, setErr ] = useState({
        email: '',
        password: ''
    })
    const handleChange =(e) => {
        setLogin({...login, [e.target.name]: e.target.value});
    }

    function validate() {
        let email, password
        if(login.email) {
            !(/\S+@\S+\.\S+/.test(login.email)) && (email = 'Email không hợp lệ')
        } else {
            email = 'Không được để trống email'
        }
        if(login.password) {
            login.password.trim().length < 6 && (password = "Mật khẩu phải lớn hơn 5 ký tự")
        } else {
            password = 'Không được để trống mật khẩu'
        }
        
        if(email || password){
            setErr({email, password})
            return false
        } 
        return true
    }

    const submit = () => {
        if(validate()) {
            loginUser(login)
            setShow(false)
          }
    }
    return (
        <Container>
            <Row>
                <Col lg={12}>
                    <input placeholder="Email" name="email" value={login.email} onChange={handleChange}/>
                    {err.email && <span>{err.email}</span>}
                </Col>  
                <Col lg={12}>
                    <input placeholder="Mật khẩu" name="password" type="password" value={login.password} onChange={handleChange}/>
                    <span>{err?.password}</span>
                </Col>
            
            </Row>
            
            <button onClick={submit}>Đăng nhập</button>

        </Container>
    )
}

export default Login