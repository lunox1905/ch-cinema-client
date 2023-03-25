import classNames from "classnames/bind";
import HeaderManager from "../../components/HeaderManager";
import SideBar from "../../components/SideBar";
import styles from './Manager.module.scss';
const cx = classNames.bind(styles)

function Manager ({ children }) {
    return (
        <div className={cx('wrapper')}>
            <SideBar/>
            <div className={cx('container')}> 
                <HeaderManager/>  
                <div className={cx('content')}>
                    {children}
                </div>
                
            </div>
        </div>
    )
}

export default Manager