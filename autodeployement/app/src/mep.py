class mep:
    
    id_mep
    label_mep
    type_mep
    description_mep
    etat_mep
    user_mep
    date_recepion_mep
    date_mep
    id_km_mep
    note_mep	
    
    def __init__(self, id_mep, label_mep, type_mep, description_mep, etat_mep, user_mep, date_reception_mep, date_mep, id_km_mep, notes_mep):
        self.id_mep = id_mep
        self.label_mep = label_mep
        self.type_mep = type_mep
        self.description_mep = description_mep
        self.etat_mep = etat_mep
        self.user_mep = user_mep
        self.date_reception_mep = date_reception_mep
        self.date_mep = date_mep
        self.id_km_mep = id_km_mep
        self.notes_mep = notes_mep
    
    def addMep(self):
        return self.x - self.y
        
    def editMep(self):
        return 2 * self.x + 2 * self.y
        
    def deleteMep(self,text):
        self.description = text
        
    def findMep(self, id_mep):
        return id_mep
        

