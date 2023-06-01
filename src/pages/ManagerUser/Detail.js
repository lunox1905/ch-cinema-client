import { Alert } from "react-bootstrap"
import classNames from "classnames/bind"
import styles from './ManagerUser.module.scss'
import { Container, Row, Col } from 'react-bootstrap';
import UpdateRole from "./UpdateRole";
import { useState } from "react";
const cx = classNames.bind(styles)

function Detail ({user, setShow, title}) {
    const [ showUpdate, setShowUpdate ] = useState(false)
    return (
        <div className={cx('alert-wrapper')}>
            <Alert variant="light" onClose={() => setShow(false)} dismissible>
                <div style={{width: '600px'}}>
                    <Container>
                        <h4>{title}</h4>
                            <Row>
                                <Col lg='12'>
                                    <div className={cx('detail_item')}>
                                    <span>Họ tên</span>
                                    <p>{user.name}</p>
                                    </div>
                                </Col>
                                <Col lg='12'>
                                    <div className={cx('detail_item')}>
                                    <span>Email</span>
                                    <p>{user.email}</p>
                                    </div>
                                </Col>
                                <Col lg='12'>
                                    <div className={cx('detail_item')}>
                                    <span>Số điện thoại</span>
                                    <p>{user.phoneNumber}</p>
                                    </div>
                                </Col>
                                <Col lg='12'>
                                    <div className={cx('detail_item')}>
                                    <span>Giới tính</span>
                                    <p>{user.gender}</p>
                                    </div>
                                </Col>
                                <Col lg='12'>
                                    <div className={cx('detail_item')}>
                                    <span>Quyền</span>
                                    <p>{user.role}</p>
                                    </div>
                                </Col>
                                <Col lg='12'>
                                    <div className={cx('detail_item')}>
                                        <input onClick={() => setShowUpdate(!showUpdate)} type="checkbox"/>
                                        <p>Thay đổi quyền</p>
                                    </div>
                                </Col>
                                <Col lg='12'>
                                    <div className={cx('detail_item')}>
                                        {showUpdate && <UpdateRole id={user._id} setShow={setShowUpdate}/>}
                                    </div>
                                </Col>
                            </Row>
                    </Container>
                </div>
            </Alert>
        </div>
    )
} 

export default Detail