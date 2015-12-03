function Reg(regName) {
	var reg: any = {};
	reg.name = regName;
    reg.toString = function() {
        return reg.name;
    }
	return reg;
}

function RegN(n) {
	return Reg('r' + n);
}

export var R0 = RegN(0);
export var R1 = RegN(1);
export var R2 = RegN(2);
export var R3 = RegN(3);
export var R4 = RegN(4);
export var R5 = RegN(5);
export var R6 = RegN(6);
export var R7 = RegN(7);
export var R8 = RegN(8);
export var R9 = RegN(9);
export var R10 = RegN(10);
export var R11 = RegN(11);
export var R12 = RegN(12);
export var R13 = RegN(13);
export var R14 = RegN(14);
export var R15 = RegN(15);

export var SP = Reg('sp');
export var PC = Reg('pc');
export var LR = Reg('lr')
