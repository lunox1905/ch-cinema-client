
import classNames from "classnames/bind"
import styles from './Movie.module.scss'
import { FaStar } from "react-icons/fa"
import { memo } from "react"

const cx = classNames.bind(styles)
function Rating ({show, id, updateRating}) {
    const list = document.querySelectorAll('.item-rating')
    const handleOver = (e) => {
        list.forEach((element, index) => {
            
            if(index < e.target.closest('li').value) {
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
        updateRating(id, {rating: e.target.closest('li').value})
        console.log(e.target.closest('li').value)

    }
    return (
        <ul className={cx('option-rating')} 
            onMouseOver={handleOver} 
            onMouseLeave={handleLeave} 
            style={show ? {display: 'flex'} : {display: 'none'}}
            onClick={handleClick}
        >
            <li className="item-rating" value={1} ><FaStar/></li>
            <li className="item-rating" value={2} ><FaStar/></li>
            <li className="item-rating" value={3} ><FaStar/></li>
            <li className="item-rating" value={4} ><FaStar/></li>
            <li className="item-rating" value={5} ><FaStar/></li>
            <li className="item-rating" value={6} ><FaStar/></li>
            <li className="item-rating" value={7} ><FaStar/></li>
            <li className="item-rating" value={8} ><FaStar/></li>
            <li className="item-rating" value={9} ><FaStar/></li>
            <li className="item-rating" value={10} ><FaStar/></li>
        </ul>
    )
} 

export default memo(Rating)