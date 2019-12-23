
default: build

install:
	npm install

build:
	#elm make src/elm/* --output src/static/elm.js
	npm run build 

build_hot:
	npm run client

run:
	npm run start # == npm start

clean:
	rm -rf dist/

clean_all: clean
	rm -rf node_modules
	rm -rf elm-stuff

