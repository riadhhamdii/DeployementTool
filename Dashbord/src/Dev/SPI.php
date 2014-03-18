<?php
namespace Dev;

use Doctrine\DBAL\DriverManager;

class SPI {
    
    public static $container;

    public static $connection = NULL;

    public function __construct($container)
    {
        self::$container = $container;
    }
    /**
     * 
     * @param string $id name of the connection/@return Connection object
     */
    public static function getConnection($id = null)
    {   
        if(is_null($id) || $id == '')
        {
            $id = 'doctrine.dbal.default_connection';
        }
        self::$connection = self::$container->get($id);        
        
        $params = self::$connection->getParams();

        self::$connection = DriverManager::getConnection($params);

        return self::$connection;
    }
    
    
    public function getMepManager()
    {
       return Entities\MepManager::getInstance();
    }
    
    public function getUserManager()
    {
        return Entities\UserManager::getInstance();
    }
    public static function getUser()
    {
        $context = self::$container->get('security.context');
        $user=$context->getToken()->getUser();
        return $user;
        
    }
}
