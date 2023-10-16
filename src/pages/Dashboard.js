import React, { useState, useEffect, useCallback } from 'react';
import { firestore, auth, signOut } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import PreferencesModal from './PreferencesModal';
import { useUserAuth } from '../UserAuthContext';
import axios from 'axios';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './css/dashboard.css'

const localizer = momentLocalizer(moment);

const CustomEvent = ({ event }) => {
    // Split the meals string into an array
    const meals = event.title.split(','); // Assuming meals are comma-separated

    return (
        <div>
            {meals.map((meal, index) => (
                <a 
                    key={index}
                    href={`#meal-link-for-${meal.trim()}`} // Adjust the link as per your needs
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ display: 'block', marginBottom: '5px' }} // Adding some spacing between links
                >
                    {meal.trim()}
                </a>
            ))}
        </div>
    );
};



const Dashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [isFirstLogin, setIsFirstLogin] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mealSuggestion, setMealSuggestion] = useState([]);
    const [events, setEvents] = useState([]);
    const { user } = useUserAuth();
    const userUid = user ? user.uid : null;
    const API_Key = process.env.REACT_APP_OPENAI_API_KEY;
    const [selectedDate, setSelectedDate] = useState(new Date()); // State to track the currently viewed day


    useEffect(()=>{
        console.log("User Data:", userData);
        if (user) {
            // console.log(user);
          const userUid = user.uid;
          const docRef = doc(firestore, `users/${userUid}/data/preferences`);
            // this is the function to fetch user data
            const fetchUserData = async()=>{
                try {
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                      setUserData([docSnap.data()]);
                      console.log([docSnap.data()]);
                    } else {
                      console.log('No such document!');
                    }
                  } catch (error) {
                    console.log('Error getting document:', error);
                  }
            }
            fetchUserData();
        }
    }, [])
   
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            setError(error.message);
        }
    };
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
   

    const fetchMealSuggestion = async () => {
        if (!userData || userData.length === 0) {
            console.error("User data is not loaded yet.");
            return;
        }
    
        console.log("Button Clicked");
        setLoading(true);

        const config = {
            headers: {
                Authorization: `Bearer ${API_Key}`,
            },
        };

        try {
            const messagesToSend = [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: `
                    Given the following user profile:
                    - Activity Level: ${userData[0].activityLevel}
                    - Age: ${userData[0].age} years old
                    - Allergies: ${userData[0].allergies}
                    - Cooking Skill: ${userData[0].cookingSkillLevel}
                    - Cooking Time Preference: ${userData[0].cookingTimePreferences}
                    - Dietary Preference: ${userData[0].dietaryPreferences}
                    - Frequency of Eating Out: ${userData[0].eatingOut}
                    - Gender: ${userData[0].gender}
                    - Health Conditions: ${userData[0].healthConditions}
                    - Height: ${userData[0].height}
                    - Duration of Meal Plan: ${userData[0].lengthOfMealPlan} days
                    - Meals Per Day Preference: ${userData[0].mealsPerDay}
                    - Preferred Cuisine: ${userData[0].preferredCuisine}
                    - Primary Fitness Goal: ${userData[0].primaryGoal}
                    - Snacks Per Day: ${userData[0].snacksPerDay}
                    - Weight: ${userData[0].weight} KG
                    
                    Suggest a meal plan based on the above profile.
                    `
                },
            ];
            const data = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: `gpt-3.5-turbo`,
                    messages: messagesToSend,
                    max_tokens: 3000,
                },
                config
            );
            const rawMealPlan = data.data.choices[0].message.content;
            const mealsByDay = rawMealPlan.split('\n'); // Adjust if your format differs
            console.log(mealsByDay);
            setMealSuggestion(mealsByDay);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setError(err.message);
            setLoading(false);
        }
    };
    const formatMealPlanOutput = (output) => {
        const mealPlan = [];
        let currentDayMeals = []; // An array to store meals for a day
    
        output.forEach((line, index) => {
            if (line.includes("Day")) {
                if (currentDayMeals.length) {
                    mealPlan.push(currentDayMeals.join('\n')); // Join meals with a newline and add to mealPlan
                    currentDayMeals = [];
                }
            } else if (line.includes("Breakfast") || line.includes("Lunch") || line.includes("Dinner")) {
                currentDayMeals.push(line);
            } 
        });
    
        if (currentDayMeals.length) {
            mealPlan.push(currentDayMeals.join('\n'));
        }
    
        return mealPlan;
    };
    
    useEffect(() => {
        if (mealSuggestion && mealSuggestion.length) {
            const formattedPlan = formatMealPlanOutput(mealSuggestion);
            const newEvents = formattedPlan.map((day, index) => ({
                start: moment().add(index, 'days').startOf('day').toDate(),
                end: moment().add(index, 'days').endOf('day').toDate(),
                title: day  // use just the day string
            }));
    
            setEvents(newEvents);
        }
    }, [mealSuggestion]);
    
    const mealOutput = [ /*... your output array ...*/ ];
const formattedMealPlan = formatMealPlanOutput(mealSuggestion);

    return (
        <div>
            {showModal && <PreferencesModal close={() => setShowModal(false)} isFirstLogin={isFirstLogin} />}
            <h1>Welcome to Meal Planner</h1>
            <button onClick={fetchMealSuggestion} disabled={loading || !userData} style={{ cursor: "pointer" }}>
                Get Meal Suggestion
            </button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <Calendar
                localizer={localizer}
                events={events}
                style={{ height: 400 }}
                startAccessor="start"
                endAccessor="end"
                views={Views.WEEK} // This restricts the view to just 'day'
                defaultView={Views.WEEK} // This sets the default view to 'day'
                onNavigate={(date) => setSelectedDate(date)} 
                timeslots={2}
                showMultiDayTimes
                selectable
                timeslotStyle={(date, isGutter) => {
                  if (isGutter) {
                    return { display: 'none' };
                  }
                  return {};
                }} // This captures the current date in focus
                
                components={{
                    event: CustomEvent,
                }}
    
            />
                    <button onClick={handleLogout} style={{ cursor: "pointer" }}>Sign Out</button>

        </div>
    );
};

export default Dashboard;
