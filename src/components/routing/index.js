import Movie from "../../pages/Movie";
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

export const publicRoutes = [
    {path: '/', component: Home, layout: DefaultLayout},
    {path: '/home', component: Home, layout: DefaultLayout},
    {path: '/manager/menu', component: ManagerMenu, layout: ManagerLayout},
    {path: '/manager/addmenu', component: AddMenu, layout: ManagerLayout},
    {path: '/manager/menu/edit/:slug', component: EditMenu, layout: ManagerLayout},
    {path: '/:slug', component: Movie, layout: DefaultLayout},
    {path: '/manager/movie', component: ManagerMovie, layout: ManagerLayout},
    {path: '/manager/addmovie', component: AddMovie, layout: ManagerLayout},
    {path: '/manager/detailmovie/:slug', component: Detail, layout: ManagerLayout},
    {path: '/manager/editmovie/:slug', component: EditMovie, layout: ManagerLayout},
    {path: '/manager/banner', component: Banner, layout: ManagerLayout},
]

export const protectedRoutes = [
    
]

export const privateRoutes = [
    
    
]