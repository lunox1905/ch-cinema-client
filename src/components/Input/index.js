import classNames from 'classnames/bind';
import styles from './Input.module.scss'
import { Form } from 'react-bootstrap';

const cx = classNames.bind(styles)

function Input ({title, placeholder, value, name, handleUpdate}) {
    return (
        <div className={cx('item')}>
            <span>{title}</span>
            <input className="form-control" value={value} placeholder={placeholder} name={name} onChange={handleUpdate} required/>
            <Form.Control.Feedback type="invalid">
                Không được để trống phần này
            </Form.Control.Feedback>
        </div>
    )
}

export default Input