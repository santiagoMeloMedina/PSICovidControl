
from src.configuration.blueprint import app
from flask import jsonify
import src.constant.http_code as HTTP_CODE
import src.constant.connection as CONN
from src.model.response import Response

@app.route("/", methods=['GET'])
def home():
    return Response(HTTP_CODE.SUCESSFUL, "Hello from Exam!").toMap()

if __name__ == "__main__":
    app.run()
