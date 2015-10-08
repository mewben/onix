#
# Makefile to perform live code reloading after changes to .go
#
# you must install fswatch (OS X: `brew install fswatch`)
#
# To start live reloading run the following command:
# $ make serve
#


# binary name to kill/restart
PROG = onix
BINDATA_PATHS = ...

# targets not associated with files
.PHONY: dependencies default build test coverage clean kill restart serve

# check we have a couple of dependencies
dependencies:
	@command -v fswatch --version >/dev/null 2>&1 || { printf >$2 "fswatch is not installed.\n"; exit 1;}

# default targets to run when only running `make`
default: dependencies test

# clean up
clean:
	go clean

# run formatting tool and build
build: dependencies clean
	go fmt
	go build

# run unit tests with code coverage
test: dependencies
	go test -cover

# generate code coverage report
coverage: test
	go test -coverprofile=.coverage.out
	go tool cover -html=.coverage.out

# attempt to kill running server
kill:
	@killall -9 $(PROG) 2>/dev/null || true

# attempt to build and start server
restart:
	@make kill
	@make build; (if [ "$$?" -eq 0 ]; then (./${PROG} &); fi)

# watch .go files for changes then recompile & try to start server
# will also kill server after ctrl+c
serve: dependencies
	@make restart
	@fswatch -or ./*.go ./**/*.go ./public/* | xargs -n1 -I{} make restart || make kill