
default: build

install:
	npm install

build:
	npm run build 

elm:
	elm make src/elm/* --output src/static/elm.js

build_hot:
	npm run client

run:
	npm run start # == npm start

clean:
	rm -rf dist/

clean_all: clean
	rm -rf node_modules
	rm -rf elm-stuff

