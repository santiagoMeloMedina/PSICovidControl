
from src.model.user.user import User
import src.constant.role as ROLE

class ES(User):
    def __init__(self, id=None, email=None, docType=None, docNum=None, name=None, 
                        totalCap=None, totalDocts=None, state=None,
                        totalRes=None, totalBeds=None,  
                        username=None, city=None, department=None, 
                        address=None, neighHood=None, phoneNum=None, **kwargs):
        super().__init__(id, ROLE.ROLES['ES'], email, docType, 
                        docNum, name, state, 
                        username, city, department, 
                        address, neighHood, phoneNum)
        self.totalCap = totalCap
        self.totalDocts = totalDocts
        self.totalRes = totalRes
        self.totalBeds = totalBeds
    
    def getTotalCap(self):
        return self.totalCap
    
    def getTotalDocts(self):
        return self.totalDocts
    
    def getTotalRes(self):
        return self.totalRes
    
    def getTotalBeds(self):
        return self.totalBeds
    
    def getMap(self):
        result = super().getMap().copy()
        toDelete = []
        for key in result:
            if result[key] == None:
                toDelete.append(key)
        for key in toDelete:
            del result[key]
        result["totalCap"] = self.totalCap
        result["totalDocts"] = self.totalDocts
        result["totalRes"] = self.totalRes
        result["totalBeds"] = self.totalBeds
        return result

