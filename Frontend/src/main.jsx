import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from './components/Home';
import MainL from './components/MainL';
import AuthProvider from './components/providers/AuthProviders';
import Login from './components/Sequrity/Login';
import Registration from './components/Sequrity/Registration';
import Casignment from './components/assignments/Casignment';
import Allasignment from './components/assignments/Allasignment';
import ViewDetails from './components/assignments/ViewDetails';
import Update from './components/assignments/Update';
import PendingAll from './components/PendingAssignments/PendingAll';
import Check from './components/PendingAssignments/Check';
import PrivateRoute from './components/providers/PrivateRoute';
import Onlypending from './components/PendingAssignments/Onlypending';
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainL></MainL>,
    children:([
      {
        path:'/',
        element:<Home></Home>,
      },
      {
        path:'/login',
        element:<Login></Login>,
      },
      {
        path:'/signup',
        element:<Registration></Registration>,
      },
      {
        path:'/update/:id',
        element:<Update></Update>,
        loader:({params})=>fetch(`https://as11server.vercel.app/creass/${params.id}`)
      },
      {
        path:'/createassignment',
        element:<PrivateRoute><Casignment></Casignment></PrivateRoute>,
        
      },
      {
        path:'/pending',
        element:<PrivateRoute><PendingAll></PendingAll></PrivateRoute>,
        loader:()=>fetch(`https://as11server.vercel.app/subass`)
      },
      {
        path:'/myas',
        element:<PrivateRoute><Onlypending></Onlypending></PrivateRoute>,
        loader:()=>fetch(`https://as11server.vercel.app/subass`)
      },
      {
        path:'/vassignment/:id',
        element:<ViewDetails></ViewDetails>,
        loader:({params})=>fetch(`https://as11server.vercel.app/creass/${params.id}`)
      },
      {
        path:'/check/:id',
        element:<Check></Check>,
        loader:({params})=>fetch(`https://as11server.vercel.app/subass/${params.id}`)
      },
      {
        path:'/allassignment',
        element:<Allasignment></Allasignment>,
        loader:()=>fetch(`https://as11server.vercel.app/creass`)
      }
    ])
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>,
)
