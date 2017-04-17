.PHONY: install lint isort coverage spec

install:
	pip install coverage pipenv
	pipenv lock
	pipenv install --dev

lint:
	pipenv run flake8

isort:
	pipenv run isort --check-only --recursive --diff mtlmurals tests

coverage:
	pipenv run py.test --cov-report term-missing --cov mtlmurals

spec:
	pipenv run py.test --spec -p no:sugar
