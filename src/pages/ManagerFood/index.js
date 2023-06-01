import classNames from "classnames/bind";
import styles from './ManagerFood.module.scss';
import { useState, useContext, useEffect } from "react";
import { Button, Table } from 'react-bootstrap';
import { FaPlus, FaPen, FaTrash, FaEye } from 'react-icons/fa'
import Loading from "../../components/Loading";
import AddFood from "./AddFood";
import EditFood from "./EditFood";
import DetailFood from './DetailFood'
import { FoodContext } from "../../contexts/FoodContext";
import Modals from "../../components/Modal";

const cx = classNames.bind(styles)

function ManagerFood() {

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showModal,  setShowModal] = useState(false)
    const [showDetail, setShowDetail] = useState(false)
    const [loading, setLoading] = useState(false)
    const [ foods, setFoods ] = useState([])
    const [ food, setFood ] = useState(null)

    const { getFoods ,deleteFood, addFood, editFood } = useContext(FoodContext)

    useEffect(() => {
        getFoods()
            .then(res => {
                if(res.success) {
                    setFoods(res.food)
                } 
            })
            .catch((e) => {
                console.log('err get showtime ' + e)
            })
    }, [loading])

    const handleDelete= (e) => {
        setShowModal(false)
        setLoading(true)
        deleteFood({id: food})
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
        const c = foods.find(c => c._id === e.target.closest('button').value)
        setFood(c)
        console.log(food)
        setShowEdit(true)
    }
    const handleDetail = (e) => {
        const c = foods.find(c => c._id === e.target.closest('button').value)
        setFood(c)
        console.log(food)
        setShowDetail(true)
    }

    if(loading) return <Loading />
    return (
        <div className={cx('wrapper')}>
            <Modals show={showModal} setShow={setShowModal} handle={handleDelete} 
                title={'Xóa đồ ăn'} content={'Bạn chắc chắn muốn xóa đồ ăn này!!'} type={'Delete'}/>
            <div className={cx('header')}>
                <Button variant="primary" onClick={() => setShowAdd(true)}>
                    <FaPlus/>Thêm đồ ăn
                </Button>
            </div>
            <div className={cx('container')}>
               <Table striped hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Nội dung</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    {
                        foods?.map((Food, index) => (
                                    
                            <tr>
                                <td>{index + 1}</td>
                                <td>{Food.title}</td>
                                <td>{Food.description}</td>
                                <td>
                                    <button value={Food._id}>
                                        <FaEye color="green" onClick={handleDetail}/> 
                                    </button>
                                    <button value={Food._id}>
                                        <FaPen color="blue" onClick={handleEdit}/>  
                                    </button>
                                    <button value={Food._id}>
                                        <FaTrash color="red" onClick={e => {
                                            setFood(e.target.closest('button').value)
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
            { showAdd && <AddFood title={'Thêm đồ ăn'} setShow={setShowAdd} setLoading={setLoading} addFood={addFood}/>} 
            { showEdit && <EditFood data={food} setShow={setShowEdit} title={'Sửa đồ ăn'} setLoading={setLoading} editFood={editFood}/>} 
            { showDetail && <DetailFood food={food} setShow={setShowDetail} title={'Chi tiết đồ ăn'}/>} 
            
        </div>
    )
}

export default ManagerFood