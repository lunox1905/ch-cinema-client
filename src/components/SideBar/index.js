import classNames from "classnames/bind";
import styles from './SideBar.module.scss'
import Image from "../Image";
import { Link } from "react-router-dom";
import { FaHome, FaBars } from 'react-icons/fa'
import { useState } from "react";
const cx = classNames.bind(styles)

function SideBar () {
    const menu = [
        {
            title: 'Home',
            link: '/',
            icon: <FaHome/>
        },
        {
            title: 'Home',
            link: '/',
            icon: <FaHome/>
        },
        {
            title: 'Home',
            link: '/',
            icon: <FaHome/>
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