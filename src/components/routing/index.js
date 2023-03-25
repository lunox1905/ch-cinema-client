import Movie from "../../pages/Movie";
import DefaultLayout from "../../Layout/DefaultLayout";
import ManagerLayout from "../../Layout/ManagerLayout";
import Home from "../../pages/Home";
import ManagerMenu from "../../pages/ManagerMenu";
import AddMenu from "../../pages/ManagerMenu/AddMenu";
import EditMenu from "../../pages/ManagerMenu/EditMenu";

export const publicRoutes = [
    {path: '/', component: Home, layout: DefaultLayout},
    {path: '/home', component: Home, layout: DefaultLayout},
    {path: '/manager/menu', component: ManagerMenu, layout: ManagerLayout},
    {path: '/manager/addmenu', component: AddMenu, layout: ManagerLayout},
    {path: '/manager/menu/edit/:slug', component: EditMenu, layout: ManagerLayout},
    {path: '/:slug', component: Movie, layout: DefaultLayout}
]

export const protectedRoutes = [
    
]

export const privateRoutes = [
    
    
]