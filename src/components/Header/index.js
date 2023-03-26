import classNames from 'classnames/bind';
import styles from './Header.module.scss'
import { NavContext } from '../../contexts/NavContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)

function Header() {
    const { navState } = useContext(NavContext)
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
                    <div className={cx('aut')}>
                        <i class="fas fa-user-alt"></i>
                        <span>Đăng nhập</span>
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
        </div>
    )
}

export default Header