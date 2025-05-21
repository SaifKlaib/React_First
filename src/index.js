import ReactDOM from 'react-dom/client';
import './style.css'
import './Pages/Dashboard/dashboard.css'
import './all.min.css'
import './Pages/Website/Auth/loginStyle.css'
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import UserProvider from './Pages/Website/Context/UserContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <UserProvider>
    <App />
        </UserProvider>
    </Router>


);

