> /tmp/newfile;
tsc grammarHeader.ts;

echo "{" > /tmp/newfile;
cat grammarHeader.js >> /tmp/newfile;
echo "}" >> /tmp/newfile;

cat grammarBody.pegjs >> /tmp/newfile;
cp /tmp/newfile grammar.pegjs;
pegjs grammar.pegjs