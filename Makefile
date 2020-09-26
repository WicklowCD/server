test:
	pytest tests/

cov:
	pytest -v --cov-report term-missing --cov=api tests/

install:
	pipenv install

format:
	black .
