import glob
import os
files = glob.glob('valid/*.wacc')
for f in files:
	#print "Executing >>>>>>>> " + f
	os.system("node parser.js " + f)

files = glob.glob('invalid/*.wacc')
for f in files:
	#print "Executing >>>>>>>> " + f
	os.system("node parser.js " + f + " errorFlag")