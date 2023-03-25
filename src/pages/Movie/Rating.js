
import classNames from "classnames/bind"
import styles from './Movie.module.scss'
import { FaStar } from "react-icons/fa"

const cx = classNames.bind(styles)
function Rating ({show}) {
    const list = document.querySelectorAll('.item-rating')
    const handleOver = (e) => {
        list.forEach((element, index) => {
            
            if(index <= e.target.closest('li').value) {
                element.classList.add(cx('active'))
            } else {
                element.classList.remove(cx('active'))
            }
        })

    }

    const handleLeave = () => {
        list.forEach(element => {
            element.classList.remove(cx('active'))
        })

    }

    const handleClick = (e) => {
        console.log(e)

    }
    return (
        <ul className={cx('option-rating')} 
            onMouseOver={handleOver} 
            onMouseLeave={handleLeave} 
            style={show ? {display: 'flex'} : {display: 'none'}}
            onClick={handleClick}
        >
            <li className="item-rating" value={0} ><FaStar/></li>
            <li className="item-rating" value={1} ><FaStar/></li>
            <li className="item-rating" value={2} ><FaStar/></li>
            <li className="item-rating" value={3} ><FaStar/></li>
            <li className="item-rating" value={4} ><FaStar/></li>
            <li className="item-rating" value={5} ><FaStar/></li>
            <li className="item-rating" value={6} ><FaStar/></li>
            <li className="item-rating" value={7} ><FaStar/></li>
            <li className="item-rating" value={8} ><FaStar/></li>
            <li className="item-rating" value={9} ><FaStar/></li>
        </ul>
    )
} 

export default Rating