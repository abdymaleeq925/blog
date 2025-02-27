import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthState } from './redux/authSlice.js';

import './styles/index.css';
import {Home, PostDetail, Posts, Profile, Registration, FourOFour, CreatePost} from './pages/index.js';
import { Footer, Header } from './components/index.js';
import { useGetProfileQuery } from './services/authApi.js';

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
  }, [profile])

  return (
    <div className="App">
      {
        lastPath !== 'registration' && <Header/>
      }
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create-post' element={<CreatePost/>}/>
        <Route path='/posts/edit/:id' element={<CreatePost/>}/>
        <Route path='/posts/post-detail/:postId' element={<PostDetail/>}/>
        <Route path='/posts' element={<Posts/>}/>
        <Route path='/profile/:userId' element={<Profile/>}/>
        <Route path='/profile/registration' element={<Registration/>}/>
        <Route path='/*' element={<FourOFour/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
