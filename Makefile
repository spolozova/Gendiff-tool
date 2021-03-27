install:
	npm install

run:
	bin/gendiff.js

install-deps:
	npm ci

test:
	npm test

test-coverage:
	npx jest --coverage --coverageProvider=v8

lint:
	npx eslint .

link: 
	npm link
