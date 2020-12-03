
from src.configuration.app import app
import src.constant.blueprint as BLUEPRINT
from src.controller.parameter import route as ParameterController
from src.controller.neighborhood import route as NeighborhoodController
from src.controller.category import route as CategoryController
from src.controller.documentType import route as DocumentTypeController

app.register_blueprint(ParameterController)
app.register_blueprint(NeighborhoodController)
app.register_blueprint(CategoryController)
app.register_blueprint(DocumentTypeController)