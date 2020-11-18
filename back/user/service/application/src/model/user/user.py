
class User:
    def __init__(self, id=None, rol=None, email=None, docType=None, 
                        docNum=None, name=None, state=None, 
                        username=None, city=None, department=None, 
                        address=None, neighHood=None, phoneNum=None, **kwargs):
        self.id = id
        self.rol = rol
        self.email = email
        self.docType = docType
        self.docNum = docNum
        self.name = name
        self.state = state
        self.username = username
        self.city = city
        self.department = department
        self.address = address
        self.neighborhood = neighHood
        self.phone = phoneNum
    
    def getId(self):
        return self.id
    
    def getRol(self):
        return self.rol
    
    def getDocType(self):
        return self.docType
    
    def getDocNum(self):
        return self.docNum
    
    def getName(self):
        return self.name
    
    def getState(self):
        return self.state
    
    def getUsername(self):
        return self.username
    
    def getCity(self):
        return self.city
    
    def getDepartment(self):
        return self.department

    def getAddress(self):
        return self.address
    
    def getNeighborhood(self):
        return self.neighborhood
    
    def getPhone(self):
        return self.phone
    
    def getMap(self):
        return {
            "id": self.id,
            "rol": self.rol,
            "email": self.email,
            "docType": self.docType,
            "docNum": self.docNum,
            "name": self.name,
            "state": self.state,
            "username": self.username,
            "city": self.city,
            "department": self.department,
            "address": self.address,
            "neighHood": self.neighborhood,
            "phoneNum": self.phone
        }
