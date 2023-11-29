<?php 
error_reporting(-1); ini_set('display_errors', 'On'); 
require_once('../config/db.php');

class employeeModel {    
    
    private $db_handle;
    
    function __construct() {
        $this->db_handle = new db();
    }
     
    function insertData($table,$name, $mobile) {
        $query = 'INSERT INTO '.$table.' (name,mobile) VALUES (?, ?)';
        $paramType = 'ss';
        $paramValue = array(
            $name,
            $mobile
        );
        
        return $this->db_handle->insert($query, $paramType, $paramValue);
    }

    function updateData($table,$sets, $paramTypes,$paramValues, $whereClause) {

        $query = 'update '.$table.' set '.$sets.' where '.$whereClause;
        return $this->db_handle->update($query, $paramTypes, $paramValues);
    }

    function deleteData($table,$whereClause,$paramTypes,$paramValues) {
        $query = 'DELETE FROM '.$table.' WHERE '.$whereClause;
        return $this->db_handle->update($query, $paramTypes, $paramValues);
    }

    function getDataWhereClause($table,$columns='*',$whereClause,$paramTypes,$paramValues) {
        $query = 'SELECT '.$columns.' FROM '.$table.' WHERE '.$whereClause;        
        return $this->db_handle->runQuery($query, $paramTypes, $paramValues);
    }

    function getAllData($table,$column='*',$orderBy='',$limit='',$where='',$like=false,$operand='AND') {

        $query = "SELECT {$column} FROM `{$table}` WHERE ";

        if(is_array($where) && $where != ''){
             
            foreach($where as $key=>$value){
             
                if($like){
                    $query .= "`{$key}` LIKE '%{$value}%' {$operand} ";
                }else{
                    $query .= "`{$key}` = '{$value}' {$operand} ";
                }
            }
             
            $query = substr($query, 0, -(strlen($operand)+2));
 
        }else{
            $query = substr($query, 0, -6);
        }
         
        if($orderBy != ''){
            $query .= ' ORDER BY ' . $orderBy;
        }
         
        if($limit != ''){
            $query .= ' LIMIT ' . $limit;
        }
        return $this->db_handle->runBaseQuery($query);
    }
    

} 
?>