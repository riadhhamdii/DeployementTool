<?php


namespace Dev\Authentification;

use Dev\Authentification\Entity\User;
use Dev\EntityManager;
use Doctrine\DBAL\Connection;

class UserManager extends EntityManager{
 
    
    public static $_instance = null;
    
    /**
     * Returns a singleton of the UserManager.
     * 
     * @access public     
     */

    public static function getInstance()
    {
        if (!self::$_instance instanceof UserManager) 
            {
                self::$_instance = new self();
            }
        return self::$_instance;
    }
              
      public function getAllUser()
    {
        $sql = "SELECT * FROM user";
        
        $conn = self::getConnection('');

        $stmt = $conn->prepare($sql);

        $stmt->execute();
        
        $result = $stmt->fetchAll(\PDO::FETCH_OBJ);
        
        return $result;
    }
   
    
    public function findByName($userName){
        $sql  = "SELECT * FROM user WHERE login_user = :login";
        
        $conn = self::getConnection('');

        $stmt = $conn->prepare($sql);
        
        $stmt->bindValue('login', $userName);
        
        $stmt->execute();
        
        $result = $stmt->fetch(\PDO::FETCH_OBJ);
       
        if($result != false){
            
            $id = $result->id_user;        
            $password = $result->password_user;            
            $username = $result->login_user;
            $role = $result->is_admin_user;
            $firstName = $result->firstname_user;
            $lastName = $result->lastname_user;
            $email = $result->email_user;
            $createDate = $result->create_date_user;
            $updateDate = $result->update_date_user;
           
            $user = new User($id, $username, $password, array() ,$role, $firstName, $lastName, $email, $createDate, $updateDate); 
            
            return $user; 
           
        }
        else{
            $user = new User("","","", array(),"","","","","","");
            
            return $user;
        }        
                
    }
    public function updateConnexion($userName)
    {
         $sql = "INSERT INTO `co_user` SET `UserName`='".$userName."', `lastConnexion` = NOW() ON DUPLICATE KEY UPDATE `lastConnexion` = NOW()";
         
        $conn = self::getConnection('doctrine.dbal.DB_Mep_connection');  
       
        $stmt = $conn->prepare($sql);
         
        $stmt->execute();
    }
}
?>
