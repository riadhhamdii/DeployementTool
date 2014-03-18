
class action:
    
    _idAction = None
    _labelAction = None
    _descriptionAction = None
    _cmdAction = None
    _typeAction = None
    
    # Constructor
    def __init__(self, idAction, labelAction, descriptionAction, cmdAction, typeAction):
        self._idAction = idAction
        self._labelAction = labelAction
        self._descriptionAction = descriptionAction
        self._cmdAction = cmdAction
        self._typeAction = typeAction
        
    # Gettters & Setters    
    def getIdAction(self):
        return self._idAction

    def setIdAction(self, idAction):
        self._idAction = idAction   
    
    def getLabelAction(self):
        return self._labelAction

    def setLabelAction(self, labelAction):
        self._labelAction = labelAction
    
    def getDescriptionAction(self):
        return self._descriptionAction

    def setDescriptionCluster(self, descriptionAction):
        self._descriptionAction = descriptionAction
        
    def getCmdAction(self):
        return self._cmdAction

    def setCmdAction(self, cmdAction):
        self._cmdAction = cmdAction
        
    def getTypeAction(self):
        return self._typeAction

    def setTypeAction(self, typeAction):
        self._typeAction = typeAction        
        
    # CRUD
    def addAction(self):
        return 0
        
    def editAction(self):
        return 0
        
    def deleteAction(self):
        return 0
        
        
