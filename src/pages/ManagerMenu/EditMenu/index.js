import classNames from "classnames/bind";
import styles from './EditMenu.module.scss';
import { useState, useContext, useEffect } from "react";
import { NavContext } from "../../../contexts/NavContext";
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
const cx = classNames.bind(styles)

function EditMenu () {
    const { navState: {menu}, editMenu } = useContext(NavContext)
    
    const params = useParams()
    const content = menu.filter(menu => menu._id === params.slug)
   
    
    const [ phuThuoc, setPhuThuoc ] = useState(content.phuThuoc ? content[0].phuThuoc : null)
    const [ title, setTitle] = useState(content.title ? content[0].title : '')
    if(content.phuThuoc) {
        console.log(content)
        setPhuThuoc(content[0].phuThuoc)
        setTitle(content[0].title)
    }
    const updatePhuThuoc = index => e => {

        let newArr = [...phuThuoc]; 
        
        newArr[index] = {...newArr[index], [e.target.name]: e.target.value}; // replace e.target.value with whatever you want to change it to
      
        setPhuThuoc(newArr);
      }

    const handleSubmit = () => {
        const menu = {
            title: title,
            phuThuoc: phuThuoc
        }

        editMenu(menu)
    }
    return (
        <div className={cx('wrapper')}>
    
            <div className={cx('container')}>
           
                <input value={title} onChange={e => {setTitle(e.target.value)}} placeholder="Menu chính"/>

                <div className={cx('list-phuThuoc')}>
                {
                    phuThuoc ? phuThuoc.map((item, index) => (
                        <div className={cx('item-detail')}>
                            <div>
                               
                                <input value={item.color} placeholder="Menu phụ thuộc" onChange={updatePhuThuoc(index)}/>
                            </div>
                            

                        </div>
                        ))  : <></>
                        
                    }
                     <Button
                        variant="primary"
                        onClick={() => {
                            let arr = [...phuThuoc]
                            arr.push({title: ''})
                            
                            setPhuThuoc(arr)
                        }}
                        >
                       + Thêm trường mới
                    </Button>
                    
                   
                </div>
              
            </div>
            
            <span id='err' style={{color: 'red'}}></span>
            <div className={cx('option')}>
              
                <Button size="lg" variant="outline-primary" onClick={handleSubmit}>Thêm menu</Button>
             
            </div>

        </div>
    )
}

export default EditMenu