import classNames from "classnames/bind"
import styles from './ManagerUser.module.scss'
import { Button} from 'react-bootstrap';
import { updataRole } from "../../contexts/AuthContext";
import { useState } from "react";
const cx = classNames.bind(styles)

function UpdateRole ({id, setShow}) {
    const [ role, setRole ] = useState('user')
    const hanleUpdateRole = () => {
        updataRole(id, {role: role})
        .then(res => {
            if(res.success) {
                window.location.reload();
            }
        })
    }
    return (
        <div className={cx('container_updaterole')}>
            <div>
                <span>Quyền</span>
                <select onChange={(e) => setRole(e.target.value)}>
                    <option value='user'>User</option>
                    <option value='admin'>Admin</option>
                </select>
            </div>
            <Button onClick={hanleUpdateRole}>Thay đổi</Button>
        </div>
    )
} 

export default UpdateRole