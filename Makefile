.PHONY: clean

node_modules:
	npm install

dist: node_modules
	npm run build

clean:
	rm -rf node_modules
	rm -rf dist
