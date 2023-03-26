import classNames from "classnames/bind";
import styles from './ManagerMovie.module.scss';
import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../contexts/constants";
import { Button, Table } from 'react-bootstrap';
import { FaPlus, FaPen, FaTrash, FaEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Loading from "../../components/Loading";
import AddBanner from "./AddBanner";
import EditBanner from "./AddBanner";
const cx = classNames.bind(styles)

function ManagerBanner() {

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [slides, setSlides] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`http://${URL}/getbanner`)
        .then(response => {
            setSlides(response.data.banner)
            setLoading(false)
        })
        .catch(error => {
            console.log(error);
        });
    }, [])

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
                                <td><img src={slide.image}/></td>
                                <td>{slide.link}</td>
                                <td>
                                    <FaPen color="blue" onClick={() => setShowEdit(true)}/>

                                    <button value={slide._id}>
                                        <FaTrash color="red" />   
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    
                    
                    </tbody>
               </Table>
              
            </div>
            { showAdd && <AddBanner title={'Thêm banner'} setShow={setShowAdd}/>} 
            { showEdit && <EditBanner title={'Sửa banner'} setShow={setShowEdit}/>} 
            
        </div>
    )
}

export default ManagerBanner