<?php


namespace Dev\Entities;

use Dev\SPI;
use Dev\EntityManager;

class UserManager extends EntityManager
{
        private static $_instance = null;
    /**
     * Returns a singleton of the userManager.
     * @return userManager
     */
    public static function getInstance()
    {
        if (!self::$_instance instanceof UserManager)
        {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * all: Permet de récupérer les users
     *
     * @access  public
     * @return  array(Entity\Http, …)     $users   Tableau d'objets user
     *
     */
    public function all()
    {
        $sql = "SELECT * from user where is_deleted_user !=1" ;
        $conn = self::getConnection('doctrine.dbal.DB_Mep_connection');
         
        $stmt = $conn->prepare($sql);
         
        $stmt->execute();
        
       $users = $stmt->fetchAll(\PDO::FETCH_OBJ);
       return $users ;
    }
    
    public function getUser($id)
    {
        $sql = "SELECT * from user where id_user=:id" ;
        $conn = self::getConnection('doctrine.dbal.DB_Mep_connection');
         

        $stmt = $conn->prepare($sql);
        $stmt->bindValue('id', $id);
         
        $stmt->execute();
        
        $user = $stmt->fetch(\PDO::FETCH_OBJ);
        return $user;
    }
    
	public function delete($id)
    {      		
		try {
			$sql = "Delete FROM user WHERE id_user=:id" ;
			$conn = self::getConnection('doctrine.dbal.DB_Mep_connection');
			 
			$stmt = $conn->prepare($sql);
			$stmt->bindValue('id', $id);
			 
			$stmt->execute();
			return array('success'=>true);
		} 
		catch(\Exception $e) {
			return array('success'=>false);
		}	
		
    }
	
    public function create($data)
    {     
        try {
            $sql = "INSERT INTO user (login_user,password_user,is_admin_user,firstname_user,lastname_user,email_user,is_deleted_user,create_date_user,update_date_user)" ; 
            $sql .= " values(:login,:password,:admin,:firstname,:lastname,:email,0,NOW(),NOW())";
            
            $conn = self::getConnection('doctrine.dbal.DB_Mep_connection');
            
            $user = SPI::$container->get('security.context')->getToken()->getUser();
            
            $stmt = $conn->prepare($sql);
            $stmt->bindValue('login',$data->login );
            $stmt->bindValue('password',  md5($data->password) );
            $stmt->bindValue('admin',$data->admin );
            $stmt->bindValue('firstname',$data->firstname );
            $stmt->bindValue('lastname',$data->lastname );
            $stmt->bindValue('email',$data->email );
            
            $stmt->execute();
            return array('success'=>true);
        } catch(\Exception $e) {
            return array('success'=>false);
        }
    }
    
    public function update($data)
    {
        try {
            $sql = "Update user set login_user=:login,is_admin_user=:admin,firstname_user=:firstname,lastname_user=:lastname,email_user=:email,update_date_user=NOW()" ; 
            $sql .= " where id_user=:id";

            $conn = self::getConnection('doctrine.dbal.DB_Mep_connection');

            $user = SPI::$container->get('security.context')->getToken()->getUser();

            $stmt = $conn->prepare($sql);
            $stmt->bindValue('id',$data->id );
            $stmt->bindValue('login',$data->login );
            $stmt->bindValue('admin',$data->admin );
            $stmt->bindValue('firstname',$data->firstname );
            $stmt->bindValue('lastname',$data->lastname );
            $stmt->bindValue('email',$data->email );

            $stmt->execute();
            return array('success'=>true);
        } catch(\Exception $e) {
            return array('success'=>false);
        }
    }
}