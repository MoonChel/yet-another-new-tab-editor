.PHONY: build_zip build zip

build_zip: build zip

build:
	yarn build

zip:
	zip -r app.zip dist/*

clean:
	rm -fr dist app.zip
