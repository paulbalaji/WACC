import subprocess
import os
from glob import glob
from multiprocessing import Pool

n_threads = 8

def run_invalid_sematics(fname): 
    exit_code = (subprocess.call("./compile " + fname + " silence", shell=True))
    if exit_code != 200:
        print "Failed: " + fname
        return False
    else:
        return True
def run_invalid_syntax(fname): 
    exit_code =  (subprocess.call("./compile " + fname + " silence", shell=True))
    if exit_code != 100:
        print "Failed: " + fname
        return False
    else:
        return True
def run_valid(fname): 
    exit_code =  (subprocess.call("./compile " + fname , shell=True))
    if exit_code != 0:
        print "Failed: " + fname
        return False
    else:
        return True

if __name__ == '__main__':
    #os.system("./build.sh")   
    valid_files = [y for x in os.walk('tests/valid') for y in glob(os.path.join(x[0], '*.wacc'))]
    invalid_files_semantics = [y for x in os.walk('tests/invalid/semanticErr') for y in glob(os.path.join(x[0], '*.wacc'))]
    invalid_files_syntax = [y for x in os.walk('tests/invalid/syntaxErr') for y in glob(os.path.join(x[0], '*.wacc'))]
    p = Pool(n_threads)
    print "Invalid semantics tests : " + str(sum(p.map(run_invalid_sematics, invalid_files_semantics))) + "/" + str(len(invalid_files_semantics))
    print "Invalid syntax tests : " + str(sum(p.map(run_invalid_syntax, invalid_files_syntax))) + "/" + str(len(invalid_files_syntax))
    print "Valid tests : " + str(sum(p.map(run_valid, valid_files))) + "/" + str(len(valid_files))