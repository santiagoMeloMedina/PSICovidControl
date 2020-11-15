
from src.configuration.app import app
import src.constant.blueprint as BLUEPRINT
from src.controller.user import route as UserController
from src.controller.ep import route as EPController

app.register_blueprint(UserController)
app.register_blueprint(EPController)