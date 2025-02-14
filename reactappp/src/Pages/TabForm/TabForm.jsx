import React, { useState } from 'react';
import './TabForm.css';

const TabForm = () => {
  const initialFormState = {
    // Profile tab
    name: '',
    email: '',
    age: '',
    
    // Interests tab
    hobbies: [],
    occupation: '',
    
    // Settings tab
    notifications: false,
    theme: 'light'
  };

  // Form state
  const [formData, setFormData] = useState(initialFormState);
  const [currentTab, setCurrentTab] = useState('profile');
  const [errors, setErrors] = useState({});

  const tabs = ['profile', 'interests', 'settings'];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle checkbox changes for hobbies
  const handleHobbyChange = (hobby) => {
    setFormData(prev => ({
      ...prev,
      hobbies: prev.hobbies.includes(hobby)
        ? prev.hobbies.filter(h => h !== hobby)
        : [...prev.hobbies, hobby]
    }));
  };

  // Validate current tab

//   const validateTab = () => {
//     const newErrors = {};

//     if (currentTab === 'profile') {
//       if (!formData.name) newErrors.name = 'Name is required';
//       if (!formData.age) {
//         newErrors.age = 'Age is required';
//       } else if (!/^\d+$/.test(formData.age)) {
//         newErrors.age = 'Age must be a number';
//       }
//       if (!formData.email) {
//         newErrors.email = 'Email is required';
//       } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//         newErrors.email = 'Invalid email format';
//       }
//     }

//     if (currentTab === 'interests') {
//       if (formData.hobbies.length === 0) newErrors.hobbies = 'Select at least one hobby';
//       if (!formData.occupation) newErrors.occupation = 'Occupation is required';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

  // Handle tab navigation
  const handleNavigation = (direction) => {
    //if (validateTab()) {
      const currentIndex = tabs.indexOf(currentTab);
      const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      setCurrentTab(tabs[newIndex]);
    //}
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  //  if (validateTab()) {
      console.log('Form submitted:', formData);
      // Reset form after submission
      setFormData(initialFormState);
      setCurrentTab('profile');
      setErrors({});
      alert('Form submitted successfully!');
  //  }
  };

  return (
    <div className="form-container">
      <div className="tab-buttons">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab-button ${currentTab === tab ? 'active' : ''}`}
            onClick={() => setCurrentTab(tab)}
            //onClick={() => validateTab() && setCurrentTab(tab)}

          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {currentTab === 'profile' && (
          <div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label>Age</label>
              <input
                type="text"
                name="age"
                className="form-input"
                value={formData.age}
                onChange={handleChange}
              />
              {errors.age && <div className="error-message">{errors.age}</div>}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
          </div>
        )}

        {currentTab === 'interests' && (
          <div>
            <div className="form-group">
              <label>Hobbies</label>
              <div className="checkbox-group">
                {['Reading', 'Gaming', 'Cooking', 'Sports'].map((hobby) => (
                  <label key={hobby}>
                    <input
                      type="checkbox"
                      checked={formData.hobbies.includes(hobby)}
                      onChange={() => handleHobbyChange(hobby)}
                    /> {hobby}
                  </label>
                ))}
              </div>
              {errors.hobbies && <div className="error-message">{errors.hobbies}</div>}
            </div>

            <div className="form-group">
              <label>Occupation</label>
              <select
                name="occupation"
                className="form-input"
                value={formData.occupation}
                onChange={handleChange}
              >
                <option value="">Select occupation</option>
                <option value="student">Student</option>
                <option value="employed">Employed</option>
                <option value="other">Other</option>
              </select>
              {errors.occupation && <div className="error-message">{errors.occupation}</div>}
            </div>
          </div>
        )}

        {currentTab === 'settings' && (
          <div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleChange}
                /> Enable Notifications
              </label>
            </div>

            <div className="form-group">
              <label>Theme</label>
              <select
                name="theme"
                className="form-input"
                value={formData.theme}
                onChange={handleChange}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        )}

        <div className="navigation-buttons">
          <button
            type="button"
            className="nav-button"
            onClick={() => handleNavigation('prev')}
            disabled={currentTab === tabs[0]}
          >
            Previous
          </button>
          <button
            type="button"
            className="nav-button"
            onClick={() => handleNavigation('next')}
            disabled={currentTab === tabs[tabs.length - 1]}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default TabForm;