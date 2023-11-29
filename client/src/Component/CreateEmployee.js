import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const CreateEmployee = ()=>{

    const navigate = useNavigate()
    
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const errorMessages={}

    const [formData,setFormData]=useState({
        Name:'',
        Mobile:'',
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

        let forNameRegEx = /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/
        let forMobileRegEx = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        let errors = {};

        if(formData.Name == '')
        {
            errors.name = 'Name required'
           
        }
        else if (!formData.Name.match(forNameRegEx)) {
            errors.name = 'Enter valid name'
       }
       
        if(formData.Mobile == '')
        {
            errors.mobile = 'Mobile no. required'
        }
        else if (forMobileRegEx.test(formData.Mobile)==false) {
            errors.mobile = 'Enter valid mobile'
       }

       return errors;
    }

    const finishSubmit = async () => {
        try
        {          
                const user = localStorage.getItem('user');
                const parseData = JSON.parse(user)
                
                const response = await fetch(` https://tech-spawn-machine-test-backend.vercel.app/controller/employeeController`,{
                    method:'POST',                             
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': parseData?.token,
                    },
                    body: JSON.stringify(formData)
                })


                if(response.ok)
                {
                    const apiResponse = await response.json()
                    if(apiResponse.success)
                    {
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
            console.log(`Create employee error: ${error}`)
        }
      };

    const handleSubmitEmployee = async (e)=>{
        e.preventDefault()
        setErrors(validateValues(formData));
        setSubmitting(true);  
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
          finishSubmit();
        }
      }, [errors]);


    return (
        <>
            <div className='container m-3 p-3'>
                <div className='row'>
                    <div className='col-md-4 offset-md-5 col-md-auto'>
                    
                        <form>
                            <div className='row mb-3'>
                                <label className='col-sm-2 col-form-label'>Name</label>
                                <div className="col-sm-10">
                                    <input type='text' name='Name' defaultValue={formData.Name} className='form-control' placeholder='Enter employee name' onChange={handleInputChange} />
                                    {errors.name ? (<p className="text text-warning mb-1"> {errors.name}</p>) : null}
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <label className='col-sm-2 col-form-label'>Mobile</label>
                                <div className="col-sm-10">
                                    <input type='text'name='Mobile' maxLength={10} defaultValue={formData.Mobile} className='form-control' placeholder='Enter mobile number' onChange={handleInputChange}/>
                                    {errors.mobile ? (<p className="text text-warning mb-1"> {errors.mobile}</p>) : null}
                                </div>
                            </div>
                            <div className="d-grid col-12 mx-auto">
                                <button type='submit' className='btn btn-success' onClick={handleSubmitEmployee}>Submit</button>
                            </div>
                            {errors.response ? (<p className="text text-warning mb-1"> {errors.response}</p>) : null}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateEmployee