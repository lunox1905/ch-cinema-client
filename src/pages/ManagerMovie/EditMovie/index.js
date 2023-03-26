import classNames from "classnames/bind";
import styles from './EditMovie.module.scss';
import { useState, useContext, useEffect } from "react";
import { MovieContext } from "../../../contexts/MovieContext";
import { Button, Col, Row, Container } from 'react-bootstrap'
import { FaCalendar, FaWindowClose } from "react-icons/fa";
import { URL } from "../../../contexts/constants";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import Loading from '../../../components/Loading'
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles)

function EditMovie () {
   
    const { getMovie, editMovie } = useContext(MovieContext)
    const [ movieEdit, setMovieEdit ] = useState({
        title: '',
        titleVi: '',
        producer: '',
        duration: null,
        director: '',
        country: '',
        cast: [' '],
        premiereDate: '',
        trailer: '',
        image: '',
        category: []
    })
    const [ loading, setLoading ] = useState(true)
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
       console.log(getMovie(params.slug))
        getMovie(params.slug)
        .then(res => {
            if(res.success) {
                setMovieEdit(res.movie)
            }
        })

        axios.get(`http://${URL}/getcategory`)
        .then(response => {
            setCategory(response.data.category)
            console.log(category)
        })
        .catch(error => {
            console.log(error);
        });
        setLoading(false)
    }, [params.slug])

    const [ cast, setCast ] = useState([])
    const [ showCalendar, setShowCalendar ] = useState(false)
    
    const [ category, setCategory ] = useState([])
    
    const updateMovie = e => {
        setMovieEdit({...movieEdit, [e.target.name]: e.target.value});
      }
    
    const updateCalendar = e => {
        const d = new Date(e)
        setMovieEdit({...movieEdit, premiereDate: d.getFullYear()+ '/' +(d.getMonth() + 1)+ '/' +d.getDate() })
        setShowCalendar(false)
    }

    const updateCast = index => e => {
        
        let newArr = [...cast]; 
        newArr[index] = e.target.value
        setCast(newArr);
    }


    const handleDeleteCast = () => {
        const newArray = [...cast] 
        newArray.pop()
        setCast(newArray);
    }

    const handleSubmit = () => {
        const categorys = document.querySelectorAll(`.${cx('inputCategory')}`)
        const submit = movieEdit
        categorys.forEach((category, index) => {
            if(category.checked) {
                submit.category.push(category.value)
            }
        })
        submit.cast = cast;
        editMovie(submit, movieEdit._id)
        navigate(-1)
    }

    if(loading) return <Loading />
    return (
        <div className={cx('wrapper')}>
    
    <Container>
                <Row>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Tên phim</span>
                            <input value={movieEdit?.title} placeholder="Tên phim" name="title" onChange={updateMovie}/>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Tên phim tiếng việt</span>
                            <input value={movieEdit.titleVi} placeholder="Tên phim tiếng việt" name="titleVi" onChange={updateMovie}/>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Thời lượng</span>
                            <input value={movieEdit.duration} placeholder="Thời lượng" name="duration" onChange={updateMovie}/>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Đạo diễn</span>
                            <input value={movieEdit.director} placeholder="Đạo diễn" name="director" onChange={updateMovie}/>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Nhà sản xuất</span>
                            <input value={movieEdit.producer} placeholder="Nhà sản xuất" name="producer" onChange={updateMovie}/>
                        </div>
                    </Col>
                    
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Image</span>
                            <input value={movieEdit.image} placeholder="Image" name="image" onChange={updateMovie}/>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Trailer</span>
                            <input value={movieEdit.trailer} placeholder="Trailer" name="trailer" onChange={updateMovie}/>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Diễn viên</span>
                            {
                                cast.map((item, index) => (
                                    <div className={cx('box')}>
                                    <input value={item} placeholder="Tên diễn viên" onChange={updateCast(index)}/> 
                                    {
                                        index + 1 === cast.length ? (
                                            
                                            <FaWindowClose onClick={handleDeleteCast}/>
                                        ) : (
                                            <></>
                                        )
                                    }
                                    </div>
                                ))  
                            }
                            <Button
                                variant="primary"
                                onClick={() => {
                                    let arr = [...cast]
                                    arr.push('')
                                    setCast(arr)
                                }}
                                >
                            + Thêm diễn viên
                            </Button>
                        </div>
                    </Col>

                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Nước sản xuất</span>
                            <input value={movieEdit.country} placeholder="Nước sản xuất" name="country" onChange={updateMovie}/>
                        </div>
                    </Col>
                    <Col lg={6}>
                    <div className={cx('item')}>
                            <span>Thể loại</span>
                            <div className={cx('list-category')}>
                                {
                                    category?.map(c => (
                                        <div className={cx('item-category')}>
                                            <input className={cx('inputCategory')} type={'checkbox'} value={c._id}/>
                                            <span>{c.title}</span>
                                            
                                        </div>
                                    ))
                                    
                                }
                                </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Ngày khởi chiếu</span>
                            <div className={cx('box')}>
                                <input value={movieEdit.premiereDate}/>
                                <FaCalendar onClick={() => setShowCalendar(true)}/>
                            </div>
                            <div className={cx('calendar')} style={showCalendar ? {display: 'block'} : {display: 'none'}} >
                                <Calendar onChange={e => {
                                    updateCalendar(e)
                                }}/>
                            </div>
                        </div>
                    </Col>
                    <Col lg={12}>
                        <div className={cx('item')}>
                            <span>Nội dung</span>
                            <textarea name="description" onChange={updateMovie} value={movieEdit.description}></textarea>
                        </div>
                    </Col>
                </Row>
                
                <div className={cx('option')}>      
                    <Button size="lg" variant="outline-primary" onClick={handleSubmit}>Sửa</Button>
                    <span id='err' style={{color: 'red'}}></span>
                </div>
            </Container>
        </div>
    )
}

export default EditMovie