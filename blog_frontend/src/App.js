import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { setAuthState } from './redux/authSlice.js';
import { useGetProfileQuery } from './services/authApi.js';

import {Home, PostDetail, Posts, Profile, Registration, FourOFour, CreatePost, Videos, Contacts} from './pages/index.js';
import { Footer, Header } from './components/index.js';

import './styles/index.scss';

function App() {
  const linkUrl = useLocation();
  const linkArr = linkUrl.pathname.split('/');
  const lastPath = linkArr[linkArr.length -1];
  
  const dispatch = useDispatch();
  const token = window.localStorage.getItem('token');
  const profile = useGetProfileQuery(token);
  useEffect(() => {
    if (token) {
      dispatch(setAuthState({isLoggedIn: true, data: profile?.data}))
    }
  }, [profile, dispatch, token])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [linkUrl.pathname]);

  return (
    <div className="App">
      {
        lastPath !== 'registration' && <Header/>
      }
      <ToastContainer hideProgressBar={true} position='bottom-center' newestOnTop={true} limit={1}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create-post' element={<CreatePost/>}/>
        <Route path='/posts/edit/:id' element={<CreatePost/>}/>
        <Route path='/posts/post-detail/:postId' element={<PostDetail/>}/>
        <Route path='/posts' element={<Posts/>}/>
        <Route path='/videos' element={<Videos/>}/>
        <Route path='/profile/:userId' element={<Profile/>}/>
        <Route path='/profile/registration' element={<Registration/>}/>
        <Route path='/contact-us' element={<Contacts/>}/>
        <Route path='/*' element={<FourOFour/>}/>
      </Routes>
      {
        lastPath !== 'registration' && <Footer/>
      }
    </div>
  );
}

export default App;
