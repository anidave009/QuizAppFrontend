import React, { useState } from 'react';
import useLoginForm from '../services/LoginFormService';
import './../LoginForm.css';

const LoginForm = ({ onFormComplete }) => {
    //formData ka initial state
    const {validateUser}=useLoginForm();
    const [errorDisplay,setErrorDisplay]=useState(false);
    const [confirmationDisplay,setConfirmationDisplay]=useState(false);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        name: '',
        password: '',
        age: '',
        experience: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;//this is destructuring //const name=e.target.name
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));                                                                                                  
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));  
        }
    };

    const validate = async() => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }
        
        if (!formData.age) {
            newErrors.age = 'Age is required';
        } else if (formData.age < 8 || formData.age > 80) {
            newErrors.age = 'Age must be between 8 and 80';
        }
        
        if (!formData.experience) {
            newErrors.experience = 'Please select your experience level';
        }
    
        setErrors(newErrors);
        
        if (Object.keys(newErrors).length > 0) {
            setErrorDisplay(false);  // Clear authentication error
            return;  // Stop here if form has errors
        }
    
        console.log("calling validateUser to verify username and password");
    
        const isValidUser = await validateUser(formData.name, formData.password);
    
        if(!isValidUser){
            console.log("Authentication failed");
            setErrorDisplay(true);
            setConfirmationDisplay(false);  // Hide success message
            return;
        }
        
        console.log("User authenticated successfully");
        localStorage.setItem("userName",formData.name);
        setErrorDisplay(false);
        setConfirmationDisplay(true);
        console.log('Form Data:', formData);
        
        setTimeout(() => {
            onFormComplete && onFormComplete();
        }, 1000);
    };
    return (
        <div className='div-header'>
            <div className='div-section-detail-form'>
                <h2 className="form-title">! ! Please fill out this form before taking the quiz ! !</h2>
                
                <div className="form-container">
                    <div className="input-group">
                        <label htmlFor="name">User Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your Password"
                            className={errors.password ? 'error' : ''}
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            placeholder="Enter your age"
                            min="1"
                            max="120"
                            className={errors.age ? 'error' : ''}
                        />
                        {errors.age && <span className="error-message">{errors.age}</span>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="experience">Experience Level</label>
                        <select
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            className={errors.experience ? 'error' : ''}
                        >
                            <option value="">Select your experience level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
                        </select>
                        {errors.experience && <span className="error-message">{errors.experience}</span>}
                    </div>
                </div>

                {errorDisplay && (
    <div className='error-container'>
        <span className='error-text'>Invalid username or password</span>
    </div>
)}

{confirmationDisplay && (
    <div className='success-container'>
        <span className='success-text'>User Verified</span>
    </div>
)}
    
     <button onClick={validate} className="start-quiz-btn">
            Start Quiz
                </button>
            </div>
        </div>
    );
};

export default LoginForm;