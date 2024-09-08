import Navbar from './components/Navbar';
import Destination from './components/Destination';
import Landing from './components/Landing';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
// import Footer from './components/Footer';
import Hotels from './components/Hotels';
import Chat from './components/Chat';
import Explore from './components/explore/Explore';
// import Maintodo from "./components/todos/Maintodo"
import RenderPlan from './components/todos/RenderPlan';

function App() {
  return (
    <div className="App">
       <Navbar />
       <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path='/Destination' element={<Destination/>}></Route>
          <Route path='/Login' element={<Login />}></Route>
          <Route path='/Signup' element={<Signup />}></Route>
          <Route path='/Hotels' element={<Hotels />}></Route>
          <Route path='/Explore' element={<Explore />}></Route>
          {/* <Route path='/todo' element={ <Maintodo /> }></Route> */}
          <Route path='/render' element={ <RenderPlan/> }></Route>
      </Routes>
      <Chat />
    </div>
  );
}

export default App;
