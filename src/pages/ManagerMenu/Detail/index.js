import classNames from "classnames/bind";
import styles from './Detail.module.scss';
import { useEffect, useState } from "react";
import { FaTimes } from 'react-icons/fa'
const cx = classNames.bind(styles)

function Detail ({menu}) {

    const [ open, setOpen ] = useState(true)
    useEffect(() => {
        setOpen(true)
    },[menu])
 
    return (
        <>
        {
            menu && open ? (
                <div className={ menu !== null ? cx('wrapper') : cx('wrapper', 'close')}>
                    
                     <FaTimes onClick={() => setOpen(false)}/>
            <div className={cx('container')}>
                
                <div className={cx('title')}>
                    <span>Menu chính</span>
                    <p>{menu.title}</p>
                </div>
                
                <div className={cx('list-phuThuoc')}>
                {
                    menu.phuThuoc.map((item, index) => (
                        <div key={index} className={cx('item-detail')}>
                            <div>
                               
                                <span>Menu phụ</span>
                                <p>{item.title}</p>
                            </div>
                            

                        </div>
                        ))  
                        
                    }
                     
                   
                </div>
              
            </div>
            

        </div>
            ) : (
                <></>
            )
        }
        </>
        
    )
}

export default Detail