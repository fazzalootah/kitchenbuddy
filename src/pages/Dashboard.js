import React, { useState, useEffect } from 'react';
import { firestore, auth, signOut } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import PreferencesModal from './PreferencesModal';
import axios from "axios";
import axiosInstance from '../utils/axios';

const Dashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [isFirstLogin, setIsFirstLogin] = useState(false);
    const [mealSuggestion, setMealSuggestion] = useState('');
    const [protein, setProtein] = useState('');
    const [diet, setDiet] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [error, setError] = useState('');
   

    useEffect(() => {
        const checkFirstLogin = async (user) => {
            const userRef = doc(firestore, "users", user.uid, "data", "preferences");
            const docSnapshot = await getDoc(userRef);
            if (!docSnapshot.exists()) {
                setShowModal(true);
                setIsFirstLogin(true);
            }
        };

        const unsubscribe = auth.onAuthStateChanged(user => user && checkFirstLogin(user));
        return () => unsubscribe();
    }, []);
    const API_Key = process.env.REACT_APP_OPENAI_API_KEY
    const fetchMealSuggestion = async () => {
        // try {
        //     const requestBody = { protein, diet, cuisine };

        //     const response = await fetch('https://api.openai.com/v1/completions', {
        //         prompt: `Suggest a meal with ${protein}, that is ${diet}, and ${cuisine} cuisine.`,
        //         model: 'gpt-3.5-turbo'
        //     }, 
        //     {
        //         method: 'POST',
        //         headers: { 
        //             'Content-Type': 'application/json',
        //             ' Authorization': `Bearer ${API_Key}`
        //     },
        //         body: JSON.stringify(requestBody)
        //     });

        //     if (!response.ok) {
        //         const errorDetails = await response.json();
        //         throw new Error(errorDetails.error);
        //     }

        //     const data = await response.json();
        //     console.log(data);
        //     setMealSuggestion(data.meal);
        // } catch (err) {
        //     console.error("Error:", err);
        //     setError(`Error: ${err.message}`);
        // }
        const config = {
            headers: {
                Authorization: `Bearer ${API_Key}`
            }
        }
        try{
            // const requestBody = { protein, diet, cuisine };
            const messagesToSend = [
                { "role": "system", "content": "You are a helpful assistant." },
                { "role": "user", "content": `Suggest a meal with ${protein}, that is ${diet}, and ${cuisine} cuisine.` }
            ]; 
        const data = await axios.post("https://api.openai.com/v1/chat/completions",{
            model: `gpt-3.5-turbo`,
            messages: messagesToSend
            
        }, config);
        
        setMealSuggestion(data.data.choices[0].message.content);

        }catch(err){
            console.log(err);
        }
        
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            setError(error.message);
        }
    };


    return (
        <div>
            <div className="selection-container">
                <div className="header">
                    <h2>Make your selections</h2>
                    <p>Choose a protein, nutritional style, and cuisine to get started.</p>
                </div>

                <div className="option-group">
                    <label htmlFor="protein-select">Choose a protein:</label>
                    <select id="protein-select" value={protein} onChange={e => setProtein(e.target.value)}>
                        <option value="None selected">Select Protein</option>
                        <option value="Beef">Beef</option>
                        <option value="Chicken">Chicken</option>
                        <option value="Fish">Fish</option>
                        <option value="Pork">Pork</option>
                        <option value="Turkey">Turkey</option>
                        <option value="Plant">Plant</option>
                    </select>

                </div>

                <div className="option-group">
                    <label htmlFor="diet-select">Nutritional Style:</label>
                    <select id="diet-select" value={diet} onChange={e => setDiet(e.target.value)}>
                        <option value="None selected">Select Nutritional Style</option>
                        <option value="Healthy">Healthy</option>
                        <option value="Hearty">Hearty</option>
                        <option value="Low Carb">Low Carb</option>
                    </select>

                </div>

                <div className="option-group">
                    <label htmlFor="cuisine-select">Cuisine:</label>
                    <select id="cuisine-select" value={cuisine} onChange={e => setCuisine(e.target.value)}>
                        <option value="None selected">Select Cuisine</option>
                        <option value="Italian">Italian</option>
                        <option value="Mexican">Mexican</option>
                        <option value="Chinese">Chinese</option>
                        <option value="American">American</option>
                        <option value="Indian">Indian</option>
                    </select>

                </div>

                <div className="display-section">
                    <p><strong>Protein:</strong> {protein}</p>
                    <p><strong>Nutritional Style:</strong> {diet}</p>
                    <p><strong>Cuisine:</strong> {cuisine}</p>
                </div>

                <button onClick={fetchMealSuggestion} style={{ cursor: "pointer" }}>Get Meal Suggestion</button>
                <div>
                <p>Meal Suggestion: {mealSuggestion}</p>
            {error && <p>Error: {error}</p>}                
            </div>
                <button onClick={handleLogout}>Sign Out</button>
            </div>

            {showModal && <PreferencesModal close={() => setShowModal(false)} isFirstLogin={isFirstLogin} />}
        </div>
    );
}

export default Dashboard;
