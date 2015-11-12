PEGJS = ./node_modules/pegjs/bin/pegjs
TSC = ./node_modules/tsc/bin/tsc
TSC_FLAGS = --module commonjs

default: dist/compiler.js

dist/compiler.js: dist/frontend/frontend.js
	@$(TSC) $(TSC_FLAGS) src/compiler.ts --outDir dist

dist/frontend/frontend.js: dist/frontend/grammar/grammar.js
	@echo "Generating Parser..."
	@$(TSC) $(TSC_FLAGS) src/frontend/frontend.ts --outDir dist/frontend

dist/frontend/grammar/grammar.js: src/frontend/grammar/grammar.ts
	@echo "Compiling Grammar to JavaScript..."
	@$(TSC) $(TSC_FLAGS) src/frontend/grammar/grammar.ts --outDir dist/frontend

src/frontend/grammar/grammar.ts: src/frontend/grammar/grammar.pegjs
	@echo "Compiling Grammar to TypeScript"
	@$(PEGJS) src/frontend/grammar/grammar.pegjs src/frontend/grammar/grammar.ts

test: Parser
	python ./runTests.py

preview: dist/compiler.js
	node dist/compiler.js input.wacc error verbose

clean:
	@echo "Removing all generated files..."
	@rm -r -f dist
	@rm src/frontend/grammar/grammar.ts
	@mkdir dist
rebuild: clean all