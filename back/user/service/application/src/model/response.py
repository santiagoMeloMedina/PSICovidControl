
from flask import jsonify

class Response:
    def __init__(self, code, response):
        self.code = code
        self.response = response
    
    def toMap(self):
        return jsonify({
            "code": self.code,
            "response": self.response
        })

