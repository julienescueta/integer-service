clean:
	rm -rf build/

build:
	rsync -ar --exclude='.git/' --exclude='node_modules/' * build/
	docker build -f build/Dockerfile -t identifier-service .
