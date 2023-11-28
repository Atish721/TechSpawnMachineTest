// import logo from './logo.svg';
import './Style.css';
import {Routes,Route} from 'react-router-dom'
import Login from './Component/Login.js'
import Header from './Component/Header';
import Home from './Component/Home';
import Footer from './Component/Footer';
import EmployeeList from './Component/EmployeeList';
import CreateEmployee from './Component/CreateEmployee';
import UpdateEmployee from './Component/UpdateEmployee';
import Protected from './Component/Protected';

function App() {
  return (
    <div className='App'>
      <Header/>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Protected Component={Home} />} />
          <Route path='/employee/list' element={<Protected Component={EmployeeList} />} />
          <Route path='/employee/create' element={<Protected Component={CreateEmployee} />} />
          <Route path='/employee/update/:id' element={<Protected Component={UpdateEmployee} />} />
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
