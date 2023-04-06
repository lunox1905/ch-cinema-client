
import './Auth.scss'
import { Alert } from "react-bootstrap";
import Login from "./Login";
import Register from "./Register";
import { useState } from "react";

function Auth({setShow}) {
    const [ showLogin, setShowLogin ] = useState(true)
    return (
        <>
        <div className="wrapper-auth">
            <Alert variant="light" onClose={() => setShow(false)} dismissible className="container-alert">
                <div className="container-auth">
                    <div className='box'>
                        <h1 onClick={() => setShowLogin(true)} className={showLogin && 'active'}>ĐĂNG NHẬP</h1>
                        <h1>/</h1>
                        <h1 onClick={() => setShowLogin(false)} className={!showLogin && 'active'}>ĐĂNG KÝ</h1>
                    </div>
                    {showLogin ? <Login setShow={setShow}/> : <Register setShow={setShow}/>}
                </div>
            </Alert>
            
        </div>
        <div className="overlay"></div>
        </>
    )
}

export default Auth