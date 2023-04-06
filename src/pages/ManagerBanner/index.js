import classNames from "classnames/bind";
import styles from './ManagerMovie.module.scss';
import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../contexts/constants";
import { Button, Table } from 'react-bootstrap';
import { FaPlus, FaPen, FaTrash } from 'react-icons/fa'
import Loading from "../../components/Loading";
import AddBanner from "./AddBanner";
import EditBanner from "./EditBanner";
const cx = classNames.bind(styles)

function ManagerBanner() {

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [slides, setSlides] = useState([])
    const [loading, setLoading] = useState(true)
    const [ slide, setSlide ] = useState(null)
    useEffect(() => {
        axios.get(`http://${URL}/getbanner`)
        .then(response => {
            setSlides(response.data.banner)
            setLoading(false)
        })
        .catch(error => {
            console.log(error);
        });
    }, [loading])


    const deleteBanner = (e) => {
        setLoading(true)
        axios.post(`http://${URL}/deletebanner`, {id: e.target.closest('button').value})
        .then(response => {
            if(response.data.success) setLoading(false)
        })
        .catch(error => {
            console.log(error);
        });
    }

    const handleEdit = (e) => {
        const s = slides.find(slide => slide._id === e.target.closest('button').value)
        setSlide(s)
        
        setShowEdit(true)
    }

    if(loading) return <Loading />
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Button variant="primary" onClick={() => setShowAdd(true)}>
                    <FaPlus/>Thêm banner
                </Button>
            </div>
            <div className={cx('container')}>
               <Table striped  hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Đường dẫn</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    {
                        slides.map((slide, index) => (
                                    
                            <tr>
                                <td>{index + 1}</td>
                                <td><img src={slide.image} alt='img banner'/></td>
                                <td>{slide.link}</td>
                                <td>
                                    
                                    <button value={slide._id}>
                                        <FaPen color="blue" onClick={handleEdit}/>  
                                    </button>

                                    <button value={slide._id}>
                                        <FaTrash color="red" onClick={deleteBanner}/>   
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    
                    
                    </tbody>
               </Table>
              
            </div>
            { showAdd && <AddBanner title={'Thêm banner'} setShow={setShowAdd} setLoading={setLoading} />} 
            { showEdit && <EditBanner slide={slide} setShow={setShowEdit} title={'Sửa banner'} setLoading={setLoading} />} 
            
        </div>
    )
}

export default ManagerBanner