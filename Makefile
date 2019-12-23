
all:
	npm install
	elm make src/elm/* --output src/static/elm.js
	npm run # or npm start

elm:
	elm make src/elm/* --output src/static/elm.js

test:
	elm reactor

clean: clean_elm clean_node

clean_node:
	rm -rf node_modules

clean_elm:
	# can safeli delete elm-stuff
	rm -f elm.js

