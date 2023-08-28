import React, { useState } from 'react';
import './css/modal.css'; // Make sure you have this file
import { firestore } from '../firebase'; // Make sure you have this file
import { setDoc, doc } from "firebase/firestore";
import { useUserAuth } from '../UserAuthContext'; // Make sure you have this file

const PreferencesModal = ({ close }) => {
  const { user } = useUserAuth();
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: '',
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
    eatingOut: ''
  });

  const goForward = (e) => {
    e.preventDefault();
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };
  
  const goBack = (e) => {
    e.preventDefault();
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();  // Prevent the default behavior of form submission
    const userUid = user ? user.uid : null;
    if (userUid) {
      try {
        const docRef = doc(firestore, `users/${userUid}/data/preferences`);
        await setDoc(docRef, { ...formData });
        console.log("Document written with ID:", docRef.id);
        close();
      } catch (error) {
        console.error("Error adding document:", error);
      }
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
        <form onSubmit={handleSubmit}>
                        {step === 1 && (
                  <div>
                    <h4>Step 1: Basic Information</h4>
                    <label>Age: 
                      <input type="number" name="age" value={formData.age} onChange={handleChange} />
                    </label>
                    <label>Weight (KG):
                      <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
                    </label>
                    <label>Height (CM):
                      <input type="number" name="height" value={formData.height} onChange={handleChange} />
                    </label>
                    <label>Gender:
                      <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </label>
                    <label>Activity Level:
                      <select name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Sedentary">Sedentary</option>
                        <option value="Low">Low 1-2 Hours</option>
                        <option value="Moderate">Moderate 3-4 Hours</option>
                        <option value="High">High 5-7 Hours</option>
                      </select>
                    </label>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h4>Step 2: Health & Goals</h4>
                    <label>Primary Goal:
                      <input type="text" className='pref' name="primaryGoal" value={formData.primaryGoal} onChange={handleChange} />
                    </label>
                    <label>Health Conditions:
                      <input type="text" className='pref' name="healthConditions" value={formData.healthConditions} onChange={handleChange} />
                    </label>
                    <label>Dietary Preferences:
                      <select name="dietaryPreferences" value={formData.dietaryPreferences} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Halal">Halal</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Kosher">Kosher</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Gluten Free">Gluten Free</option>
                        <option value="None">None</option>
                      </select>
                    </label>
                    <label>Allergies:
                      <input type="text" className='pref' name="allergies" value={formData.allergies} onChange={handleChange} />
                    </label>
                  </div>
                )}

                {step === 3 && (
                  <div>

                    <h4>Step 3: Meal Preferences</h4>
                    <label>Preferred Cuisine:
                      <input type="text" className='pref' name="preferredCuisine" value={formData.preferredCuisine} onChange={handleChange} />
                    </label>
                    <label>Meals Per Day:
                      <input type="number" name="mealsPerDay" value={formData.mealsPerDay} onChange={handleChange} />
                    </label>
                    <label>Snacks Per Day:
                      <input type="number" name="snacksPerDay" value={formData.snacksPerDay} onChange={handleChange} />
                    </label>
                    <label>Cooking Skill Level:
                      <select name="cookingSkillLevel" value={formData.cookingSkillLevel} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </label>
                    <label>Cooking Time Preference:
                      <input type="text" className='pref' name="cookingTimePreference" value={formData.cookingTimePreference} onChange={handleChange} />
                    </label>
                    <label>Frequency of Eating Out:
                      <input type="text" className='pref' name="eatingOut" value={formData.eatingOut} onChange={handleChange} />
                    </label>
                  </div>
                )}
          <div className="modalFooter">
            <button onClick={goBack} disabled={step === 1}>Back</button>
            {step === totalSteps ? (
              <button type='submit'>Submit</button>
            ) : (
              <button onClick={goForward}>Next</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreferencesModal;
