PEGJS = ./node_modules/pegjs/bin/pegjs
TSC = ./node_modules/tsc/bin/tsc
TSC_FLAGS = --module commonjs

default: Parser

preview: Parser
	node parser.js input.wacc error verbose

Parser: grammar/grammar.js
	@echo "Generating Parser..."
	@$(TSC) $(TSC_FLAGS) parser.ts

grammar/grammar.ts: grammar/grammar.pegjs
	@echo "Compiling Grammar to TypeScript"
	@$(PEGJS) grammar/grammar.pegjs grammar/grammar.ts

grammar/grammar.js: grammar/grammar.ts
	@echo "Compiling Grammar to JavaScript..."
	@$(TSC) $(TSC_FLAGS) grammar/grammar.ts

parser.js: parser.ts grammar/grammar.js
	@echo "Compiling Parser to JavaScript..."
	@$(TSC) $(TSC_FLAGS) parser.ts

all:
	@echo "Compiling PEGJS Grammar..."
	@$(PEGJS) grammar/grammar.pegjs grammar/grammar.ts
	@echo "Compiling TypeScript Grammar to JavaScript..."
	@$(TSC) $(TSC_FLAGS) grammar/grammar.ts
	@echo "Generating JavaScript Parser..."
	@$(TSC) $(TSC_FLAGS) parser.ts

test: Parser
	python ./runTests.py

clean:
	@echo "Removing all generated files..."
	@rm *.js grammar/grammar.js

rebuild: clean all