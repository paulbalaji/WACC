#!/usr/bin/python

import sys, getopt
import paramiko
from scp import SCPClient
import credentials

def copy_to_remote(ssh_connect, filename):
	with SCPClient(ssh.get_transport()) as scp:
		scp.put(filename, filename)

def connect_and_execute(f):
	try:
		ssh = paramiko.SSHClient()
		ssh.load_system_host_keys() 
		ssh.connect("shell2.doc.ic.ac.uk", username=credentials.username, password=credentials.password)
		copy_to_remote(ssh, f)
	finally:
		ssh.close()

def main(argv):

	with open('test.s', 'r') as f:
		f.write(subprocess.check_output(["./compile", argv[0]]))





	
	

if __name__ == "__main__":
   main(sys.argv[1:])







ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command("ls -a")
print ssh_stdout.readlines()

