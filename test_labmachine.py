#!/usr/bin/python

import sys, getopt
import paramiko
from scp import SCPClient
import subprocess
import credentials
import os
import atexit

TEMP_FNAME = "tmp.s"

class MySSH:

    def __init__(self):
        client = paramiko.SSHClient()
        client.load_system_host_keys()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        client.connect("192.168.1.24", username=credentials.username, password=credentials.password)
        atexit.register(client.close)
        self.client = client

    def copy_to_remote(self, filename):
        with SCPClient(self.client.get_transport()) as scp:
            scp.put(filename, filename)

    def call(self, command):
        stdin,stdout,stderr = self.client.exec_command(command)
        sshdata = stdout.readlines()
        for line in sshdata:
            print(line)
        sshdata = stderr.readlines()
        for line in sshdata:
            print(line)

def connect_and_execute(f):
        ssh = MySSH()
        ssh.copy_to_remote(f)
        ssh.call('arm-linux-gnueabi-gcc -o tmp_exec -mcpu=arm1176jzf-s -mtune=arm1176jzf-s ' + f)
        ssh.call('qemu-arm -L /usr/arm-linux-gnueabi/ tmp_exec')

def main(argv):

    connect_and_execute(argv[0])

if __name__ == "__main__":
   main(sys.argv[1:])
