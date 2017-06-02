from flask_restplus import Api


api_v1 = Api(version='1.0', title='MTL-Murals API')


def init_app(app, **kwargs):
    """ Initializes the API extension. """
    # TODO: perform additional initializations here.
