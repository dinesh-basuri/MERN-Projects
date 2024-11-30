import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './components/Admin_Dashboard';
import FrontDeskDashboard from './components/frontDesk_Dashboard';
import UserDashboard from './components/User_Dashboard';
import UnAuthorized from './components/unAuthorized';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />
        <Route path="/unauthorized" element={<UnAuthorized />} />

        {/* Private Routes */}
        <Route 
          path="/admin-dashboard" 
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/frontdesk-dashboard" 
          element={
            <PrivateRoute role="frontdesk">
              <FrontDeskDashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/user-dashboard" 
          element={
            <PrivateRoute role="user">
              <UserDashboard />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}
