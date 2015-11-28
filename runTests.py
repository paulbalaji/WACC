import subprocess
import os, sys
import time
from glob import glob
from multiprocessing import Pool

n_threads = 8
SEMANTICS_ERROR_CODE = 200
SYNTAX_ERROR_CODE = 100
SUCCESS_CODE = 0

def compare_files(ours, ref):
    fp_ours = open(ours, "r")
    
    ours_lines = filter(lambda l : not l.isspace(), fp_ours.readlines())
    ours_lines = map(lambda l: l.strip(), ours_lines)
    fp_ours.close()
    fp_ref = open(ref, "r")
    ref_lines = filter(lambda l : not l.isspace(), fp_ref.readlines())
    ref_lines = map(lambda l: l.strip(), ref_lines)

    fp_ref.close()
    correct = True
    for i, l in enumerate(ref_lines):
        if i >= len(ours_lines):
            print "Fail in: " + ref 
            print "Not enough lines in ours"
            print "Rest of ref:" + str(ref_lines[i:])
            correct = False
            break
        if l != ours_lines[i]:
            print "Fail in: " + ref 
            print "    Ours: " + ours_lines[i]
            print "    Ref : " + l
            correct =  False
    return correct



def run_invalid_sematics(fname): 
    exit_code = (subprocess.call("./compile " + fname + " silence", shell=True))
    if exit_code != SEMANTICS_ERROR_CODE:
        print "Failed: " + fname
        return False
    else:
        return True
def run_invalid_syntax(fname): 
    exit_code =  (subprocess.call("./compile " + fname + " silence", shell=True))
    if exit_code != SYNTAX_ERROR_CODE:
        print "Failed: " + fname
        return False
    else:
        return True
def run_valid(fname): 
    exit_code =  (subprocess.call("./compile " + fname  + " > dist/test.out", shell=True))

    if exit_code != SUCCESS_CODE:
        print "Failed: " + fname
        return False
    else:
        ref = fname.replace("valid", "reference").replace("wacc", "s")
        return compare_files("dist/test.out", ref)
        return True

if __name__ == '__main__':
    t = time.time()
    if len(sys.argv) > 1:
        valid_files = sys.argv[1:]
    else:
        valid_files = [y for x in os.walk('tests/valid') for y in glob(os.path.join(x[0], '*.wacc'))]
    #invalid_files_semantics = [y for x in os.walk('tests/invalid/semanticErr') for y in glob(os.path.join(x[0], '*.wacc'))]
    #invalid_files_syntax = [y for x in os.walk('tests/invalid/syntaxErr') for y in glob(os.path.join(x[0], '*.wacc'))]
    p = Pool(n_threads)
    #print "Invalid semantics tests : " + str(sum(p.map(run_invalid_sematics, invalid_files_semantics))) + "/" + str(len(invalid_files_semantics))
    #print "Invalid syntax tests : " + str(sum(p.map(run_invalid_syntax, invalid_files_syntax))) + "/" + str(len(invalid_files_syntax))
    print "Valid tests : " + str(sum(p.map(run_valid, valid_files))) + "/" + str(len(valid_files))
    print "Tests took " + str(time.time() - t) + "s to run."