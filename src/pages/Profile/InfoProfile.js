import classNames from "classnames/bind";
import styles from './Profile.module.scss';
import { useState } from "react";
import { Row, Col } from 'react-bootstrap';
import Loading from "../../components/Loading";
import EditPassWord from "./EditPassWord";
const cx = classNames.bind(styles)

function InfoProfile ({user, editPassWord}) {
    const [ show, setShow ] = useState(false)
    const [ loading, setLoading ] = useState(false)
  

    if(loading) {
        return <Loading/>
    }
    return (
        <>
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
            {
                show && <EditPassWord editPassWord={editPassWord} setShow={setShow} setLoading={setLoading}/>
            }
        </>
    )
}

export default InfoProfile