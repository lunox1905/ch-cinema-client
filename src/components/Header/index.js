import classNames from 'classnames/bind';
import styles from './Header.module.scss'
import { NavContext } from '../../contexts/NavContext';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../Auth'
import { AuthContext } from '../../contexts/AuthContext';

const cx = classNames.bind(styles)

function Header() {

    const { navState } = useContext(NavContext)
    const { authState: { user }, logoutUser } = useContext(AuthContext)
    const [ showAuth, setShowAuth ] = useState(false)
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('logo')}>
                    <img src={require('../../assets/images/logo3.png')} alt='logo'></img>
                </div>
                <div className={cx('search')}>
                    <input placeholder='Tìm tên phim, diễn viên...'/>
                    <i class="fas fa-search"></i>
                </div>
                <div className={cx('auth')}>
                    <div className={cx('auth-box')}>
                        <i class="fas fa-user-alt"></i>
                        {
                            user ? (
                                <>
                                    <span>{user.username}</span>
                                    <ul className={cx('option')}>
                                        {user?.role === 'admin' ? (
                                            <li>
                                                <Link to={'/profile'}>Tài khoản</Link>
                                                <Link to={'/manager/movie'}>Quản lý</Link>
                                            </li>
                                        ) : (
                                            <li>
                                                <Link to={'/profile'}>Tài khoản</Link>
                                            </li>
                                        )}
                                        <li onClick={() => logoutUser()}>Thoát</li>
                                    </ul>
                                </>
                            ) : (
                                <span onClick={() => setShowAuth(true)}>Đăng nhập</span>
                            )
                        }
                        
                    </div>
                </div>
            </div>
            <div className={cx('nav')}>
                <ul className={cx('nav-primary')}>
                {
                        navState.menu.map((nav, index) => (
                            <li className={cx('menu-primary')} key={index}>
                                <Link to={'/' + nav.slug}>
                                    {nav.title}
                                </Link>
                               
                                {
                                    
                                    nav.phuThuoc.length !== 0 ? (<ul>
                                        {
                                        nav.phuThuoc.map((nav, index) => (
                                            <li key={index}>
                                                <Link to={'/' + nav.slug}>
                                                    {nav.title}
                                                </Link>

                                            </li>
                                        ))}
                                    </ul>) : <></>
                                }
                            </li>
                        ))
                    }
                </ul>
            </div>
            {showAuth && <Auth setShow={setShowAuth}/>}
        </div>
    )
}

export default Header