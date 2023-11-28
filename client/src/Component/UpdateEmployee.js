import React,{useEffect, useState} from 'react';
import { useNavigate,useParams } from 'react-router-dom';

const UpdateEmployee = ()=>{

    const {id}=useParams()   
    const errorMessages={}
    const navigate = useNavigate()
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const user = localStorage.getItem('user');
    const parseData = JSON.parse(user)
    
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

    const getEmployee = async (id)=>{

        try
        {

            const response = await fetch(`http://localhost/Projects/techSpawnMachineTest/server/controller/employeeController?id=${id}`,{
                method:'GET',                   
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': parseData?.token,
                }
            })

            if(response.ok)
            {
                const apiResponse = await response.json()
                if(apiResponse.success)
                {
                    setFormData(apiResponse.data[0])
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

    }

    const finishSubmit = async () => {
        try
        {
            const response = await fetch(`http://localhost/Projects/techSpawnMachineTest/server/controller/employeeController`,{
                method:'PUT',                             
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
    }

    const handleUpdateEmployee = async (e)=>{
        e.preventDefault()
        setErrors(validateValues(formData));
        setSubmitting(true);         
    }

    useEffect(()=>{
        getEmployee(id)

        if (Object.keys(errors).length === 0 && submitting) {
            finishSubmit();
        }
    }, [errors])

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
                                <button type='submit' className='btn btn-success' onClick={handleUpdateEmployee}>Update</button>
                            </div>
                            {errors.response ? (<p className="text text-warning mb-1"> {errors.response}</p>) : null}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateEmployee