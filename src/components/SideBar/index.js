import classNames from "classnames/bind";
import styles from './SideBar.module.scss'
import Image from "../Image";
import { Link } from "react-router-dom";
import { FaBars, FaFilm, FaElementor, FaImage, FaRegChartBar, FaUniversity, FaRegCalendarAlt, FaBuffer, FaUserAlt } from 'react-icons/fa'
import { useState } from "react";
const cx = classNames.bind(styles)

function SideBar () {
    const menu = [
        {
            title: 'DashBoard',
            link: '/manager',
            icon: <FaRegChartBar/>
        },
    
        {
            title: 'Movie',
            link: '/manager/movie',
            icon: <FaFilm/>
        },
        {
            title: 'Menu',
            link: '/manager/menu',
            icon: <FaElementor/>
        },
        {
            title: 'Banner',
            link: '/manager/banner',
            icon: <FaImage/>
        },
        {
            title: 'Rạp chiếu phim',
            link: '/manager/cinema',
            icon: <FaUniversity/>
        },
        {
            title: 'Lịch chiếu',
            link: '/manager/showtime',
            icon: <FaRegCalendarAlt/>
        },
        {
            title: 'Thức ăn',
            link: '/manager/food',
            icon: <FaBuffer/>
        },
        {
            title: 'Người dùng',
            link: '/manager/user',
            icon: <FaUserAlt/>
        }
    ]

    const [open, setOpen] = useState(true)
    return (
        <div className={open ? cx('wrapper', 'open') : cx('wrapper', 'close')}>
            <div className={cx('container')}>
         
                <div className={cx('logo')}>
                    <Link to={'/'}>
                        <Image src={require('../../assets/images/logo3.png')} alt='logo'/>
                    </Link>
                    <FaBars onClick={() => setOpen(!open)}/>
                </div>
                <div className={cx('sidebar')}>
                    <ul>
                        {
                            menu.map((menu, index) => (
                                <li key={index}>
                                    <Link to={menu.link}>
                                        {menu.icon}
                                        <span>{menu.title}</span>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div> 
            </div>
        </div>
    )
}

export default SideBar