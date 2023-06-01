import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import PrivateRoute from "./components/routing/PrivateRoute";
import PageNotFound from './components/Notfound'
import { publicRoutes, privateRoutes, protectedRoutes } from './components/routing'

function App() {
  
  return (
    <div className="App ">
      
        <Routes>
        {
            publicRoutes.map((route, index) => {
              const Page = route.component  
              const Layout = route.layout
              return (
                <Route key={index} path={route.path} 
                  element={
                    <Layout>
                      <Page/>
                    </Layout>
                  }
                />
              )
            })
          }
       
          {
            protectedRoutes.map((route, index) => {
              const Page = route.component
              const Layout = route.layout
              return (
                <Route key={index} path={route.path} 
                  element={
                    <ProtectedRoute 
                      Component={<Layout>
                        <Page/>
                      </Layout>}/>
                  }
                />
              )
            })
          }

          {
            privateRoutes.map((route, index) => {
              const Page = route.component
              const Layout = route.layout
              return (
                <Route key={index} path={route.path} 
                  element={
                    <PrivateRoute Component={<Layout>
                      <Page/>
                    </Layout>}/>
                  }
                />
              )
            })
          }
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      
      
    </div>
    
  );
}

export default App;
