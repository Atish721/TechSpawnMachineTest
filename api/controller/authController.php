<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: *');
    header('Access-Control-Allow-Methods: *');
    
    // include_once('../model/authModel.php');
    include_once($_SERVER['DOCUMENT_ROOT'] . '/api/model/authModel.php');
    
    $authModel = new authModel();
    $method = $_SERVER['REQUEST_METHOD'];

    function authUser()
    {
        try {
            global $authModel;
            
            $loginData = json_decode(file_get_contents('php://input'));
    
            $whereClause='Email = ? and Password = ?';
            $paramTypes='ss';
            $paramValues = array(
                $loginData->Email,
                $loginData->Password
            );
                        
            $userData = $authModel->getDataWhereClause('users', 'Id,Email', $whereClause,$paramTypes,$paramValues);

            if($userData)
            {
                $userData[0]['token'] = '11975259806565b1';
                $response = ['success'=>true,'message'=>'Login successfully!','data'=>$userData];
            }
            else
            {
                $response = ['success'=>false,'message'=>'Incorrect email or password','data'=>null];                
            }
            echo json_encode($response);
            return;
        } catch (Exception $e) {
            $response = ['success'=>false,'message'=>'Failed to login','error'=>$e->getMessage(),'data'=>null];
            echo json_encode($response);
            return;
        } 
    }


    switch ($method) {

        case 'POST':
            authUser();                
            break;

        default:
            echo json_encode(['success'=>false,'message'=>'Invalid method request.','data'=>null]);
            break;
    }

?>