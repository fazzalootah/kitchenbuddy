import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signOut } from '../firebase';  // assuming you've exported auth from your firebase configuration



const Dashboard = () => {
  const navigate = useNavigate();

  async function handleSignOut(){
    try {
        await signOut(auth);
    } catch (error) {
        console.log(error)
    }
}
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default Dashboard;
