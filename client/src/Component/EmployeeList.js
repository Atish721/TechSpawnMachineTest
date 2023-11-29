import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EmployeeList = () =>{

    const [employees,setEmployees]=useState([]);
    const user = localStorage.getItem('user');
    const parseData = JSON.parse(user)
    
    const getEmployeeList= async()=>{
        
            try
            {
                

                const response = await fetch(`https://tech-spawn-machine-test-backend.vercel.app/controller/employeeController`,
                {
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': parseData?.token,
                    }
                })
    
                if(response.ok)
                {
                    const apiResponse = await response.json()
    
                    if(apiResponse?.success)
                    {
                        setEmployees(apiResponse?.data)
                    }
                    else
                    {
                        console.log(apiResponse?.error)
                    }
                }
                else
                {
                    throw new Error('Network response was not ok')
                }
    
            }
            catch(error)
            {
                console.log(error)
            }
    }

    const handleDeleteEmployee = async (id)=>{
        const response = await fetch(`https://tech-spawn-machine-test-backend.vercel.app/controller/employeeController?id=${id}`,{
                method:'DELETE',                   
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': parseData?.token,
                },
            })

            if(response.ok)
            {
                const apiResponse = await response.json()
              
                if(apiResponse.success)
                {
                    getEmployeeList()
                }
                else
                {
                    console.log(apiResponse.error)
                }
            }
            else
            {
                throw new Error('Network response was not ok') 
            }
    }

    useEffect(()=>{
        getEmployeeList()
    },[])

    return (

        <>
            <div className='container m-3 p-3'>
                <div className='row'>
                    <div className='col-md-8 offset-md-4 col-md-auto'>
                        <div className="table-responsive w-75">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                    <th scope="col">Sr. No.</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                        {employees?.map((employee,index) => (

                                    <>
                                        <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{employee.Name}</td>
                                            <td>{employee.Mobile}</td>
                                            <td>
                                                <Link to={`/employee/update/${btoa(employee.Id)}`} className='btn btn-primary ms-2'data-bs-toggle="modal" data-bs-target="#editCategoryModal" >Edit</Link>
                                                <button  className='btn btn-danger ms-2' onClick={()=>handleDeleteEmployee(btoa(employee.Id))}>Delete</button>
                                            </td>                                           
                                            
                                        </tr>
                                    </>                                           
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeList