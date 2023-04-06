import classNames from "classnames/bind";
import styles from './SideBar.module.scss'
import Image from "../Image";
import { Link } from "react-router-dom";
import { FaBars, FaFilm, FaElementor, FaImage, FaRegChartBar, FaUniversity, FaRegCalendarAlt } from 'react-icons/fa'
import { useState } from "react";
const cx = classNames.bind(styles)

function SideBar () {
    const menu = [
        {
            title: 'DashBoard',
            link: '/',
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
    ]

    const [open, setOpen] = useState(true)
    return (
        <div className={open ? cx('wrapper', 'open') : cx('wrapper', 'close')}>
            <div className={cx('container')}>
         
                <div className={cx('logo')}>
                    <Image src={require('../../assets/images/logo3.png')} alt='logo'/>
                    <FaBars onClick={() => setOpen(!open)}/>
                </div>
                <div className={cx('sidebar')}>
                    <ul>
                        {
                            menu.map((menu, index) => (
                                <li>
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