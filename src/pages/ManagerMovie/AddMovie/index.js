import classNames from "classnames/bind";
import styles from './AddMovie.module.scss';
import { useState, useContext, useEffect } from "react";
import { MovieContext } from "../../../contexts/MovieContext";
import { Button, Col, Row, Container, Form } from 'react-bootstrap'
import { FaCalendar, FaWindowClose } from "react-icons/fa";
import { URL } from "../../../contexts/constants";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles)

function AddMovie () {

    const [ movie, setMovie ] = useState({
        title: '',
        titleVi: '',
        producer: '',
        duration: null,
        director: '',
        country: '',
        cast: [],
        premiereDate: '',
        trailer: '',
        image: '',
        category: [],
    })
    const [ stateMovie, setStateMovie ] = useState(true)

    const [ cast, setCast ] = useState([])
    const [ showCalendar, setShowCalendar ] = useState(false)
    const { addMovie } = useContext(MovieContext)
    const [ category, setCategory ] = useState([])
    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://${URL}/getcategory`)
        .then(response => {
            setCategory(response.data.category)
        })
        .catch(error => {
            console.log(error);
        });
    }, [])
    
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setSelectedFile(reader.result);
        };
    };

    const updateMovie = e => {
        setMovie({...movie, [e.target.name]: e.target.value});
    }
    
    const updateCalendar = e => {
        const d = new Date(e)
        setMovie({...movie, premiereDate: d.getFullYear()+ '/' +(d.getMonth() + 1)+ '/' +d.getDate() })
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

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else {
            const categorys = document.querySelectorAll(`.${cx('inputCategory')}`)    
            const submit = movie
            categorys.forEach((category) => {
                if(category.checked) {
                    submit.category.push(category.value)
                }
            })
            if (!selectedFile) return;
            submit.image = selectedFile
            submit.cast = cast
            submit.state = stateMovie
            addMovie(submit)
            navigate('/manager/movie')
            
        }
        setValidated(true);
    };

    return (
        <div className={cx('wrapper')}>
    
            <Container>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Tên phim</span>
                            <input className="form-control" value={movie.title} placeholder="Tên phim" name="title" onChange={updateMovie} required/>
                            <Form.Control.Feedback type="invalid">
                                Không được để trống phần này
                            </Form.Control.Feedback>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Tên phim tiếng việt</span>
                            <input className="form-control"value={movie.titleVi} placeholder="Tên phim tiếng việt" name="titleVi" onChange={updateMovie} required/>
                           
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Thời lượng</span>
                            <input className="form-control" type="number" value={movie.duration} placeholder="Thời lượng" name="duration" onChange={updateMovie} required/>
                            <Form.Control.Feedback type="invalid">
                                Không được để trống phần này
                            </Form.Control.Feedback>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Đạo diễn</span>
                            <input className="form-control"value={movie.director} placeholder="Đạo diễn" name="director" onChange={updateMovie} required/>
                            <Form.Control.Feedback type="invalid">
                                Không được để trống phần này
                            </Form.Control.Feedback>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Nhà sản xuất</span>
                            <input value={movie.producer} placeholder="Nhà sản xuất" name="producer" onChange={updateMovie}/>
                            <Form.Control.Feedback type="invalid">
                                Không được để trống phần này
                            </Form.Control.Feedback>
                        </div>
                    </Col>
                    
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Image</span>
                            <input
                                id="fileInput"
                                type="file"
                                name="image"
                                onChange={handleFileInputChange}
                                value={fileInputState}
                                required
                            />
                            {selectedFile && (
                                <img
                                    src={selectedFile}
                                    alt="chosen"
                                    style={{ height: '60px' }}
                                />
                            )}<Form.Control.Feedback type="invalid">
                                Vui lòng chọn ảnh
                            </Form.Control.Feedback>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Trailer</span>
                            <input className="form-control"value={movie.trailer} placeholder="Trailer" name="trailer" onChange={updateMovie} required/>
                            <Form.Control.Feedback type="invalid">
                                Không được để trống phần này
                            </Form.Control.Feedback>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Diễn viên</span>
                            {
                                cast.map((item, index) => (
                                    <div className={cx('box')}>
                                    <input className="form-control"value={item} placeholder="Tên diễn viên" onChange={updateCast(index)}/> 
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
                            <input placeholder="Nước sản xuất" name="country" onChange={updateMovie}/>
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
                                <input className="form-control"value={movie.premiereDate} required/>
                                <FaCalendar onClick={() => setShowCalendar(true)}/>
                            </div>
                            <div className={cx('calendar')} style={showCalendar ? {display: 'block'} : {display: 'none'}} >
                                <Calendar onChange={e => {
                                    updateCalendar(e)
                                }}/>
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={cx('item')}>
                            <span>Trạng thái</span>
                            <input className="input_check" type="checkbox" checked={stateMovie} onClick={() => setStateMovie(!stateMovie)}/>
                        </div>
                    </Col>
                    <Col lg={12}>
                        <div className={cx('item')}>
                            <span>Nội dung</span>
                            <textarea name="description" onChange={updateMovie}>{movie.description}</textarea>
                        </div>
                    </Col>
                </Row>
                
                
                <div className={cx('option')}>      
                    <Button size="lg" variant="outline-primary" type="submit">Thêm phim</Button>
                    <span id='err' style={{color: 'red'}}></span>
                </div>
                </Form>
            </Container>
        </div>
    )
}

export default AddMovie