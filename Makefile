default: build

build: public/index.html node_modules

clean:
	-rm -rf node_modules
	-rm -rf public
	-rm -rf frontend/node_modules
	-rm -rf frontend/build

run: node_modules public/index.html .env
	node .

.env:
	$(error .env must be created)

node_modules:
	npm install

public:
	mkdir public

frontend/node_modules:
	cd frontend ;	npm install

public/index.html: frontend/build/index.html public
	cd frontend ;	npm run copy

frontend/build/index.html: frontend/node_modules
	cd frontend ;	npm run build

.PHONY: run default clean build
