
class cluster:
    
    _idCluster = None
    _nomCluster = None
    _descriptionCluster = None
    _userNameCluster = None
    _machinesCluster = None
    
    # Constructor
    def __init__(self, idCluster, nomCluster, descriptionCluster,  userNameCluster,  machinesCluster):
        
        self._idCluster = idCluster
        self._nomCluster = nomCluster
        self._descriptionCluster = descriptionCluster
        self._userNameCluster = userNameCluster
        self._machinesCluster = machinesCluster
  
    # Gettters & Setters
    def getIdCluster(self):
        return self._idCluster

    def setIdCluster(self, idCluster):
        self._idCluster = idCluster        
    
    def getNomCluster(self):
        return self._nomCluster

    def setNomCluster(self, nomCluster):
        self._nomCluster = nomCluster  
    
    def getDescriptionCluster(self):
        return self._descriptionCluster

    def setDescriptionCluster(self, descriptionCluster):
        self._descriptionCluster = descriptionCluster
    
    def getUserNameCluster(self):
        return self._userNameCluster

    def setUserNameCluster(self, userNameCluster):
        self._userNameCluster = userNameCluster       
      
    def getMachinesInCluster(self):
        return self._machinesCluster

    def setMachinesInCluster(self, machinesCluster):
        self._machinesCluster = machinesCluster
        
    # CRUD
    def addCluster(self):
        return 0
        
    def editCluster(self):
        return 0
        
    def deleteCluster(self):
        return 0
