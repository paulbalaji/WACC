> grammar.pegjs;
cat node.d.ts > /tmp/node.d.ts;


cat NodeType.ts > /tmp/grammarHeaderComplete.ts
cat grammarHeader.ts >> /tmp/grammarHeaderComplete.ts
tsc /tmp/grammarHeaderComplete.ts

echo "{" > grammar.pegjs;
cat /tmp/grammarHeaderComplete.js >> grammar.pegjs
echo "}" >> grammar.pegjs;

cat grammarBody.pegjs >> grammar.pegjs;
pegjs grammar.pegjs






# Append types TS into grammarHeaderComplete.ts
# Append grammarHeader into grammarHeaderComplete.ts
# Compile grammarHeaderComplete.ts into grammarHeaderComplete.js
# Append a { into grammar.pegjs
# Append grammarHeaderComplete.js into grammar.pegjs
# Append a } into grammar.pegjs

#Append grammarBody.pegjs into grammar.pegjs
#pegjs grammar.pegjs