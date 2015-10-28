import os
from glob import glob
from multiprocessing import Pool

n_threads = 8

def runValid(fname):
    os.system("node parser.js " + fname + " error")
def runInvalid(fname): 
    os.system("node parser.js " + fname + " success")

if __name__ == '__main__':
    os.system("./build.sh")   
    valid_files = [y for x in os.walk('valid') for y in glob(os.path.join(x[0], '*.wacc'))]
    invalid_files = [y for x in os.walk('invalid/syntaxErr') for y in glob(os.path.join(x[0], '*.wacc'))]

    p = Pool(n_threads)
    p.map(runValid, valid_files)
    p.map(runInvalid, invalid_files)
