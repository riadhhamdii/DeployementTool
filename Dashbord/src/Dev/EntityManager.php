<?php

namespace Dev;

use Dev\SPI;
use Doctrine\DBAL\DriverManager;


class EntityManager {
   /**
     * @var mixed Doctrine\DBAL\Connection 
     */
    public static $conn;        
    
      /**
     * Connects to DataBases
     *
     * @param string param [optional] identifient of connection
     * @access public
     * @return object $conn
     */
    public static function getConnection($param = null)
    {   
       // $id = 'doctrine.dbal.commun_connection';
        if (self::$conn instanceof \Doctrine\DBAL\Connection) {
            self::$conn->close();
        }

       // $id = 'doctrine.dbal.default_connection';
        
        $id = '';
        
        if(!\is_null($param)) {
            $id = $param;
        }
        
        /**
         * Init connection
         */
        self::$conn = SPI::getConnection($id);

        return self::$conn;
        
    }
}

?>
