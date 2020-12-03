
from src.model.user.user import User
import src.constant.role as ROLE

class Citizen(User):
    def __init__(self, id=None, rol=None, email=None, docType=None, 
                        docNum=None, name=None, state=None, 
                        username=None, city=None, department=None, 
                        address=None, neighHood=None, phoneNum=None, 
                        lastname=None, gender=None, **kwargs):
        super().__init__(id, ROLE.ROLES['CITIZEN'], email, docType, 
                        docNum, name, state, 
                        username, city, department, 
                        address, neighHood, phoneNum)
        self.lastname = lastname
        self.gender = gender
    
    def getLastname(self):
        return self.lastname
    
    def getGender(self):
        return self.gender
    
    def getMap(self):
        result = super().getMap().copy()
        toDelete = []
        for key in result:
            if result[key] == None:
                toDelete.append(key)
        for key in toDelete:
            del result[key]
        print(toDelete)
        result["lastname"] = self.lastname
        result["gender"] = self.gender
        return result