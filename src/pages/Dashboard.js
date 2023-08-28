import React, { useState, useEffect } from 'react';
import { firestore, auth, signOut } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import "./css/dashboard.css";
import PreferencesModal from './PreferencesModal';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const checkFirstLogin = async () => {
          const userRef = doc(firestore, "users", user.uid, "data", "preferences");
          const docSnapshot = await getDoc(userRef);
          if (!docSnapshot.exists()) {
            setShowModal(true);
            setIsFirstLogin(true);
          }
        };
        checkFirstLogin();
      }
    });

    // Cleanup subscription
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleSignOut}>Sign Out</button>
      {showModal && <PreferencesModal close={closeModal} isFirstLogin={isFirstLogin}  />}

    </div>
  );
}

export default Dashboard;
