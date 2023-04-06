import classNames from "classnames/bind";
import styles from './ManagerMenu.module.scss';
import { useState, useContext } from "react";
import { NavContext } from "../../contexts/NavContext";
import { Button, Table } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi'
import { FaPlus, FaPen, FaTrash, FaEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Detail from "./Detail";
import Loading from "../../components/Loading";
const cx = classNames.bind(styles)

function ManagerMenu () {

   
    const { navState: {menu}, deleteMenu } = useContext(NavContext)
    const [search, setSeatch] = useState('')
    const [detail, setDetail] = useState(null)
    const [loading, setLoading] = useState(false)
   
    const handleDelete = (e) => {
        setLoading(true)
        deleteMenu({id: e.target.closest('button').value})
            .then(res => {
                if(res) {
                    setLoading(false)
                }
            })
    }

    if(loading) return <Loading/>

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('search')}> 
                    <FiSearch/>
                    <input onChange={(e) => setSeatch(e.target.value)} placeholder="Search..." value={search}/>
                </div>
                <Button variant="primary">
                    <Link to={'/manager/addmenu'}>
                        <FaPlus/>Thêm menu
                    </Link>
                </Button>
            </div>
            <div className={cx('container')}>
               <Table striped hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Đường dẫn</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        menu?.map((menu, index) => (           
                            <tr>
                                <td>{index}</td>
                                <td>{menu.title}</td>
                                <td>{menu.slug}</td>
                                <td>
                                    <FaEye color="green" onClick={() => setDetail(menu)}/>
                                    <Link to={'/manager/menu/edit/' + menu._id} >
                                        <FaPen color="blue"/>
                                    </Link>
                                    <button value={menu._id}>
                                        <FaTrash color="red" onClick={handleDelete}/>   
                                    </button>   
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
               </Table>
            </div>
            <Detail menu={detail}/>
        </div>
    )
}

export default ManagerMenu