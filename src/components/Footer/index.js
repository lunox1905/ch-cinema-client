import classNames from "classnames/bind";
import styles from './Footer.module.scss'
import { Container, Col, Row } from "react-bootstrap";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles)

function Footer() {
    const lists = [
        {
            title: 'GIỚI THIỆU',
            item: [
                {
                    title: 'VỀ CHÚNG TÔI',
                    link: '',
                },
                {
                    title: 'THỎA THUẬN SỬ DỤNG',
                    link: '',
                },
                {
                    title: 'QUY CHẾ HOẠT ĐỘNG',
                    link: '',
                },
                {
                    title: 'CHÍNH SÁCH BẢO MẬT',
                    link: '',
                },
            ]
        },
        {
            title: 'GÓC ĐIỆN ẢNH',
            item: [
                {
                    title: 'THỂ LOẠI PHIM',
                    link: '',
                },
                {
                    title: 'BÌNH LUẬN PHIM',
                    link: '',
                },
                {
                    title: 'BLOG PHIM',
                    link: '',
                },
                {
                    title: 'PHIM HAY THÁNG',
                    link: '',
                },
            ]
        },
        {
            title: 'HỖ TRỢ',
            item: [
                {
                    title: 'GÓP Ý',
                    link: '',
                },
                {
                    title: 'SALE & SERVICES',
                    link: '',
                },
                {
                    title: 'RẠP / GIÁ VÉ',
                    link: '',
                },
                {
                    title: 'TUYỂN DỤNG',
                    link: '',
                },
            ]
        },
        {
            title: 'KẾT NỐI CH CINEMA',
            item: [
                {
                    title: <FaFacebook/>,
                    link: 'https://www.facebook.com/thaichinh1905/',
                },
                {
                    title: <FaYoutube/>,
                    link: 'https://www.youtube.com',
                },
                {
                    title: <FaInstagram/>,
                    link: 'https://www.youtube.com',
                },
               
            ]
        },
    ]
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Container>
                    <Row>
                        {
                            lists.map(list => (
                                <Col lg={3}>
                                    <h1>{list.title}</h1>
                                    <ul>
                                        {
                                            list.item.map(item => (
                                                <li>
                                                    <Link to={item.link}>{item.title}</Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </Col>
                            ))
                        }
                    </Row>
                </Container>

            </div>
        </div>
    )
}

export default Footer