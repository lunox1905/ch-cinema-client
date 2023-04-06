import classNames from "classnames/bind";
import styles from './ManagerCinema.module.scss';
import { useState, useContext } from "react";
import { Button, Table } from 'react-bootstrap';
import { FaPlus, FaPen, FaTrash, FaEye } from 'react-icons/fa'
import Loading from "../../components/Loading";
import AddCinema from "./AddCinema";
import EditCinema from "./EditCinema";
import DetailCinema from './DetailCinema'
import { CinemaContext } from "../../contexts/CinemaContext";
const cx = classNames.bind(styles)

function ManagerCinema() {

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDetail, setShowDetail] = useState(false)
    const [loading, setLoading] = useState(false)
    const [ cinema, setCinema ] = useState(null)

    const { cinemaState: { cinemas}, deleteCinema, addCinema, editCinema } = useContext(CinemaContext)

    const handleDelete= (e) => {
        setLoading(true)
        deleteCinema({id:e.target.closest('button').value})
        .then(response => {
            if(response) {
                setLoading(false)
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
    const handleEdit = (e) => {
        const c = cinemas.find(c => c._id === e.target.closest('button').value)
        setCinema(c)
        setShowEdit(true)
    }
    const handleDetail = (e) => {
        const c = cinemas.find(c => c._id === e.target.closest('button').value)
        setCinema(c)
        setShowDetail(true)
    }

    if(loading) return <Loading />
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Button variant="primary" onClick={() => setShowAdd(true)}>
                    <FaPlus/>Thêm rạp chiếu
                </Button>
            </div>
            <div className={cx('container')}>
               <Table striped hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên rạp</th>
                            <th>Số điện thoại</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    {
                        cinemas.map((cinema, index) => (
                                    
                            <tr>
                                <td>{index + 1}</td>
                                <td>{cinema.name}</td>
                                <td>{cinema.phoneNumber}</td>
                                <td>
                                    <button value={cinema._id}>
                                        <FaEye color="green" onClick={handleDetail}/> 
                                    </button>
                                    <button value={cinema._id}>
                                        <FaPen color="blue" onClick={handleEdit}/>  
                                    </button>

                                    <button value={cinema._id}>
                                        <FaTrash color="red" onClick={handleDelete}/>   
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    
                    
                    </tbody>
               </Table>
              
            </div>
            { showAdd && <AddCinema title={'Thêm rạp chiếu phim'} setShow={setShowAdd} setLoading={setLoading} addCinema={addCinema}/>} 
            { showEdit && <EditCinema data={cinema} setShow={setShowEdit} title={'Sửa rạp chiếu phim'} setLoading={setLoading} editCinema={editCinema}/>} 
            { showDetail && <DetailCinema cinema={cinema} setShow={setShowEdit} title={'Chi tiết rạp chiếu phim'}/>} 
            
        </div>
    )
}

export default ManagerCinema