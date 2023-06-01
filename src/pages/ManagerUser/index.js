import classNames from "classnames/bind";
import styles from './ManagerUser.module.scss';
import { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import { FaEye, FaSearch } from 'react-icons/fa'
import Loading from "../../components/Loading";
import Detail from './Detail'
import { getUsers } from "../../contexts/AuthContext";
const cx = classNames.bind(styles)

function ManagerUser() {
    const [ showDetail, setShowDetail] = useState(false)
    const [search, setSeatch] = useState('')
    const [loading, setLoading ] = useState(false)
    const [ users, setUsers ] = useState([])
    const [ user, setUser ] = useState(null)
    var usersFilter = users
    if(search !== null) {
        usersFilter = users.filter((item) => {
            return item.email.toLowerCase().indexOf(search.toLowerCase()) !== -1;
          });
    }
    useEffect(() => {
        getUsers()
        .then(res => {
            if(res.success) {
                setUsers(res.users)
                setLoading(false)
            }
        })
    }, [])
    const handleDetail = (e) => {
        const c = users.find(c => c._id === e.target.closest('button').value)
        setUser(c)
        setShowDetail(true)
    }

    if(loading) return <Loading />
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('search')}> 
                    <FaSearch/>
                    <input onChange={(e) => setSeatch(e.target.value)} placeholder="Tìm kiếm theo email..." value={search}/>
                </div>
            </div>
            <div className={cx('container')}>
               <Table striped hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        usersFilter.map((u, index) => (
                                    
                            <tr>
                                <td>{index + 1}</td>
                                <td>{u.username}</td>
                                <td>{u.email}</td>
                                <td>
                                    <button value={u._id}>
                                        <FaEye color="green" onClick={handleDetail}/> 
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
               </Table>
            </div>
            { showDetail && <Detail user={user} setShow={setShowDetail} title={'Chi tiết'}/>} 
        </div>
    )
}

export default ManagerUser