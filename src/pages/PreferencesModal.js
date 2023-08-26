import React, { useState } from 'react';
import './css/modal.css';
import { firestore } from '../firebase';
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useUserAuth } from '../UserAuthContext';

const PreferencesModal = ({ close }) => {
  const { user } = useUserAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    weight: '',
    height: '',
    activityLevel: '',
    dietaryPreferences: '',
    allergies: '',
    preferredCuisine: '',
    primaryGoal: '',
    healthConditions: '',
    lengthOfMealPlan: '',
    mealsPerDay: '',
    snacksPerDay: '',
    cookingSkillLevel: '',
    cookingTimePreference: '',
    eatingOut: '',
  });

  const totalSteps = 3;

  const goForward = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async () => {
    const userUid = user ? user.uid : null;  // Extract the UID from user object
    if (userUid) {  // Proceed only if UID is available
      try {
        const docRef = doc(firestore, `users/${userUid}/data/preferences`);
        await setDoc(docRef, { ...formData });  // Here, formData contains the data to be saved
        console.log("Document written with ID:", docRef.id);
        close();
      } catch (e) {
        console.error("Error adding document:", e);
      }
    } else {
      console.error("User UID not available");
    }
  };


  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <div className="modalHeader">
          <div className="progressBar">
            <div className="progressFill" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
          </div>
        </div>
        <form>
          {step === 1 && (
            <div>
              <h4>Step 1: Basic Information</h4>
              <label>
                Age: <input type="number" name="age" value={formData.age} onChange={handleChange} />
              </label>
              <label>
                Gender:
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option>Select</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </label>
              <label>
                Current Weight (KG): <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
              </label>
              <label>
                Height (M): <input type="number" name="height" value={formData.height} onChange={handleChange} />
              </label>
              <label>
                Activity Level:
                <select name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
                  <option>Select</option>
                  <option>Sedentary</option>
                  <option>Low 1-2 Hours</option>
                  <option>Moderate 3-4 Hours</option>
                  <option>High 5-7 Hours</option>
                </select>
              </label>
            </div>
          )}

          {step === 2 && (
            <div>
              <h4>Step 2: Preferences</h4>
              <label>
                Dietary Preferences:
                <select name="dietaryPreferences" value={formData.dietaryPreferences} onChange={handleChange}>
                  <option>Select</option>
                  <option>Halal</option>
                  <option>Vegetarian</option>
                  <option>Kosher</option>
                  <option>Vegan</option>
                  <option>Gluten Free</option>
                  <option>None</option>
                </select>
              </label>
              <label>
                Allergies: <input type="text" className='pref' name="allergies" value={formData.allergies} onChange={handleChange} />
              </label>
              <label>
                Preferred Cuisine: <input type="text" className='pref' name="preferredCuisine" value={formData.preferredCuisine} onChange={handleChange} />
              </label>
              <label>
                Primary Goal: <input type="text" className='pref' name="primaryGoal" value={formData.primaryGoal} onChange={handleChange} />
              </label>
              <label>
                Health Conditions: <input type="text" className='pref' name="healthConditions" value={formData.healthConditions} onChange={handleChange} />
              </label>
            </div>
          )}

          {step === 3 && (
            <div>
              <h4>Final Step: Confirm Preferences</h4>
              <label>
                Length of Meal Plan (Days): <input type="number" name="lengthOfMealPlan" value={formData.lengthOfMealPlan} onChange={handleChange} />
              </label>
              <label>
                Meals Per Day: <input type="number" name="mealsPerDay" value={formData.mealsPerDay} onChange={handleChange} />
              </label>
              <label>
                Snacks Per Day: <input type="number" name="snacksPerDay" value={formData.snacksPerDay} onChange={handleChange} />
              </label>
              <label>
                Cooking Skill Level:
                <select name="cookingSkillLevel" value={formData.cookingSkillLevel} onChange={handleChange}>
                  <option>Select</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Expert</option>
                </select>
              </label>
              <label>
                Cooking Time Preference: <input type="text" className='pref' name="cookingTimePreference" value={formData.cookingTimePreference} onChange={handleChange} />
              </label>
              <label>
                Frequency of Eating Out: <input type="text" className='pref' name="eatingOut" value={formData.eatingOut} onChange={handleChange} />
              </label>
            </div>
          )}
        </form>
        <div className="modalFooter">
          <button onClick={goBack} disabled={step === 1}>Back</button>
          {step === totalSteps ? (
            <button onClick={handleSubmit}>Submit</button>
          ) : (
            <button onClick={goForward}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreferencesModal;
