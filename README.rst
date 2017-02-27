mtlmurals
#########

*A Django boilerplate project allowing you to discover the Montréal murals!*

.. image:: https://raw.githubusercontent.com/ellmetha/mtlmurals/master/_static/preview.png

The goal of this project is to showcase the use of the `Django <https://www.djangoproject.com/>`_
web framework alongside the `ReactJS <https://facebook.github.io/react/>`_ library.

.. contents:: Table of Contents
    :local:

Requirements
============

Python 3.6+, Django 1.10.

Installation
============

You can install the project locally using the following commands:

.. code-block:: shell

  $ git clone https://github.com/ellmetha/mtlmurals && cd mtlmurals
  $ export PYTHONPATH:$PWD:$PYTHONPATH
  $ python3.6 -m venv ./env && . ./env/bin/activate
  $ pip install -r requirements-main.txt
  $ pip install -r requirements-dev.txt
  $ cp .env.json.example .env.json     # Initializes the environment settings
  $ python manage.py migrate

You can now download the `dataset containing the list of subventioned murals <http://donnees.ville.montreal.qc.ca/dataset/murales>`_
(select the ``geojson`` version of the dataset). Put it somewhere on your system and then run the
following command in order to import the data into the Django application:

.. code-block:: shell

  $ python manage.py import_murals /path/to/murales.json

*Alright!* Now all you have to do is to launch the development server using:

.. code-block:: shell

  $ python manage.py runserver

Credits
=======

The data used by this project come from the `Open data catalogue <http://donnees.ville.montreal.qc.ca/>`_
provided by the City of Montréal.

License
=======

MIT. See ``LICENSE`` for more details.
