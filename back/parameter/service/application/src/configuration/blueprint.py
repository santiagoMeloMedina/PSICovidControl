
from src.configuration.app import app
import src.constant.blueprint as BLUEPRINT
from src.controller.parameter import route as ParameterController

app.register_blueprint(ParameterController)