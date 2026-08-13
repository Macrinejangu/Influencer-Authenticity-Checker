import { BrowserRouter, Routes, Route } from 'react-router-dom';
                                              
import Landing from './pages/Landing';
import Search from './pages/Search';
import Loading from './pages/Loading';
 
import Results from './pages/Results';
//import ErrorPage from './pages/Error';
//import History from './pages/History';
//import Account from './pages/Account';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Landing/>} />
        
        <Route path="/search" element={<Search/>} />
        
        <Route path="/loading" element={<Loading />} />
        
        <Route path="/results/:handle" element={<Results />} />
        {/*
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/history" element={<History />} />
        <Route path="/account" element={<Account />} />
        */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

