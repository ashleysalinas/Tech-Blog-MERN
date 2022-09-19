import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navigation from './components/navigation/navigation.component'
import Homepage from './pages/homepage/homepage.component';
import Loginpage from './pages/loginpage/loginpage.component';
import Profile from './pages/profile/profile.component';
import NewPost from './pages/newpost/newpost.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './utils/PrivateRoute';
import PostPage from './pages/postpage/postpage.page';

const App = () => {


  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Homepage />}/>
        <Route path ='login' element={<Loginpage />}/>
        <Route element={<PrivateRoute />}>
            <Route path ='profile' element={<Profile />} />
            <Route path ='newpost' element={<NewPost />}/>
        </Route>
        <Route path='post/:id' element={<PostPage />}/>
        <Route path ='*' element={<Homepage />}/>
        <Route path='redirect' element={<Navigate to='/' />} />
        <Route path='redirect/profile' element={<Navigate to='/profile' />} />
      </Route>
    </Routes>
  );
}

export default App;
