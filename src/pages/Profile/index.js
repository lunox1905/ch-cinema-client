import classNames from "classnames/bind";
import styles from './Profile.module.scss'
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useEffect, useState } from "react";
import { Container, Breadcrumb } from 'react-bootstrap';
import InfoProfile from "./InfoProfile";
import MyTransaction from './MyTransaction'
import Auth from "../../components/Auth";
const cx = classNames.bind(styles)

function Home () {
    const { authState: { user }, editPassWord} = useContext(AuthContext)
    const [ showInfo, setShowInfo ] = useState(true)
    const [ showLogin, setShowLogin ] = useState(false)
    useEffect(() => {
        if(!user) {
            setShowLogin(true)
        }
    },[])
   
    return (
        <div className={cx('wrapper')}>
            {showLogin && <Auth setShow={setShowLogin}/>}
            <Container>
                <Breadcrumb style={{"--cui-breadcrumb-divider": "'';"}}>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/">Thành viên</Breadcrumb.Item>
                    <Breadcrumb.Item active>Cá nhân</Breadcrumb.Item>
                </Breadcrumb>
                <div className={cx('option')}>
                    <h1 className={showInfo ? cx('active') : undefined} onClick={() => setShowInfo(true)}>THÔNG TIN THÀNH VIÊN</h1>
                    <h1 className={!showInfo ? cx('active') : undefined} onClick={() => setShowInfo(false)}>GIAO DỊCH CỦA TÔI</h1>
                </div>
                {
                    showInfo ? <InfoProfile user={user} editPassWord={editPassWord}/> 
                        : <MyTransaction user={user}/>
                }
            </Container>
        </div>
    )
}

export default Home