import classNames from "classnames/bind";
import styles from './HeaderManager.module.scss'
import Image from "../Image";

const cx = classNames.bind(styles)
const HeaderManager =() => {
   
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <button>
                    <span>Admin</span>
                    <Image src="https://static.cdnno.com/user/20e922c37c4dda863c987de56c55cc58/200.jpg?1665227144"  alt='logo'/>
                </button>
            </div>
        </div>
    );
}

export default HeaderManager