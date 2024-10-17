import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import LoginPage from './pages/LoginPage';
import Home from './pages/Home';



const AppRouter = () => {

    return (
      <Router>
        <Routes>
          {/* <Route path="/1" element={<ChartsOverview />} /> */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/course/:id" element={<CoursePage />} />
          <Route path="*" element={<NotFoundPage />} />  */}
        </Routes>
      </Router>
    );
  };

  export default AppRouter;
