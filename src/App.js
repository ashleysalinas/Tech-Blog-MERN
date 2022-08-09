import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/navigation/navigation.component'
import Homepage from './pages/homepage/homepage.component';
import Loginpage from './pages/loginpage/loginpage.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Homepage />}/>
        <Route path ='login' element={<Loginpage />}/>
        <Route path ='*' element={<Homepage />}/>
      </Route>
    </Routes>
  );
}

export default App;
