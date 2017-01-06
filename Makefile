.PHONY: install upgrade lint coverage travis docs

install:
	pip install -r requirements-dev.txt
	pip install -r requirements-main.txt

upgrade:
	pip install -r requirements-dev.txt -U
	pip install -r requirements-main.txt -U

lint:
	flake8

isort:
	isort --check-only --recursive --diff mtlmurals tests

coverage:
	py.test --cov-report term-missing --cov mtlmurals

spec:
	py.test --spec -p no:sugar
