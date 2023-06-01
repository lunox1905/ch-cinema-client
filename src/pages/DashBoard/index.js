import classNames from 'classnames/bind'
import styles from './DashBoard.module.scss'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, ArcElement, BarElement, Legend, Tooltip } from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { useContext, useEffect, useState } from 'react';
import { CinemaContext } from '../../contexts/CinemaContext'
import { MovieContext } from '../../contexts/MovieContext'
import { getAmountUser } from '../../contexts/DashBoardContext';
import { getBookings } from '../../contexts/BookingContext'
import { FoodContext } from '../../contexts/FoodContext'
import { FaDollarSign, FaFilm, FaUserAlt, FaUniversity} from 'react-icons/fa'
import Loading from '../../components/Loading'
import convertPrice from '../../utils/convertPrice'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Legend);
const cx = classNames.bind(styles)
const color = ['red', 'rgb(54, 162, 235)', '#56c977', 'yellow','gray', 'black', 'pink']
function DashBoard () {
  const { cinemaState: {cinemas}} = useContext(CinemaContext)
  const { movieState: {movies}} = useContext(MovieContext)
  const { getFoods } = useContext(FoodContext)
  const [ amountUser, setAmountUser ] = useState(0)
  const [ revenue, setRevenue ] = useState(0)
  const [ dataPie, setDataPie ] = useState([])
  const [ dataLine, setDataLine ] = useState([])
  const [ dataFood, setDataFood ] = useState([]) 
  const [ dataMovie, setDataMovie ] = useState([]) 
  const [ loading, setLoading ] = useState(true)
  useEffect(() => {
    getAmountUser()
    .then(res => {
      if(res.success) {
        setAmountUser(res.countUser)
      }
    })
    var booking = []
    getBookings()
    .then(res => {
      booking = res.booking
      const r = res.booking.reduce(
        (accumulator, currentValue) => accumulator + currentValue.price,
        0)
      const pie = []
      cinemas.forEach(c => {
        pie.push({
          _id: c._id,
          name: c.name,
          revenue: 0
        })
      })
    
      const linedata = []
      let i = 11
      let monthNow = new Date().getMonth() + 1
      while(i >= 0) {
        if(monthNow - i <= 0) {
          linedata.push({
            month: 12 + monthNow - i,
            revenue: 0
          })
        } else {
          linedata.push({
            month: monthNow - i,
            revenue: 0
          })
        }
        i--;
      }
      const datamovie = []
      movies.forEach(m => {
        datamovie.push({
          _id: m._id,
          title: m.title,
          image: m.image,
          revenue: 0
        })
      })
      res.booking.forEach((b, index) => {
        pie.forEach(d => {
          if(d._id === b.cinema) {
            d.revenue += b.price
            return
          }
        })
        linedata.forEach(l => {
          if(l.month === new Date(b.createdAt).getMonth() + 1) {
            l.revenue += b.price
            return
          }
        })
        datamovie.forEach(m => {
          if(m._id === b.movie) {
            m.revenue += b.price
            return
          }
        })
        
      })
      setDataMovie(datamovie.sort((a, b) => b.revenue - a.revenue))
      setDataLine(linedata)
      setDataPie(pie)
      setRevenue(r)
      setLoading(false)
    })
    getFoods()
    .then (res => {
      if(res.success) {
        setDataFood(res.food)
      }
    })
    console.log(movies)
  }, [])
  if(loading) return <Loading/>
  return (
      <div className={cx('wrapper')}>
          <Container>
              <Row>
                  <Col md={3}>
                      <div className={cx('card','card1')}>
                          <div>
                            <h4>Phim</h4>
                            <h2>{movies.length}</h2>
                          </div>
                          <FaFilm />
                      </div>
                  </Col>
                  <Col md={3}>
                      <div className={cx('card','card2')}>
                        <div>
                          <h4>Rạp chiếu</h4>
                          <h2>{cinemas.length}</h2>
                        </div>
                        <FaUniversity />
                      </div>
                  </Col>
                  <Col md={3}>
                      <div className={cx('card','card3')}>
                        <div>
                          <h4>Người dùng</h4>
                          <h2>{convertPrice(amountUser)}</h2>
                        </div>
                        <FaUserAlt />
                      </div>
                  </Col>
                  <Col md={3}>
                      <div className={cx('card','card4')}>
                        <div>
                          <h4>Doanh thu</h4>
                          <h2>{convertPrice(revenue)}</h2>
                        </div>
                        <FaDollarSign/>
                      </div>
                  </Col>
              </Row>
              <Row>
                <Col md='9'>
                  <div className={cx('chart')}>
                    <h3>DOANH THU THEO THÁNG</h3>
                    <div className={cx('chart_line')}>
                      <Line
                        data={{
                          labels: dataLine.map(d => "Tháng " + d.month),
                          datasets: [{
                            label: 'My First Dataset',
                            data: dataLine.map(d => d.revenue),
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.1,
                          }]
                        }}
                        options={{
                            maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              display: false
                          }}
                          }
                        }
                      />
                    </div>
                  </div>
                </Col>
                <Col md='3'>
                  <div className={cx('chart')}>
                  <h3>DOANH THU CÁC RẠP</h3>
                  <Pie
                    data={{
                      labels: dataPie.map(d => d.name),
                      datasets: [{
                        data: dataPie.map(d => d.revenue),
                        backgroundColor: color.map((c,i) => {
                          if(i > dataPie.length) {
                            return
                          }
                          return c
                        }),
                        hoverOffset: 4
                      }]
                    }}
                    options={{
                      plugins: {
                        
                        legend: {
                          display: true,
                          position: 'bottom', // set the legend display position here
                          align: 'left',
                          maxWidth: '500',
                          labels: {
                            pointStyle: 'circle',
                            usePointStyle: true,
                            pointStyleWidth: 12,
                            boxHeight: 8,
                            textAlign: 'center'
                          },
                          title: {
                            display: true
                          }
                      }}
                      }
                    }
                  />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md='6'>
                  <div className={cx('table')}>
                    <h3>DOANH THU THEO PHIM</h3>
                    <Table>
                      <thead>
                        <tr>
                          <th colSpan={2}>Phim</th>
                          <th>Doanh thu</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                          dataMovie.map((movie, index) => {
                            if(index < 5) {
                              return (
                                <tr>
                                  <td><img src={movie.image} alt='movie-img'/></td>
                                  <td>
                                      {movie.title}
                                  </td>
                                  <td>{convertPrice(movie?.revenue)}đ</td>
                                </tr>
                              )
                            }
                          })
                        }
                      </tbody>
                    </Table>
                  </div>
                </Col>
                <Col md='6'>
                <div className={cx('table')}>
                <h3>DOANH THU ĐỒ ĂN</h3>
                    <Table>
                      <thead>
                        <tr>
                          <th colSpan={2}>Đồ ăn</th>
                          <th>Doanh thu</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          dataFood.map(food => (
                            <tr>
                              <td><img className={cx('img_food')} src={food.image} alt='d'/></td>
                              <td>{food.title}</td>
                              <td>{convertPrice(food?.revenue)}đ</td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
          </Container>
      </div>
  )
}

export default DashBoard