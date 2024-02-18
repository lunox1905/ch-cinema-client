import classNames from "classnames/bind";
import styles from './ManagerShowTime.module.scss';
import { useState, useContext, useEffect } from "react";
import { Button, Table, Modal } from 'react-bootstrap';
import { FaPlus, FaPen, FaTrash, FaEye } from 'react-icons/fa'
import Loading from "../../components/Loading";
import AddShowTime from "./AddShowTime";
import EditShowTime from "./EditShowTime";
import { ShowTimeContext } from "../../contexts/ShowTimeContext";
import DetailShowTime from "./DetailShowTime";
import Modals from "../../components/Modal";
const cx = classNames.bind(styles)

function ManagerShowTime() {

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [loading, setLoading] = useState(false)
    const [ showTimes, setShowTimes ] = useState(null)
    const [ showTime, setShowTime ] = useState(null)
    const [ showModal, setShowModal ] = useState(false)
    const { deleteShowTime, addShowTime, editShowTime, getShowTimes } = useContext(ShowTimeContext)

    useEffect(() => {
        getShowTimes()
            .then(res => {
                if(res.success) {
                    setShowTimes(res.showTime)
                } 
            })
            .catch((e) => {
                console.log('err get showtime ' + e)
            })
    }, [loading])

    const handleDelete= () => {
        setShowModal(false)
        setLoading(true)
        deleteShowTime({id: showTime})
        .then(response => {
            if(response.success) {
                setLoading(false)
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
    const handleEdit = (e) => {
        const c = showTimes.find(c => c._id === e.target.closest('button').value)
        console.log(c)
        setShowTime(c)
        setShowEdit(true)
    }

    const handleClickDetail = (e) => {
        const c = showTimes.find(c => c._id === e.target.closest('button').value)
        setShowTime(c)
        setShowDetail(true)
    }

    if(loading) return <Loading />
    return (
        <div className={cx('wrapper')}>
      
            <Modals show={showModal} setShow={setShowModal} handle={handleDelete} 
                title={'Xóa lịch chiếu'} content={'Bạn chắc chắn muốn xóa lịch chiếu này!!'} type={'Delete'}/>
            <div className={cx('header')}>
                <Button variant="primary" onClick={() => setShowAdd(true)}>
                    <FaPlus/>Thêm lịch chiếu
                </Button>
            </div>
            <div className={cx('container')}>
               <Table striped hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên phim</th>
                            <th>Rạp chiếu</th>
                            <th>Thời gian</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    {
                        showTimes?.map((showTime, index) => (
                                    
                            <tr>
                                <td>{index + 1}</td>
                                <td>{showTime.movieId.title}</td>
                                <td>{showTime.cinemaId.name}</td>
                                <td>{showTime.time}</td>
                                <td>
                                    <button value={showTime._id}>
                                        <FaEye color="green" onClick={handleClickDetail}/>
                                    </button>
                                    <button value={showTime._id}>
                                        <FaPen color="blue" onClick={handleEdit}/>  
                                    </button>

                                    <button value={showTime._id}>
                                        <FaTrash color="red" onClick={e => {
                                            setShowTime(e.target.closest('button').value)
                                            setShowModal(true)
                                        }}/>   
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    
                    
                    </tbody>
               </Table>
              
            </div>
            { showAdd && <AddShowTime title={'Thêm lịch chiếu phim'} setShow={setShowAdd} setLoading={setLoading} addShowTime={addShowTime}/>} 
            { showEdit && <EditShowTime data={showTime} setShow={setShowEdit} title={'Sửa lịch chiếu phim'} setLoading={setLoading} editShowTime={editShowTime}/>} 
            { showDetail && <DetailShowTime showTime={showTime} setShow={setShowDetail} title={'Chi tiết lịch chiếu'}/>} 
            
        </div>
    )
}

export default ManagerShowTime