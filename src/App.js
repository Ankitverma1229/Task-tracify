import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Components/Forms/LoginForm';
import Home from './Pages/Home';
import RequireAuth from './Components/Auth/RequireAuth';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<LoginForm />} />
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
