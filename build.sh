> grammar/grammar.pegjs;
cat node.d.ts > /tmp/node.d.ts;

cat NodeType.ts > /tmp/grammarHeaderComplete.ts
cat grammar/grammarHeader.ts >> /tmp/grammarHeaderComplete.ts
tsc /tmp/grammarHeaderComplete.ts

echo "{" > grammar/grammar.pegjs;
cat /tmp/grammarHeaderComplete.js >> grammar/grammar.pegjs
echo "}" >> grammar/grammar.pegjs;

cat grammar/grammarBody.pegjs >> grammar/grammar.pegjs;
pegjs grammar/grammar.pegjs






# Append types TS into grammarHeaderComplete.ts
# Append grammarHeader into grammarHeaderComplete.ts
# Compile grammarHeaderComplete.ts into grammarHeaderComplete.js
# Append a { into grammar.pegjs
# Append grammarHeaderComplete.js into grammar.pegjs
# Append a } into grammar.pegjs

#Append grammarBody.pegjs into grammar.pegjs
#pegjs grammar.pegjs