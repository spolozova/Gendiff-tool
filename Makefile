install: install-deps

run:
	bin/gendiff.js 10

install-deps:
	npm ci

test:
	npm test

test-coverage:
	npx jest --coverage
	
lint:
	npx eslint .
