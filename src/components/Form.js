import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const countryCityMap = {
    India: ['Surat', 'Mumbai', 'Bangalore' ,'Navsari'],
    US: ['california', 'Los Angeles', 'Chicago'],
    UK: ['London', 'Manchester', 'Liverpool'],
  };
const Form = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        phoneCountryCode: '',
        phoneNumber: '',
        country: '',
        city: '',
        panNo: '',
        aadharNo: '',
      });
      const [showPassword, setShowPassword] = useState(false);
      const [cities, setCities] = useState([]);
      const [formError , setFormError]=useState({});
      const [isFormValid, setIsFormValid] = useState(false);
      const [isSubmitted, setIsSubmitted] = useState(false);
      const navigate = useNavigate();

      useEffect(() => {
        if (isSubmitted) {
          ValidateForm()
        }
      }, [formData, isSubmitted]);
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
        if (name === 'country') {
            setCities(countryCityMap[value] || []);
            setFormData((prevFormData) => ({
              ...prevFormData,
              city: '',
            }));
          }
      };
    
      const handleShowPasswordChange = () => {
        setShowPassword(!showPassword);
      };
    
      const ValidateForm=()=>{
        let err={}
        let isValid = true;
        if(formData.firstName===''){
            err.firstName = 'First Name required!';
            isValid = false;
        }
        if(formData.lastName===''){
            err.lastName= 'Last Name required!';
            isValid = false;
        }
        if(formData.username===''){
            err.username= 'UserName required!';
            isValid = false;
        }
        if(formData.email===''){
            err.email= 'Email required!';
            isValid = false;
        }else{
            let regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
            if(!regex.test(formData.email)){
                err.email='Email not Valid!';
                isValid = false;
            }
        }
        if(formData.password===''){
            err.password= 'Password required!';
            isValid = false;
        }
        else if(formData.password.length<6){
            err.password="Password should greater than 6 character";
            isValid = false;
        }
        if(formData.phoneCountryCode===''){
            err.phoneCountryCode= 'Country Code required!';
            isValid = false;
        }else if (!/^\d+$/.test(formData.phoneCountryCode)) {
            err.phoneCountryCode = 'Country Code should only contain digits';
            isValid = false;
          }
        if(formData.phoneNumber===''){
            err.phoneNumber= 'Phone Number required!';
            isValid = false;
        }else if (!/^\d+$/.test(formData.phoneNumber)) {
      err.phoneNumber = 'Phone Number should only contain digits';
      isValid = false;
    } else if (formData.phoneNumber.length !== 10) {
        err.phoneNumber = 'Phone Number should be exactly 10 digits';
        isValid = false;
      }
        if(formData.country===''){
            err.country= 'Country required!';
            isValid = false;
        }
        if(formData.city===''){
            err.city= 'City required!';
            isValid = false;
        }
        if(formData.panNo===''){
            err.panNo= 'Pan No required!';
            isValid = false;
        }else{
            let regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/
            if(!regex.test(formData.panNo)){
                err.panNo='Pan Number is  not Valid!';
                isValid = false;
            }
        }
        if(formData.aadharNo===''){
            err.aadharNo= 'Aadhar No required!';
            isValid = false;
        }
        else{
            let regex = /^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$/
            if(!regex.test(formData.aadharNo)){
                err.aadharNo='Aadhar number is  not Valid!';
                isValid = false;
            }
        }
        setFormError({...err})
        setIsFormValid(isValid);
        return Object.keys(err).length<1;
      }
      const handleSubmit = (event) => {
        event.preventDefault();
        setIsSubmitted(true);
        let isValid=ValidateForm()
        if(isValid){
            navigate('/details', { state: { formData } });
        }
      };
    
      return (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <h2>Registration Form</h2>
            <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <span className='non-valid'>{formError.firstName}</span>
            </div>
            <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
             <span className='non-valid'>{formError.lastName}</span>
            </div>
            <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
             <span className='non-valid'>{formError.username}</span>
            </div>
            <div>
            <label htmlFor="email">E-mail:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <span className='non-valid'>{formError.email}</span>
            </div>
            <div>
            <label htmlFor="password">Password:</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <span className='non-valid'>{formError.password}</span>
            </div>
            <div className="show-password">
              <input
                type="checkbox"
                id="show-password"
                checked={showPassword}
                onChange={handleShowPasswordChange}
              />
              <label htmlFor="show-password">Show Password</label>
            </div>
        <div>
        <label htmlFor="Phone Number">Phone Number:</label>
        <div className="phone-input">
          <input
            type="text"
            id="phoneCountryCode"
            name="phoneCountryCode"
            placeholder="Country Code"
            value={formData.phoneCountryCode}
            onChange={handleChange}
          />
          
          <span className="hyphen">-</span>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          </div>
          <span className='non-valid'>{formError.phoneCountryCode}</span>
           <span className='non-valid'>{formError.phoneNumber}</span>
        </div>
            <div>
            <label htmlFor="country">Country:</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Select your country</option>
              <option value="India">India</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
            </select>
            <span className='non-valid'>{formError.country}</span>
            </div>
            <div>
            <label htmlFor="city">City:</label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            >
              <option value="">Select your city</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
            </select>
            <span className='non-valid'>{formError.city}</span>
            </div>
            <div>
            <label htmlFor="panNo">Pan No.:</label>
            <input
              type="text"
              id="panNo"
              name="panNo"
              value={formData.panNo}
              onChange={handleChange}
            />
             <span className='non-valid'>{formError.panNo}</span>
            </div>
            <div>
            <label htmlFor="aadharNo">Aadhar No.:</label>
            <input
              type="text"
              id="aadharNo"
              name="aadharNo"
              value={formData.aadharNo}
              onChange={handleChange}
            />
             <span className='non-valid'>{formError.aadharNo}</span>
            </div>
            <button type="submit" disabled={!isFormValid && isSubmitted }>Register</button>
          </form>
        </div>
      );
    };
    
    export default Form;