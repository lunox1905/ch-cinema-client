import classNames from "classnames/bind";
import styles from './ManagerMovie.module.scss';
import { useState, useContext } from "react";
import { MovieContext } from "../../contexts/MovieContext";
import { Button, Table } from 'react-bootstrap';
import { FiSearch } from 'react-icons/fi'
import { FaPlus, FaPen, FaTrash, FaEye } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Loading from "../../components/Loading";
const cx = classNames.bind(styles)

function ManagerMovie() {

   
    const { movieState: {movies}, deleteMovie } = useContext(MovieContext)
    const [search, setSeatch] = useState('')
    const [loading, setLoading ] = useState(false)
    var moviesFilter = movies
    if(search !== null) {
        moviesFilter = movies.filter((item) => {
            return item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
          });
    }

    const handleDelete = (e) => {
        setLoading(true)
        deleteMovie({id: e.target.closest('button').value})
            .then(res => {
                if(res.success) {
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
                    <Link to={'/manager/addmovie'}>
                        <FaPlus/>Thêm phim
                    </Link>
                </Button>
            </div>
            <div className={cx('container')}>
               <Table striped  hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Thời lượng</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                    {
                        moviesFilter.map((movies, index) => (
                                    
                            <tr>
                                <td>{index}</td>
                                <td>{movies.title}</td>
                                <td>{movies.duration + ' phút'}</td>
                                <td>
                                    <Link to={'/manager/detailmovie/' + movies.slug} >
                                    <FaEye color="green"/>
                                    </Link>
                                    <Link to={'/manager/editmovie/' + movies.slug} >
                                        <FaPen color="blue"/>
                                    </Link>

                                    <button value={movies._id} onClick={handleDelete} >
                                        <FaTrash color="red" />   
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    
                    
                    </tbody>
               </Table>
              
            </div>
            
        </div>
    )
}

export default ManagerMovie