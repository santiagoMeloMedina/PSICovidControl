
from src.configuration.app import app
import src.constant.blueprint as BLUEPRINT
from src.controller.exam import route as ExamController

app.register_blueprint(ExamController)