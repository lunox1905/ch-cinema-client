import classNames from "classnames/bind";
import styles from './HeaderManager.module.scss'
import Image from "../Image";
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Link } from "react-router-dom";
const cx = classNames.bind(styles)
const HeaderManager =() => {
    const { authState: {user}, logoutUser } = useContext(AuthContext)
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <button>
                    <span>{user?.username}</span>
                    <Image src="https://static.cdnno.com/user/20e922c37c4dda863c987de56c55cc58/200.jpg?1665227144"  alt='logo'/>
                    
                    <ul>
                        <li>
                            <Link to={'/thanh-vien'}>Cá nhân</Link>
                        </li>
                        <li onClick={() => logoutUser()}>Đăng xuất</li>
                    </ul>
                </button>
            </div>
        </div>
    );
}

export default HeaderManager