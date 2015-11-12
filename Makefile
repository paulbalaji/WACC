PEGJS = ./node_modules/pegjs/bin/pegjs
TSC = ./node_modules/tsc/bin/tsc
TSC_FLAGS = --module commonjs

default: dist/parser.js

preview: dist/parser.js
	node dist/parser.js input.wacc error verbose

dist/parser.js: dist/grammar/grammar.js
	@echo "Generating Parser..."
	@$(TSC) $(TSC_FLAGS) src/parser.ts --outDir dist

dist/grammar/grammar.js: src/grammar/grammar.ts
	@echo "Compiling Grammar to JavaScript..."
	@$(TSC) $(TSC_FLAGS) src/grammar/grammar.ts --outDir dist

src/grammar/grammar.ts: src/grammar/grammar.pegjs
	@echo "Compiling Grammar to TypeScript"
	@$(PEGJS) src/grammar/grammar.pegjs src/grammar/grammar.ts

test: Parser
	python ./runTests.py

clean:
	@echo "Removing all generated files..."
	@rm -r -f dist
	@rm src/grammar/grammar.ts
	@mkdir dist


rebuild: clean all