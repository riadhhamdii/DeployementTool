class machine:
    
    _idMachine = None
    _nomMachine = None
    _ipMachine = None
    _etatMachine = None
    _inClusterMachine = None

    def __init__(self, idMachine, nomMachine, ipMachine, etatMachine, inClusterMachine):
            self._idMachine = idMachine
            self._nomMachine = nomMachine
            self._ipMachine = ipMachine
            self._ipMachine = etatMachine
            self._inClusterMachine = inClusterMachine

    # Gettters & Setters
    def getIdMachine(self):
            return self._idMachine

    def setIdMachine(self, idMachine):
            self._idMachine = idMachine

    def getNomMachine(self):
            return self._nomMachine

    def setNomMachine(self, nomMachine):
            self._nomMachine = nomMachine

    def getIpMachine(self):
            return self._ipMachine

    def setIpMachine(self, ipMachine):
            self._ipMachine = ipMachine

    def getEtatMachine(self):
            return self._etatMachine

    def setEtatMachine(self, etatMachine):
            self._etatMachine = etatMachine

    def getInClusterMachine(self):
            return self._inClusterMachine

    def setInClusterMachine(self, inClusterMachine):
            self._inClusterMachine = inClusterMachine

    # CRUD 
    def addMachine(self):
            return 0

    def editMachine(self):
            return 0

    def deleteMachine(self):
            return 0
