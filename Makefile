install: install-deps

install-deps:
	npm ci

test:
	npx -n --experimental-vm-modules jest

test-coverage:
	npx -n --experimental-vm-modules jest --coverage

lint:
	npx eslint .
