import {Routes, Route} from 'react-router-dom';
import Home from '@/pages/Home';
import Items from '@/pages/Items';
import NewItem from '@/pages/NewItem';
import About from '@/pages/About';
import Login from '@/pages/Login';
import GeneralLayout from "@/layouts/GeneralLayout.tsx";
import {ProtectedRoute} from "@/routers/ProtectedRoute.tsx";
import {Navigate} from "react-router";
import {Suspense} from "react";
import Loader from "@/components/Loader.tsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route
        element={
          <GeneralLayout/>
        }
      >
        <Route index element={<Home/>}/>
        <Route path="about" element={<About/>}/>
        <Route path="login" element={<Login/>}/>
        {/* Catch all unknown public routes */}
        <Route path="*" element={<Home/>}/>
        <Route index element={<Navigate to="items" replace/>}/>
        {/* Private routes under /items exists */}
        <Route path="items" element={
          <ProtectedRoute>
            <Suspense fallback={<Loader successMessage={"Cargando..."}/>}>
              <Items/>
            </Suspense>
          </ProtectedRoute>
        }/>
        <Route path="new-item" element={<NewItem/>}/>
      </Route>


    </Routes>
  );
};

export default AppRouter;
