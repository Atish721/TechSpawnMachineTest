<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    header('Access-Control-Allow-Methods: *');
    
    // include_once('../model/employeeModel.php');
    include_once($_SERVER['DOCUMENT_ROOT'] . '/api/model/employeeModel.php');

    
    $employeeModel = new employeeModel();
    $method = $_SERVER['REQUEST_METHOD'];

    $headers = getallheaders();


    function checkDuplicateData($data)
    {
        global $employeeModel;
        global $method;

        $whereClause='Mobile = ?';
        $paramTypes='s';
        $paramValues = array(
            $data->Mobile
        );
                    
        $getData = $employeeModel->getDataWhereClause('employees', 'Id,Name,Mobile', $whereClause,$paramTypes,$paramValues);

        if($method=='PUT')
        {
            if($getData)
            {
                return ($getData[0]['Id']==$data->Id) ? false : true;               
            }
            else
            {
                return false;
            }
        }
        else
        {
            return ($getData) ? true : false;
        }
    }

    function getEmployees()
    {
        try {
            global $employeeModel;

            $where='';
            if(isset($_GET['id']))
            {
                $where=['Id'=>base64_decode($_GET['id'])];
            }

            $getData = $employeeModel->getAllData('employees', 'Id,Name,Mobile', 'Id desc','',$where);
            if(!empty($getData))
            {
                $response = ['success'=>true,'message'=>'Data found','data'=>$getData];
            }
            else
            {
                $response = ['success'=>true,'message'=>'Data not found','data'=>$getData];                
            }
            echo json_encode($response);
            return;
        } catch (Exception $e) {
            $response = ['success'=>false,'message'=>'Data not found','error'=>$e->getMessage(),'data'=>null];
            echo json_encode($response);
            return;
        }        
    }

    function createEmployee()
    {
        try {

            global $employeeModel;

            
            
            $insertData = json_decode(file_get_contents('php://input'));
       

            $duplicate = checkDuplicateData($insertData);


            if($duplicate==false)
            {
                $inserted = $employeeModel->insertData('employees', $insertData->Name, $insertData->Mobile);
            
                if($inserted>0)
                {
                    $response = ['success'=>true,'message'=>'Employee created successfully!','data'=>null];
                }
                else
                {
                    $response = ['success'=>true,'message'=>'Employee not created','data'=>null];                
                }
            }
            else
            {
                 $response = ['success'=>false,'message'=>'Mobile number aleady exist','data'=>null];
            }
            
            echo json_encode($response);
            return;
        } catch (Exception $e) {
            $response = ['success'=>false,'message'=>'Employee not created','error'=>$e->getMessage(),'data'=>null];
            echo json_encode($response);
            return;
        }        
    }

    function updateEmployee()
    {
        try {

            global $employeeModel;
            
            $updateData = json_decode(file_get_contents('php://input'));       

            $duplicate = checkDuplicateData($updateData);


            if($duplicate==false)
            {
                $sets = ' Name = ?, Mobile = ?';
                $paramValues = array(
                        $updateData->Name,
                        $updateData->Mobile,
                        $updateData->Id
                    );
                $whereClause = 'Id = ?';
                $paramTypes = 'ssi';

                $updated = $employeeModel->updateData('employees', $sets, $paramTypes,$paramValues, $whereClause);
        
                if($updated)
                {
                    $response = ['success'=>true,'message'=>'Employee updated successfully!','data'=>null];
                }
                else
                {
                    $response = ['success'=>true,'message'=>'Employee not updated','data'=>null];                
                }
              
            }
           else
           {
                $response = ['success'=>false,'message'=>'Mobile number aleady exist','data'=>null];
           }
            
            echo json_encode($response);
            return;
        } catch (Exception $e) {
            $response = ['success'=>false,'message'=>'Employee not updated','error'=>$e->getMessage(),'data'=>null];
            echo json_encode($response);
            return;
        }        
    }

    function deleteEmployee()
    {
        try {
            global $employeeModel;

            $response = ['success'=>false,'message'=>'Invalid request','data'=>null];

            if(isset($_GET['id']))
            {
                $id = base64_decode($_GET['id']);

                $whereClause = 'Id = ?';
                $paramValues = array(
                    $id
                );
                $paramTypes = 'i';

                $deleted = $employeeModel->deleteData('employees',$whereClause,$paramTypes,$paramValues);
           
                if($deleted)
                {
                    $response = ['success'=>true,'message'=>'Employee deleted','data'=>null];
                }
                else
                {
                    $response = ['success'=>true,'message'=>'Employee not deleted','data'=>null];                
                }
            }
            
            echo json_encode($response);
            return;
        } catch (Exception $e) {
            $response = ['success'=>false,'message'=>'Employee not deleted','error'=>$e->getMessage(),'data'=>null];
            echo json_encode($response);
            return;
        }        
    }


    if(isset($headers['Authorization']) && $headers['Authorization']=='11975259806565b1')// Check or compare token with Database, for demo I used hard coded token
    {        
        switch ($method) {
            case 'GET':
                    getEmployees();
                break;
    
            case 'POST':
                    createEmployee();                
                break;
    
            case 'PUT':
                    updateEmployee();
                break;
    
            case 'DELETE':
                    deleteEmployee();                
                break;
    
            default:
            echo json_encode($response);
                echo json_encode(['success'=>false,'message'=>'Invalid method request.','data'=>null]);
                break;
        }  
    }
    else
    {
        echo json_encode(['success'=>false,'message'=>'Invalid token.','data'=>null]);
    }  
    

?>