import MovieDetail from "../../pages/MovieDetail";
import DefaultLayout from "../../Layout/DefaultLayout";
import ManagerLayout from "../../Layout/ManagerLayout";
import Home from "../../pages/Home";
import ManagerMenu from "../../pages/ManagerMenu";
import AddMenu from "../../pages/ManagerMenu/AddMenu";
import EditMenu from "../../pages/ManagerMenu/EditMenu";
import ManagerMovie from "../../pages/ManagerMovie";
import AddMovie from "../../pages/ManagerMovie/AddMovie";
import Detail from "../../pages/ManagerMovie/DetailMovie";
import EditMovie from "../../pages/ManagerMovie/EditMovie";
import Banner from "../../pages/ManagerBanner";
import ManagerFood from "../../pages/ManagerFood";
import Cinema from "../../pages/ManagerCinema";
import Profile from "../../pages/Profile";
import ShowTime from '../../pages/ManagerShowTime'
import Booking from "../../pages/Booking";
import BuyTicket from "../../pages/BuyTicket";
import Movie from "../../pages/Movie";
import Search from '../../pages/Search'
import DashBoard from "../../pages/DashBoard";
import ManagerUser from "../../pages/ManagerUser";
import PaymentSuccess from '../../pages/Booking/PaymentSuccess'
export const publicRoutes = [
    {path: '/', component: Home, layout: DefaultLayout},
    {path: '/home', component: Home, layout: DefaultLayout},
    {path: '/movie/:slug', component: MovieDetail, layout: DefaultLayout},
    {path: '/thanh-vien', component: Profile, layout: DefaultLayout},
    {path: '/booking/:id', component: Booking, layout: DefaultLayout},
    {path: '/mua-ve', component: BuyTicket, layout: DefaultLayout},
    {path: '/phim', component: Movie, layout: DefaultLayout},
    {path: '/search', component: Search, layout: DefaultLayout},
    {path: '/paymentsuccess', component: PaymentSuccess, layout: DefaultLayout},
]

export const protectedRoutes = [
    
]

export const privateRoutes = [
    {path: '/manager/menu', component: ManagerMenu, layout: ManagerLayout},
    {path: '/manager/addmenu', component: AddMenu, layout: ManagerLayout},
    {path: '/manager/menu/edit/:slug', component: EditMenu, layout: ManagerLayout},
    {path: '/manager/movie', component: ManagerMovie, layout: ManagerLayout},
    {path: '/manager/addmovie', component: AddMovie, layout: ManagerLayout},
    {path: '/manager/detailmovie/:slug', component: Detail, layout: ManagerLayout},
    {path: '/manager/editmovie/:slug', component: EditMovie, layout: ManagerLayout},
    {path: '/manager/banner', component: Banner, layout: ManagerLayout},
    {path: '/manager/cinema', component: Cinema, layout: ManagerLayout},
    {path: '/manager/showtime', component: ShowTime, layout: ManagerLayout},
    {path: '/manager/user', component: ManagerUser, layout: ManagerLayout},
    {path: '/manager/food', component: ManagerFood, layout: ManagerLayout},
    {path: '/manager', component: DashBoard, layout: ManagerLayout}
]