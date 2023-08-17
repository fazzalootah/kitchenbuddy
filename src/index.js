import React from "react";
import './index.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing"
import About from "./components/About"
import Login from "./components/Login"
import SignupStep1 from "./components/SignupStep1"
import Nav from "./components/NavAndFooter"
import Contact from './components/Contact'
import Faqs from "./components/Faqs";
import SignupStep2 from "./components/SignupStep2";

export default function App() {  
    return (
        <>

    <BrowserRouter>
     <Routes>
        <Route path="/" element={<Nav />} >
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignupStep1 />} />
            <Route path ="/step-2" element={<SignupStep2 />} />
            <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
     </Routes>
     </BrowserRouter>
        </>

    );
    }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);