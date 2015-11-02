
PEGJS = ./node_modules/pegjs/bin/pegjs
TSC = ./node_modules/tsc/bin/tsc
TSC_FLAGS = --module commonjs

default:
	@echo "Making Grammar..."
	@$(PEGJS) grammar/grammar.pegjs grammar/grammar.ts
	@$(TSC) $(TSC_FLAGS) grammar/grammar.ts
	@echo "Generating Parser..."
	@$(TSC) $(TSC_FLAGS) parser.ts

clean:
	@echo "Removing all generated files..."
	@rm *.js grammar/grammar.ts