mtlmurals
#########

.. image:: https://img.shields.io/travis/ellmetha/mtlmurals.svg?style=flat-square
    :target: https://travis-ci.org/ellmetha/mtlmurals
    :alt: Build status

.. image:: https://img.shields.io/codecov/c/github/ellmetha/mtlmurals.svg?style=flat-square
    :target: https://codecov.io/github/ellmetha/mtlmurals
    :alt: Codecov status

|

*A Flask + ReactJS application allowing you to discover the Montréal murals!*

.. image:: https://raw.githubusercontent.com/ellmetha/mtlmurals/master/.files/preview.png

The goal of this project is to showcase the use of the Flask_ web framework alongside the ReactJS_
library.

.. contents:: Table of Contents
    :local:

Requirements
============

Python_ 3.6+, Pipenv_ 3.5+, Flask_ 0.12+.

Installation
============

You can install the project locally using the following commands:

.. code-block:: shell

  $ git clone https://github.com/ellmetha/mtlmurals && cd mtlmurals
  $ pipenv install --dev --python /usr/bin/python3.6
  $ cp .env.json.example .env.json     # Initializes the environment settings
  $ export FLASK_APP=autoapp.py
  $ pipenv run flask db upgrade

You can now download the `dataset containing the list of subventioned murals <http://donnees.ville.montreal.qc.ca/dataset/murales>`_
(select the ``geojson`` version of the dataset). Put it somewhere on your system and then run the
following command in order to import the data into the application database:

.. code-block:: shell

  $ pipenv run flask import_murals /path/to/murales.json

*Alright!* Now all you have to do is to launch the development server using:

.. code-block:: shell

  $ pipenv run flask run

Credits
=======

The data used by this project come from the `Open data catalogue <http://donnees.ville.montreal.qc.ca/>`_
provided by the City of Montréal.

License
=======

MIT. See ``LICENSE`` for more details.

.. _Flask: http://flask.pocoo.org/
.. _Pipenv: https://github.com/kennethreitz/pipenv
.. _Python: https://www.python.org
.. _ReactJS: https://facebook.github.io/react/
