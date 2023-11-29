<?php 
error_reporting(-1); ini_set('display_errors', 'On'); 
// require_once('../config/db.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/api/config/db.php');

class authModel {    
    
    private $db_handle;
    
    function __construct() {
        $this->db_handle = new db();
    }     

    function getDataWhereClause($table,$columns='*',$whereClause,$paramTypes,$paramValues) {
        $query = 'SELECT '.$columns.' FROM '.$table.' WHERE '.$whereClause;        
        return $this->db_handle->runQuery($query, $paramTypes, $paramValues);
    } 

} 
?>