
from src.configuration.app import app
import src.constant.blueprint as BLUEPRINT
from src.controller.user import route as UserController

app.register_blueprint(UserController)