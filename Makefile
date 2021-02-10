install: install-deps

run:
	bin/gendiff.js 10

install-deps:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8
	
lint:
	npx eslint .
