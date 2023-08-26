import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn, signInWithGoogle } from '../firebase';
import '../index.css';
import './css/signIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    const response = await signIn(email, password);
    
    if (response.status === 'success') {
      return navigate('/dashboard');
    } else {
      setError(getFriendlyErrorMessage(response.code));
    }
  };

  const handleGoogleSignIn = async () => {
    try {
        console.log("Initiating Google sign-in...");

        const response = await signInWithGoogle();
        console.log("Response received from Google:", response);

        if (response.status === 'success') {
            console.log("Successfully signed in! Redirecting to dashboard...");
            navigate('/dashboard');
        } else {
            console.error("Sign-in failed:", response.message);
            setError(parseErrorMessage(response.code));
        }
    } catch (error) {
        console.error("An error occurred during Google sign-in:", error);
    }
};

// Helper function to get a user-friendly error message
const parseErrorMessage = (code) => {
    // Add logic to parse the error code and return a friendly message.
    // For now, I'm just returning the code itself:
    return code;
};

  

  const getFriendlyErrorMessage = (errorCode) => {
    switch (errorCode) {
        case 'auth/app-deleted':
            return 'The authentication database is no longer available. Please contact support.';
        case 'auth/invalid-user-token':
            return 'The user data is no longer valid. Please log in again.';
        case 'auth/user-token-expired':
            return 'The user session has expired. Please log in again.';
        case 'auth/null-user':
            return 'No user data available. Please log in again.';
        case 'auth/invalid-email':
            return 'The email address is not valid. Please check and try again.';
        case 'auth/user-disabled':
            return 'This account has been disabled. Please contact support.';
        case 'auth/user-not-found':
            return 'No account exists with this email address. Please check or consider signing up.';
        case 'auth/wrong-password':
            return 'Incorrect password. Please try again or reset your password.';
        case 'auth/email-already-in-use':
            return 'This email address is already in use by another account. Please choose another email.';
        case 'auth/operation-not-allowed':
            return 'Sign-in operation is not allowed. Please contact support.';
        case 'auth/too-many-requests':
            return 'We detected too many requests from your device. Please wait a while and try again.';
        case 'auth/network-request-failed':
            return 'Network error encountered. Please check your connection and try again.';
        case 'auth/popup-closed-by-user':
            return 'The popup was closed before authentication could complete. Please try again.';
        case 'auth/popup-blocked':
            return 'The popup was blocked by the browser. Please allow popups and try again.';
        case 'auth/cancelled-popup-request':
            return 'Multiple popup requests detected. Please try again.';
        case 'auth/popup-already-closed':
            return 'The authentication popup was closed prematurely. Please try again.';
        case 'auth/auth-domain-config-required':
            return 'The authentication configuration is missing. Please contact support.';
        case 'auth/credential-already-in-use':
            return 'These credentials are already associated with another user account. Please try a different method.';
        case 'auth/operation-not-supported-in-this-environment':
            return 'This authentication operation is not supported in your current environment. Please try a different method or device.';
        case 'auth/timeout':
            return 'The operation has timed out. Please check your network connection and try again.';
        default:
            return 'An unexpected error occurred. Please try again later.';
    }
};


  return (
    <div className='signin-container'>
      <form onSubmit={handleEmailSignIn} className='signin-form'>
        <div className='signin-header'>
          <h3 className='signin-title'>Sign In</h3>
          <p className='signin-description'>Welcome back! Sign in to continue.</p>
        </div>
        <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <button type="submit" className='signin-button'>Sign In</button>
        {error && <p className='error-message'>{error}</p>}
        <div className='divider'></div>
        <button type="button" onClick={handleGoogleSignIn} className='tertiary'>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
          <path d="M21.5 11.79C21.5 15.94 19.29 21 12.63 21C7.62461 21.0332 3.53852 17.0053 3.5 12C3.53852 6.99461 7.62461 2.9667 12.63 2.99996C14.7007 3.00764 16.7085 3.71213 18.33 4.99996C18.442 5.09149 18.5109 5.22557 18.52 5.36996C18.5206 5.51605 18.463 5.65637 18.36 5.75996C17.709 6.35516 17.0882 6.98261 16.5 7.63996C16.3289 7.82826 16.0422 7.85432 15.84 7.69996C14.9161 7.01624 13.7888 6.66394 12.64 6.69996C9.68528 6.69996 7.29 9.09524 7.29 12.05C7.29 15.0047 9.68528 17.4 12.64 17.4C15.64 17.4 16.91 16.12 17.57 13.85H13C12.7239 13.85 12.5 13.6261 12.5 13.35V10.7C12.5 10.4238 12.7239 10.2 13 10.2H21C21.2302 10.1985 21.4244 10.3711 21.45 10.6C21.4871 10.9955 21.5038 11.3927 21.5 11.79Z" fill="white"/>
          </svg>
          Sign In with Google
        </button>
        <div className='signup-redirect'>
          <p>Don't have an account? <a href='/signup'><span className='login-link'>Sign Up</span></a></p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
