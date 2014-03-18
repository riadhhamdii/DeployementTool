<?php


namespace Dev\Entities;

use Dev\SPI;
use Dev\EntityManager;

class MepManager extends EntityManager
{
        private static $_instance = null;
    /**
     * Returns a singleton of the ClientManager.
     * @return ClientManager
     */
    public static function getInstance()
    {
        if (!self::$_instance instanceof MepManager)
        {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
 
    public function all()
    {
        $sql = "SELECT * FROM mep WHERE" ;
        
		$sql .=  " is_deleted !=1 ";
		
		/*if ($data){
			$sql .=" AND label_mep = '".$data->label."' ";
		}*/
		
		$user = SPI::$container->get('security.context')->getToken()->getUser();		
		
		if ( ! $user->isAdmin ){
			$sql .= " AND id_user_mep=:id_user ";
		}
		
        $conn = self::getConnection('doctrine.dbal.DB_Mep_connection');         

        $stmt = $conn->prepare($sql);
		
		if ( ! $user->isAdmin ){
			$stmt->bindValue('id_user', $user->id);
		}
		
        $stmt->execute();
        
       $meps = $stmt->fetchAll(\PDO::FETCH_OBJ);
       
       foreach($meps as $mep) {
            $sql = "SELECT * from user where id_user=:id";
            $conn = self::getConnection('doctrine.dbal.DB_Mep_connection');

            $stmt = $conn->prepare($sql);
            $stmt->bindValue('id', $mep->id_user_mep);

            $stmt->execute();
            
            $user = $stmt->fetch(\PDO::FETCH_OBJ);
            $mep->user = $user;
       }
       return $meps ;
    }

    public function getData($searchFiltersMep)
    {
        $sql = "SELECT * FROM mep WHERE" ;

        $sql .=  " is_deleted !=1 ";

		if ( $searchFiltersMep['label_mep'] != '' ){
			$sql .=  " AND label_mep LIKE '%".$searchFiltersMep['label_mep']."%' ";
		}
		if ( $searchFiltersMep['type_mep'] != '' ){
			$sql .=  " AND type_mep = '".$searchFiltersMep['type_mep']."' ";
		}
		if ( $searchFiltersMep['status_mep'] != '' ){
			$sql .=  " AND status_mep = '".$searchFiltersMep['status_mep']."' ";
		}
		if ( $searchFiltersMep['id_km_mep'] != '' ){
			$sql .=  " AND id_km_mep = ".$searchFiltersMep['id_km_mep']." ";
		}
		if ( $searchFiltersMep['date_mep'] != '' ){
			$sql .=  " AND left(date_mep, 10) = '".$searchFiltersMep['date_mep']."' ";
		}
		
        $user = SPI::$container->get('security.context')->getToken()->getUser();

        if ( ! $user->isAdmin ){
                $sql .= " AND id_user_mep=:id_user ";
        }

        $conn = self::getConnection('doctrine.dbal.DB_Mep_connection');

        $stmt = $conn->prepare($sql);

        if ( ! $user->isAdmin ){
                $stmt->bindValue('id_user', $user->id);
        }

        $stmt->execute();
        
        $countMep = $stmt->rowCount();

        $meps = $stmt->fetchAll(\PDO::FETCH_OBJ);
        
        $statusMep = array (
            '0' => 'En attente',
            '1' => 'En cours',
            '2' => 'Annulée',
            '3' => 'Terminée',
            '4' => 'Echouée'
        );
        
        foreach($meps as $mep) {
            $sql1 = "SELECT * from user where id_user=:id";
            $conn = self::getConnection('doctrine.dbal.DB_Mep_connection');

            $stmt = $conn->prepare($sql1);
            $stmt->bindValue('id', $mep->id_user_mep);

            $stmt->execute();

            $user = $stmt->fetch(\PDO::FETCH_OBJ);
            $mep->user_label = $user->firstname_user .' '.$user->lastname_user;
            $mep->status_mep = $statusMep[$mep->status_mep];
            $mep->user = $user;
            $mep->idUser = $user->id_user;
        }

        $allMeps = array(
            'total' => $countMep, // nombre total
            'page' => $searchFiltersMep['page'],
            'records' => count($meps), //
            'rows' => $meps
        );
        return $allMeps ;
    }
    
    public function getMep($id)
    {
        $sql = "SELECT * from mep where id_mep=:id" ;
        $conn = self::getConnection('doctrine.dbal.DB_Mep_connection');
         
        $stmt = $conn->prepare($sql);
        $stmt->bindValue('id', $id);
         
        $stmt->execute();
        
        $mep = $stmt->fetch(\PDO::FETCH_OBJ);
        return $mep;
    }
	
    public function delete($id)
    {      
		
		try {
			$sql = "Delete FROM mep WHERE id_mep=:id" ;
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
            $sql = "INSERT INTO mep (label_mep,type_mep,status_mep,id_user_mep,id_km_mep,id_km_project,notes_mep,description_mep,date_reception_mep,date_mep)" ; 
            $sql .= " values(:label,:type,:status,:user,:km,:project,:note,:description,NOW(),:datemep)";

            $conn = self::getConnection('doctrine.dbal.DB_Mep_connection');

            $user = SPI::$container->get('security.context')->getToken()->getUser();

            $stmt = $conn->prepare($sql);
            $stmt->bindValue('label',$data->label );
            $stmt->bindValue('type',$data->type );
            $stmt->bindValue('status','0' );
            $stmt->bindValue('user',$user->id );
            $stmt->bindValue('km',$data->idKm );
            $stmt->bindValue('project',$data->idKmProject );
            $stmt->bindValue('note',$data->note );
            $stmt->bindValue('description',$data->description );
            $stmt->bindValue('datemep',$data->datemep.":00");

            $stmt->execute();
            return array('success'=>true);
        } catch(\Exception $e) {
            return array('success'=>false);
        }
    }
    
    public function update($data)
    {
        try {
            $sql = "Update mep set label_mep=:label, type_mep=:type, status_mep=:status,";
			$sql .= " id_km_mep=:km, id_km_project=:project, notes_mep=:note, description_mep=:description," ;
			$sql .= " date_reception_mep=NOW(), date_mep=:datemep";
            $sql .= " WHERE id_mep=:id";

            $conn = self::getConnection('doctrine.dbal.DB_Mep_connection');

            $user = SPI::$container->get('security.context')->getToken()->getUser();

            $stmt = $conn->prepare($sql);
            $stmt->bindValue('id',$data->id );
            $stmt->bindValue('label',$data->label );
            $stmt->bindValue('type',$data->type );
            $stmt->bindValue('status',$data->status );
			$stmt->bindValue('description',$data->description );
            $stmt->bindValue('km',$data->idKm );
            $stmt->bindValue('project',$data->idKmProject );
            $stmt->bindValue('note',$data->note );
            $stmt->bindValue('datemep',$data->datemep.":00");
            

            $stmt->execute();
            return array('success'=>true);
        } catch(\Exception $e) {
            return array('success'=>false);
        }
    }
}