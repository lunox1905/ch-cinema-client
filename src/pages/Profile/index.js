import classNames from "classnames/bind";
import styles from './Profile.module.scss'
import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useState } from "react";
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import Loading from "../../components/Loading";
import EditPassWord from "./EditPassWord";
const cx = classNames.bind(styles)

function Home () {
    const [show, setShow] = useState(false);
    const { authState: { user }, editPassWord} = useContext(AuthContext)
    const [ loading, setLoading ] = useState(false)
  

    if(loading) {
        return <Loading/>
    }
    return (
        <div className={cx('wrapper')}>
            
            <Container>
                <Breadcrumb style={{"--cui-breadcrumb-divider": "'';"}}>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item href="/">Thành viên</Breadcrumb.Item>
                    <Breadcrumb.Item active>Cá nhân</Breadcrumb.Item>
                </Breadcrumb>

                <h1>THÔNG TIN THÀNH VIÊN</h1>
                <Row>
                    <Col lg='8'>
                        <Row>
                            <Col lg='8'>
                                <span>Họ tên</span>
                                <div className={cx('box')}>
                                    {user?.username}
                                </div>
                            </Col>
                            <Col lg='4'>
                                <span>Giới tính</span>
                                <div className={cx('box')}>
                                    {user?.gender}
                                </div>
                            </Col>
                            <Col lg='8'>
                                <span>Họ tên</span>
                                <div className={cx('box')}>
                                    {user?.email}
                                </div>
                            </Col>
                            <Col lg='4'>
                                <span>Giới tính</span>
                                <div className={cx('box')}>
                                    {user?.phoneNumber}
                                </div>
                            </Col>
                            <Col lg='4'>
                                <div className={cx('item')}>
                                    <input type="checkbox" checked={show} onClick={() => setShow(!show)}/>
                                    <span>Đổi mật khẩu</span>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    
                </Row>
                
            </Container>
            {
                show && <EditPassWord editPassWord={editPassWord} setShow={setShow} setLoading={setLoading}/>
            }
            
            
        </div>
    )
}

export default Home