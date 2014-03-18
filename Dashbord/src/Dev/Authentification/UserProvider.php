<?php

namespace Dev\Authentification;

use Dev\Authentification\Entity\User;
use Dev\Authentification\UserManager;
use Dev\SPI;

use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;


class UserProvider implements UserProviderInterface{
    
     public static $container;    
    
     public function __construct($container)
    {
        self::$container = $container;     
    }    
    
    public function loadUserByUsername($username)
    {
     
        $spi = new SPI(self::$container);
        
        $userManager = UserManager::getInstance();               
        
        $user = $userManager->findByName($username);
        
        return $user;
    }

    public function refreshUser(UserInterface $user)
    {  
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', get_class($user)));
        }
 
        return $this->loadUserByUsername($user->getUsername());
    }

    public function supportsClass($class)
    {
        return $class === 'Dev\Authentification\Entity\User';
    }
}

?>
