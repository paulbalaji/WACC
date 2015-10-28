import os
from glob import glob
from multiprocessing import Pool
n_threads = 4

def runValid(fname):
    os.system("node parser.js " + fname + " success")
def runInvalid(fname): 
	os.system("node parser.js " + fname + " error")

if __name__ == '__main__':
	valid_files = [y for x in os.walk('valid') for y in glob(os.path.join(x[0], '*.wacc'))]
	invalid_files = [y for x in os.walk('invalid') for y in glob(os.path.join(x[0], '*.wacc'))]

    p = Pool(n_threads)
    p.map(runValid, valid_files)
    p.map(runInvalid, invalid_files)
