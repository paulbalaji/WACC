PEGJS = ./node_modules/pegjs/bin/pegjs 
TSC = ./node_modules/tsc/bin/tsc
TSC_FLAGS = --module commonjs

default: pre-build compiler

pre-build:
	@sudo ln -s /usr/bin/nodejs  /usr/bin/node

compiler: frontend backend
	@$(TSC) $(TSC_FLAGS) src/compiler.ts --outDir dist

frontend: dist/frontend/grammar/grammar.js
	@echo "Compiling Front End..."
	@$(TSC) $(TSC_FLAGS) src/frontend/frontend.ts --outDir dist/frontend

backend: src/backend/CodeGenerator.ts
	@echo "Compiling Back End..."
	@$(TSC) $(TSC_FLAGS) src/backend/backend.ts --outDir dist

dist/frontend/grammar/grammar.js: src/frontend/grammar/grammar.ts
	@echo "Compiling Grammar to JavaScript..."
	@$(TSC) $(TSC_FLAGS) src/frontend/grammar/grammar.ts --outDir dist/frontend

src/frontend/grammar/grammar.ts: src/frontend/grammar/grammar.pegjs
	@echo "Compiling Grammar to TypeScript..."
	@$(PEGJS) src/frontend/grammar/grammar.pegjs src/frontend/grammar/grammar.ts

test: compiler
	python ./runTests.py

preview: compiler
	@./compile input.wacc

clean:
	@echo "Removing all generated files..."
	@rm -r -f dist
	@rm src/frontend/grammar/grammar.ts
	
rebuild: clean compiler
