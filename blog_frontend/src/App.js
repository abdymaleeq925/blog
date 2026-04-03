import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { setAuthState, setLogOut } from './redux/authSlice.js';
import { useGetProfileQuery } from './services/authApi.js';
import { Footer, Header } from './components/index.js';

import './styles/index.scss';

const Home = lazy(() => import('./pages/Home.jsx'));
const PostDetail = lazy(() => import('./pages/PostDetail.jsx'));
const Posts = lazy(() => import('./pages/Posts.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));
const Registration = lazy(() => import('./pages/Registration.jsx'));
const FourOFour = lazy(() => import('./pages/FourOFour.jsx'));
const CreatePost = lazy(() => import('./pages/CreatePost/CreatePost.jsx'));
const Videos = lazy(() => import('./pages/Videos.jsx'));
const Contacts = lazy(() => import('./pages/Contacts.jsx'));
const Resources = lazy(() => import('./pages/Resources.jsx'));

function App() {
  const linkUrl = useLocation();
  const linkArr = linkUrl.pathname.split('/');
  const lastPath = linkArr[linkArr.length - 1];

  const dispatch = useDispatch();
  const token = window.localStorage.getItem('token');
  const { data: profileData, isSuccess, isError } = useGetProfileQuery(undefined, { skip: !token });

  useEffect(() => {
    if (isSuccess && profileData) {
      dispatch(setAuthState({ isLoggedIn: true, data: profileData }));
    } else if (isError) {
      window.localStorage.removeItem('token');
      dispatch(setLogOut());
    }
  }, [isSuccess, isError, profileData, dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [linkUrl.pathname]);

  return (
    <div className="App">
      {
        lastPath !== 'registration' && <Header />
      }
      <ToastContainer hideProgressBar={true} position='bottom-center' newestOnTop={true} limit={1} />
      <Suspense fallback={<div className="loading-state" style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/posts/edit/:id' element={<CreatePost />} />
          <Route path='/posts/post-detail/:postId' element={<PostDetail />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/videos' element={<Videos />} />
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path='/profile/registration' element={<Registration />} />
          <Route path='/contact-us' element={<Contacts />} />
          <Route path='/resources' element={<Resources />} />
          <Route path='/*' element={<FourOFour />} />
        </Routes>
      </Suspense>
      {
        lastPath !== 'registration' && <Footer />
      }
    </div>
  );
}

export default App;
