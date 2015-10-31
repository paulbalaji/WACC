# > grammar/grammar.pegjs;
# cat node.d.ts > /tmp/node.d.ts;
# cat Constants.ts > /tmp/Constants.ts;


# cat NodeType.ts > /tmp/grammarHeaderComplete.ts
# cat grammar/grammarHeader.ts >> /tmp/grammarHeaderComplete.ts
# tsc --module commonjs /tmp/grammarHeaderComplete.ts

# echo "{" > grammar/grammar.pegjs;
# cat /tmp/grammarHeaderComplete.js >> grammar/grammar.pegjs
# echo "}" >> grammar/grammar.pegjs;

# cat grammar/grammarBody.pegjs >> grammar/grammar.pegjs;
# pegjs grammar/grammar.pegjs

./node_modules/pegjs/bin/pegjs grammar/grammar.pegjs grammar/grammar.ts
./node_modules/tsc/bin/tsc --module commonjs grammar/grammar.ts
./node_modules/tsc/bin/tsc --module commonjs parser.ts






# Append types TS into grammarHeaderComplete.ts
# Append grammarHeader into grammarHeaderComplete.ts
# Compile grammarHeaderComplete.ts into grammarHeaderComplete.js
# Append a { into grammar.pegjs
# Append grammarHeaderComplete.js into grammar.pegjs
# Append a } into grammar.pegjs

#Append grammarBody.pegjs into grammar.pegjs
#pegjs grammar.pegjs