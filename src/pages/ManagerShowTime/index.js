import classNames from "classnames/bind";
import styles from './ManagerShowTime.module.scss';
import { useState, useContext, useEffect } from "react";
import { Button, Table } from 'react-bootstrap';
import { FaPlus, FaPen, FaTrash } from 'react-icons/fa'
import Loading from "../../components/Loading";
import AddShowTime from "./AddShowTime";
import EditShowTime from "./EditShowTime";
import { ShowTimeContext } from "../../contexts/ShowTimeContext";
const cx = classNames.bind(styles)

function ManagerShowTime() {

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [loading, setLoading] = useState(false)
    const [ showTimes, setShowTimes ] = useState(null)
    const [ showTime, setShowTime ] = useState(null)
    const { deleteShowTime, addShowTime, editShowTime, getShowTimes } = useContext(ShowTimeContext)

    useEffect(() => {
        getShowTimes()
            .then(res => {
                if(res.data.success) {
                    setShowTimes(res.data.showTime)
                } 
            })
            .catch((e) => {
                console.log('err get showtime ' + e)
            })
    }, [loading])

    const handleDelete= (e) => {
        setLoading(true)
        deleteShowTime({id: e.target.closest('button').value})
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
    
        const c = showTime.find(c => c._id === e.target.closest('button').value)
        setShowTime(c)
        setShowEdit(true)
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
                            <th>Tên phim</th>
                            <th>Tên rạp</th>
                            <th>Thời gian</th>
                            <th>hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    {
                        showTimes.map((showTime, index) => (
                                    
                            <tr>
                                <td>{index + 1}</td>
                                <td>{showTime.name}</td>
                                <td>{showTime.phoneNumber}</td>
                                <td>
                                    
                                    <button value={showTime._id}>
                                        <FaPen color="blue" onClick={handleEdit}/>  
                                    </button>

                                    <button value={showTime._id}>
                                        <FaTrash color="red" onClick={handleDelete}/>   
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    
                    
                    </tbody>
               </Table>
              
            </div>
            { showAdd && <AddShowTime title={'Thêm rạp chiếu phim'} setShow={setShowAdd} setLoading={setLoading} addShowTime={addShowTime}/>} 
            { showEdit && <EditShowTime data={showTime} setShow={setShowEdit} title={'Sửa rạp chiếu phim'} setLoading={setLoading} editShowTime={editShowTime}/>} 
            
        </div>
    )
}

export default ManagerShowTime