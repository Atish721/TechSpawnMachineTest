import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ()=>{

    const navigate = useNavigate()
    
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const errorMessages={}

    const [formData,setFormData]=useState({
        Email:'',
        Password:'',
    })

    const handleInputChange = (e)=>{
        const {name,value} = e.target
     
        setFormData((prevData)=>({
            ...prevData,
            [name]:value
        }))
    }

    const  validateValues=(formData)=>
    {
        let forEmailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let errors = {};

        if(formData.Email == '')
        {
            errors.email = 'Email required'
           
        }
        else if (!formData.Email.match(forEmailRegEx)) {
            errors.email = 'Enter valid email'
        }
       
        if(formData.Password == '')
        {
            errors.password = 'Password required'
        }
       

       return errors;
    }

    const finishSubmit = async () => {
        try
        {          

            const response = await fetch(`https://atish-backend.byethost7.com/server/controller/authController`,{
                method:'POST',                             
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })


                if(response.ok)
                {
                    const apiResponse = await response.json()
                    if(apiResponse.success)
                    {
                        const data =apiResponse.data[0] 
                        localStorage.setItem('user',JSON.stringify(data))
                        localStorage.setItem('login',true)

                        navigate('/employee/list')
                    }
                    else
                    {
                        errorMessages.response=apiResponse.message
                        setErrors(errorMessages)
                    }
                }
                else
                {
                    throw new Error('Network response was not ok') 
                }
        }
        catch(error)
        {
            console.log(`Login error: ${error}`)
        }
      };

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setErrors(validateValues(formData));
        setSubmitting(true);  
    }

    useEffect(() => {

        let login = localStorage.getItem('login')
        if(login)
        {
            navigate('/employee/list')
        }

        let loginStatus = localStorage.getItem("loginStatus")
        if(loginStatus){
            localStorage.clear()
            window.location.reload()
        }

        if (Object.keys(errors).length === 0 && submitting) {
          finishSubmit();
        }
      }, [errors]);


    return (
        <>
            <div className='container m-3 p-3'>
                <div className='row'>
                    <div className='col-md-4 offset-md-5 col-md-auto'>
                        <h2>Log In</h2>
                        <form>
                            <div className='row mb-3'>
                                <label className='col-sm-2 col-form-label'>Email</label>
                                <div className="col-sm-10">
                                    <input type='email' name='Email' defaultValue={formData.Email} className='form-control' placeholder='Enter email' onChange={handleInputChange} />
                                    {errors.email ? (<p className="text text-warning mb-1"> {errors.email}</p>) : null}
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <label className='col-sm-2 col-form-label'>Password</label>
                                <div className="col-sm-10">
                                    <input type='password'name='Password' defaultValue={formData.Password} className='form-control' placeholder='Enter password' onChange={handleInputChange}/>
                                    {errors.password ? (<p className="text text-warning mb-1"> {errors.password}</p>) : null}
                                </div>
                            </div>
                            <div className="d-grid col-12 mx-auto">
                                <button type='submit' className='btn btn-success' onClick={handleSubmit}>Login</button>
                            </div>
                            {errors.response ? (<p className="text text-warning mb-1"> {errors.response}</p>) : null}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login