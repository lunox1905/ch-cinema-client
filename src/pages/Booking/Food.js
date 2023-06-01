import classNames from "classnames/bind";
import styles from './Booking.module.scss'
import convertPrice from "../../utils/convertPrice";
import { Table } from 'react-bootstrap';
const cx = classNames.bind(styles)

function Food ({foods, selectedFood, setSelectedFood, numberOfSeat, setNumberOfSeat, moviePrice}) {
    const sumFood = selectedFood.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount * foods.find(f => f._id === currentValue.id).price,
        0
    );
    const countAmountFood = (id) => {
        const c = selectedFood.find(f => f.id === id)
        if(c) {
            return c.amount
        } else return 0
    }
    const handlePriceFood = (id, price) => {
        const c = selectedFood.find(f => f.id === id)
        if(c) return c.amount * price
        else return 0
    }
    
    return (
        <div className={cx('booking')}>
            <h1 className={cx('heading')}>CHỌN VÉ/THỨC ĂN</h1>
            <div className={cx('container')}>
            <Table striped>
                <thead>
                    <tr>
                        <th>Loại vé</th>
                        <th>Số lượng</th>
                        <th>Giá (VNĐ)</th>
                        <th>Tổng (VNĐ)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Vé thường</td>
                        <td className={cx('col')}>
                        
                            <button className={cx('btn-amount')} onClick={() => {
                                if(numberOfSeat > 0) {
                                    setNumberOfSeat(numberOfSeat - 1)
                                }
                            }}>-</button>
                            <span className={cx('amount')}> 
                                {numberOfSeat}
                            </span>
                            
                            <button className={cx('btn-amount')} onClick={() => setNumberOfSeat(numberOfSeat + 1)}>+</button>
                        </td>
                        <td className={cx('col')}>{convertPrice(moviePrice)}</td>
                        <td className={cx('col')}>{convertPrice(moviePrice * numberOfSeat)}</td>
                    </tr>
                    <tr className={cx('sum')}>
                        <td colSpan={3}>Tổng</td>
                        <td className={cx('col')}>{convertPrice(moviePrice * numberOfSeat)}</td>
                    </tr>
                        
                </tbody>
            </Table>
            <Table striped>
                <thead>
                    <tr>
                        <th>Combo</th>
                        <th>Số lượng</th>
                        <th>Giá (VNĐ)</th>
                        <th>Tổng (VNĐ)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        foods.map((food) => (
                            <tr>
                                <td>
                                    <div className={cx('combo_item')}>
                                        <img src={food.image} alt='img food'/>
                                        <div className={cx('combo_box')}>
                                            <p>{food.title}</p>
                                            <span>{food.description}</span>
                                        </div>
                                    </div>
                                </td>
                                
                                <td className={cx('col')}>
                                
                                    <button className={cx('btn-amount')} onClick={() => {
                                        let newArr = selectedFood
                                        let c = 0
                                        selectedFood.forEach((f, i) => {
                                            if(f.id === food._id) {
                                                if(f.amount > 1) newArr[i].amount -= 1
                                                else if(f.amount === 1) {
                                                    newArr = selectedFood.filter(f => f.id !== food._id)
                                                }
                                                c++
                                                return
                                            }
                                        })
                                        if(c > 0) {
                                            setSelectedFood([...newArr])
                                        } 
                                    }}>-</button>
                                    <span className={cx('amount')}> 
                                        {countAmountFood(food._id)}
                                    </span>
                                    
                                    <button className={cx('btn-amount')} onClick={() => {
                                        let newArr = selectedFood
                                        let c = 0
                                        selectedFood.forEach((f, i) => {
                                            if(f.id === food._id) {
                                                newArr[i].amount += 1
                                                c++
                                                return
                                            }
                                        })
                                        if(c === 0) {
                                            newArr.push({
                                                id: food._id,
                                                amount: 1
                                            }) 
                                        }
                                        setSelectedFood([...newArr])
                                    }}>+</button>
                                </td>
                                <td className={cx('col')}>{convertPrice(food.price)}</td>
                                <td className={cx('col')}>{convertPrice(handlePriceFood(food._id, food.price))}</td>
                            </tr>
                        ))
                    }
                    <tr className={cx('sum')}>
                        <td colSpan={3}>Tổng</td>
                        <td className={cx('col')}>{convertPrice(sumFood)}</td>
                    </tr>
                </tbody>
            </Table>
            </div>
        </div>
    )
}

export default Food