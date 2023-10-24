import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { firestore, auth, signOut } from '../firebase';
import { addDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import PreferencesModal from './PreferencesModal';
import { useUserAuth } from '../UserAuthContext';
import axios from 'axios';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './css/dashboard.css'

const localizer = momentLocalizer(moment);



const CustomEvent = ({event}) => {

    const meals = Object.keys(event.meal);


    return (
        <div>
            {
                meals.map((even, index)=>(
                    <a
                    key={index}
                    href={`#meal-link-for`} // Adjust the link as per your needs
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'block', marginBottom: '5px' }} // Adding some spacing between links
                >
                    {even + ":" + event.meal[even]}
                </a>
                ))
            }

        </div>
    );
};

const Dashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [isFirstLogin, setIsFirstLogin] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mealSuggestion, setMealSuggestion] = useState([] || null);
    const [events, setEvents] = useState([]);
    const { user } = useUserAuth();
    const userUid = user ? user.uid : null;
    const API_Key = process.env.REACT_APP_OPENAI_API_KEY;
    const [selectedDate, setSelectedDate] = useState(new Date()); // State to track the currently viewed day

const saveMealToFirebase = async (structuredMealPlan) => {
    try {
        // Assuming you have a collection named "mealPlans" in Firestore
        // Generate a new document reference in the "mealPlans" collection
        const mealPlanRef = doc(firestore, `users/${userUid}/meal/weeklyMeals`);

        // Set data to the new document
        await setDoc(mealPlanRef, structuredMealPlan);

        return { status: 'success', data: mealPlanRef.id }; // Return the ID of the new meal plan
    } catch (error) {
        return { status: 'error', message: error.message };
    }
};
    
    useEffect(() => {
        if (user) {
            const fetchMealsFromFirebase = async () => {
                const userUid = user.uid;
                const docRef = doc(firestore, `users/${userUid}/meal/weeklyMeals`);
                
                try {
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        // Assuming your data structure is an object with days as keys
                        const mealData = docSnap.data();

                        const formattedMeals = Object.keys(mealData).map((key, i) => {
                            let dailyMeals = mealData[key];
                            const start = moment().add(i, 'days').startOf('day').toDate();
                            const end = moment().add(i, 'days').endOf('day').toDate();
                            return {
                                meal: dailyMeals.meal,
                                start,
                                end
                            };
                        });
                        setEvents(formattedMeals);
                    } else {
                        console.log('No meals data found!');
                    }
                } catch (error) {
                    console.error('Error fetching meals:', error);
                }
            };

            fetchMealsFromFirebase();
        }
    }, [user]);

    useEffect(() => {
        console.log("User Data:", userData);
        if (user) {
            // console.log(user);
            const userUid = user.uid;
            const docRef = doc(firestore, `users/${userUid}/data/preferences`);
            // this is the function to fetch user data
            const fetchUserData = async () => {
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
    }, [user])

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

    const fetchMealSuggestion = async (env) => {
        env.preventDefault();
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
                    - Snackss Per Day: ${userData[0].SnackssPerDay}
                    - Weight: ${userData[0].weight} KG
                    
                    Generate a weekly meal plan in a JSON format. The meal plan should include breakfast, lunch, dinner and a single Snacks for each day of the week. Make sure to include a variety of cuisines and ensure that the meals are balanced and nutritious. \n\n---\nMonday:\n  Breakfast:\n  Lunch:\n  Dinner:\n Snacks:\n\nTuesday:\n  Breakfast:\n  Lunch:\n  Dinner:\n Snacks:\n\nWednesday:\n  Breakfast:\n  Lunch:\n  Dinner:\n Snacks:\n\nThursday:\n  Breakfast:\n  Lunch:\n  Dinner:\n Snacks:\n\nFriday:\n  Breakfast:\n  Lunch:\n  Dinner:\n Snackss:\n\nSaturday:\n  Breakfast:\n  Lunch:\n  Dinner:\n Snacks:\n\nSunday:\n  Breakfast:\n  Lunch:\n  Dinner:\n
                    
                    `
                },
            ];
            const data = await axios.post(
                `https://api.openai.com/v1/chat/completions`,
                {
                    model: `gpt-3.5-turbo`,
                    messages: messagesToSend,
                    max_tokens: 3000,
                },
                config
            );
            const rawMealPlan = data.data.choices[0].message.content;
            console.log(rawMealPlan);
            setMealSuggestion(rawMealPlan);
            setLoading(false);
            const formattedMeal = await formatMealPlanOutput(rawMealPlan);
            saveMealToFirebase(formattedMeal);

            } catch (err) {
            console.log(err);
            setError(err.message);
            setLoading(false);
        }
    };
    const formatMealPlanOutput = async(weeklyMealPlan)=>{
        let formatMeal = [];
        let firebaseMeal;
        try{
                if (typeof weeklyMealPlan === 'string') {
                    weeklyMealPlan = JSON.parse(weeklyMealPlan);
                }
                if (typeof weeklyMealPlan !== 'object' || weeklyMealPlan === null) {
                    throw new Error('Invalid input format');
                }
                formatMeal = Object.keys(weeklyMealPlan).map((key, i) => {
                    let weekly = weeklyMealPlan[key];
                    const start =  moment().add(i, 'days').startOf('day').toDate();
                    const end =  moment().add(i, 'days').endOf('day').toDate();
                        return {
                            meal: weekly,
                            start,
                            end
                        }
                });
                 setEvents(formatMeal);
                console.log(formatMeal);
                let userUid = user ? user.uid : null;
                if(userUid){
                    const docRef = doc(firestore, `users/${userUid}/meal/weeklyMeals`);
                    let checkMealExist = await getDoc(docRef);
                    if(checkMealExist.exists()){
                        firebaseMeal = await updateDoc(docRef, {...formatMeal});
                        console.log("meal updated");
                        
                    }
                    console.log("added to firebase");
                    
                    return firebaseMeal = await setDoc(docRef, {...formatMeal});
                    } 
            }catch(err){
                console.log("Error occured", err.message);
            }
           
    }
    const getMealFirebase = async()=>{
        if (user) {
            // console.log(user);
            const userUid = user.uid;
            const docRef = doc(firestore, `users/${userUid}/meal/weeklyMeals`);
            // this is the function to fetch user data
                try {
                    
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()){
                        let data = [];
                        let oop = []
                        data.push(docSnap.data());
                        data.map(ww=>{
                            // oop.push((Object.keys(ww).map(ee=> Object.keys(ww[ee]["meal"]))));
                            for(let key in ww){
                                if(ww[key].meal){
                                    oop.push({
                                        meal: ww[key].meal
                                    })
                                    return oop;
                                }
                                 setEvents(oop);
                            }
                            console.log(oop);
                            console.log(events);
                        })
                    } else {
                        console.log('No such document!');
                    }
                } catch (error) {
                    console.log('Error:', error.message);
                }
        }
    }
    console.log(events);
    useEffect(()=>{
         getMealFirebase();
    });
   

    // useEffect(() => {
    //     formatMealPlanOutput(mealSuggestion);
    //     if (mealSuggestion && mealSuggestion.length) {
    //         const formattedPlan = formatMealPlanOutput(mealSuggestion);
    //         console.log(formattedPlan);
    //         const newEvents = formattedPlan.map((day, index) => {
    //             day.start =  moment().add(index, 'days').startOf('day').toDate();
    //             day.end =  moment().add(index, 'days').endOf('day').toDate();
    //             // title: day  // use just the day string
    //         });
    //         console.log(newEvents);
    //         setEvents(newEvents);
    //     }
    // }, [loading]);

    // const mealOutput = [ /*... your output array ...*/];
    // const formattedMealPlan = formatMealPlanOutput(mealSuggestion);

    return (
        <div className='pleft'>
            {showModal && <PreferencesModal close={() => setShowModal(false)} isFirstLogin={isFirstLogin} />}
            <h3>Welcome to Meal Planner</h3>
            <div className='nav-top-dash'>
            <button className="dashboardbtn" type="submit" onClick={fetchMealSuggestion} disabled={loading || !userData} style={{ cursor: "pointer" }}>
                Get Meal Suggestion
            </button>
            <button className="dashboardbtn" onClick={handleLogout} style={{ cursor: "pointer" }}>Sign Out</button>
            </div>

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
                popup
                timeslotStyle={(date, isGutter) => {
                    if (isGutter) {
                        return { display: 'none' };
                    }
                    return {};
                }} // This captures the current date in focus

                components={{
                    event: CustomEvent
                }}

            />

        </div>
    );
};

export default Dashboard;