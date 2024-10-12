import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/Login.css';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:4200/api/auth/change-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming JWT for authentication
          },
          body: JSON.stringify({
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess('Password updated successfully.');
        navigate('/login'); // Redirect to login page
      } else {
        setError(data.message || 'Password update failed');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while updating the password');
    }
  };

  return (
    <div className="loginPage">
      <div className="loginContainer">
        <h2 className="title">Change Password</h2>
        <input
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          placeholder="Enter new password"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
        />
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button onClick={handleChangePassword}>Change Password</button>
      </div>
    </div>
  );
};

export default ChangePassword;
