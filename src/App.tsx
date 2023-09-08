import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Layout from './layout/Layout';
import Login from './components/login/Login';
import Tasks from './components/tasks/Tasks';
import Register from './components/register/Register';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { useEffect } from 'react';
import { fetchUser } from './store/auth/auth.action';
import AllTasks from './components/allTasks/AllTasks';
import MainPage from './components/mainPage/MainPage';
import Profile from './components/profile/Profile';
import Cakes from './components/cakes/Cakes';



function App(): JSX.Element {

  const dispatch = useAppDispatch();
  const { authChecked } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (!authChecked) {
    return (
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Register />} />
          <Route path='/admin/tasks' element={<AllTasks />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/cakes' element={<Cakes />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
