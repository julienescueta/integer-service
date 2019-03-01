clean:
	rm -rf build/
	# docker volume rm -f integer-service_db-data

build:
	rsync -ar --exclude='.git/' --exclude='node_modules/' * build/
	docker build -f build/Dockerfile -t julienescueta/identifier-service .

push:
	docker push julienescueta/identifier-service
