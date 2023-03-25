import classNames from "classnames/bind";
import styles from './Movie.module.scss'

const cx = classNames.bind(styles)

function InfoMovie({title, content}) {

    return (
        <div className={cx('infoMovie')}>
        
            <span>{title}:</span>
            {
                Array.isArray(content) ? (
                    <div>
                    {

                        content.map((element,index) => {
                            return index + 1 < content.length ? <p>{element.title ? element.title : element},</p> : <p>{element.title ? element.title : element}</p>
                        })
                    }
                    </div>
                ) : (<p>{content}</p>)
            }
            
        </div>
    )
}

export default InfoMovie