
from src.model.user.user import User
import src.constant.role as ROLE

class Admin(User):
    def __init__(self, id=None, email=None, docType=None, docNum=None, 
                        name=None, username=None, lastname=None, **kwargs):
        super().__init__(id, ROLE.ROLES['ADMIN'], email, docType, 
                        docNum, name, None, 
                        username, None, None, 
                        None, None, None)
        self.lastname = lastname
    
    def getLastname(self):
        return self.lastname
    
    def getMap(self):
        result = super().getMap().copy()
        toDelete = []
        for key in result:
            if result[key] == None:
                toDelete.append(key)
        for key in toDelete:
            del result[key]
        result["lastname"] = self.lastname
        return result