test:
	pytest tests/

cov:
	pytest -v --cov-report term-missing --cov=app tests/

install:
	pipenv install

format:
	black .
