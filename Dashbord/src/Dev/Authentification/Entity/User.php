<?php

namespace Dev\Authentification\Entity;

use Symfony\Component\Security\Core\User\UserInterface;
use Dev\Authentification\UserManager;

class User implements UserInterface{
    
    public $id;
    public $username;
    public $password;
    public $isAdmin; 
    public $roles; 
    public $salt;
    public $firstName;
    public $lastName;
    public $email;
    public $isDeleted;
    public $createDate;
    public $updateDate;
    public $deleteDate;
    
  public function __construct($id, $username, $password, array $roles ,$role, $firstName, $lastName, $email, $createDate, $updateDate )
  {
        $this->id = $id;
        $this->username = $username;
        $this->password = $password;
        $this->isAdmin = $role;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->email = $email;
        $this->createDate = $createDate;
        $this->updateDate = $updateDate;
        $this->roles = $roles;
        $this->salt = "";
    }

    //Id SETTER AND GETTER
    
    public function getId()
    {
        return $this->id;
    }
    
    public function setId($id)
    {
        $this->id = $id;
    }
    
    //Roles SETTER AND GETTER
    public function isAdmin()
    {
        return $this->isAdmin;
    }
    
    public function setAdmin($role)
    {
        $this->isAdmin = $role;
    }

    //Password SETTER AND GETTER
    public function getPassword()
    {
        return $this->password;
    }
    
    
    public function getRoles() {
        return $this->roles;
    }
    
    public function getSalt() {
        return $this->salt;
    }
    public function setPassword($password)
    {
        $this->password = $password;
    }

    //UserName SETTER AND GETTER
    public function getUsername()
    {
        return $this->username;
    }
    
     public function setUsername($userName)
    {
        $this->username = $userName;
    }
    
    
    
    //FirstName SETTER AND GETTER
    public function getFirstName()
    {
        return $this->firstName;
    }
        
    public function setFirstName($firstName)
    {
        $this->firstName = $firstName;
    }
    
    //LastName SETTER AND GETTER
    public function getLastName()
    {
        return $this->lastName;
    }
        
    public function setLastName($lastName)
    {
        $this->lastName = $lastName;
    }
    
    //email SETTER AND GETTER
    public function getEmail()
    {
        return $this->email;
    }
        
    public function setEmail($email)
    {
        $this->email = $email;
    }
        
    //isDeleted SETTER AND GETTER
    public function isDeleted()
    {
        return $this->isDeleted;
    }
        
    public function setIsDeleted($isDeleted)
    {
        $this->isDeleted = $isDeleted;
    }
        
    //dateCreate SETTER AND GETTER
    public function getCreateDate()
    {
        return $this->createDate;
    }
        
    public function setCreateDate($createDate)
    {
        $this->createDate = $createDate;
    }
        
    //dateUpdate SETTER AND GETTER
    public function getUpdateDate()
    {
        return $this->updateDate;
    }
        
    public function setUpdateDate($updateDate)
    {
        $this->updateDate = $updateDate;
    }
               
    //deleteDate SETTER AND GETTER
    public function getDeleteDate()
    {
        return $this->deleteDate;
    }
        
    public function setDeleteDate($deleteDate)
    {
        $this->deleteDate = $deleteDate;
    }
    
 
    public function eraseCredentials()
    {
        
    }
    
  
    public function equals(UserInterface $user)
    {
        if (!$user instanceof User) {
            return false;
        }
			
        if ($this->password !== $user->getPassword()) {
            return false;
        }
        
        if ($this->username !== $user->getUsername()) {
            return false;
        }
             
        return true;
    }
    
    
}

?>
