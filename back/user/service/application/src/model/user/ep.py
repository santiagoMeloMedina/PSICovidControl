
from src.model.user.user import User
import src.constant.role as ROLE

class EP(User):
    def __init__(self, id=None, email=None, docType=None, docNum=None, name=None, 
                        category=None, totalCap=None, state=None, 
                        username=None, city=None, department=None, 
                        address=None, neighHood=None, phoneNum=None, **kwargs):
        super().__init__(id, ROLE.ROLES['EP'], email, docType, 
                        docNum, name, state, 
                        username, city, department, 
                        address, neighHood, phoneNum)
        self.category = category
        self.totalCap = totalCap
    
    def getTotalCap(self):
        return self.totalCap
    
    def getCategory(self):
        return self.category
    
    def getMap(self):
        result = super().getMap().copy()
        toDelete = []
        for key in result:
            if result[key] == None:
                toDelete.append(key)
        for key in toDelete:
            del result[key]
        result["totalCap"] = self.totalCap
        result["category"] = self.category
        return result