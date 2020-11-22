
from src.configuration.app import app
import src.constant.blueprint as BLUEPRINT
from src.controller.entry import route as EntryController

app.register_blueprint(EntryController)