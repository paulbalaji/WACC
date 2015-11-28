import NodeType = require('../frontend/NodeType');
import CodeGenerator = require('./CodeGenerator');

export function generateCode(ast, programInfo) {
    /* 
        visit the AST using the code generator
    */
    var codeGenerator = new CodeGenerator.CodeGenerator(programInfo);
    var code = ast.visit(codeGenerator);
    return code.join('\n');
};