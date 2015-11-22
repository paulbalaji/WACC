import NodeType = require('../frontend/NodeType');
import CodeGenerator = require('./CodeGenerator');

export function generateCode(ast) {
    /* 
        visit the AST using the code generator
    */
    var codeGenerator = new CodeGenerator.CodeGenVisitor();
    ast.visit(codeGenerator);
};