#!/usr/bin/python
#
#  MRH
#
# File : Class client for Fabric api


from __future__ import with_statement
from fabric.api import *
from fabric.contrib.console import confirm
from fabric.state import connections
import os,  sys

sys.path.append("dao")
from xmlparse import *



class FabricSupport:
    
    _userName = None
    _password = None
    _port = None
    _hostName = None
    _keyFilename = None    
    
    def __init__ (self, userName,  password,  port,  hostName,  keyFilename):
        self._userName = userName
        self._password = password
        self._port = port
        self._hostName = hostName
        self._keyFilename = keyFilename
        
        # Parsing xml file configuration            
        xmlParsing = xmlparse("source.xml")
        docElement = xmlParsing.getDocElement()            
       
        #  Get hudson configuration parameters
        deployConfSSH = docElement.getElementsByTagName("ssh")[0]
        sshKey = deployConfSSH.getAttribute("key")         
        self._keyFilename = sshKey

    # Gettters & Setters    
    def getUserName(self):
        return self._userName

    def setUserName(self, userName):
        self._userName = userName

    def getPassword(self):
        return self._password

    def setPassword(self, password):
        self._password = password

    def getPort(self):
        return self._port

    def setPort(self, port):
        self._port = port
        
    def getHostName(self):
        return self._hostName

    def setHostName(self, hostName):
        self._hostName = hostName
        
    def getKeyFilename(self):
        return self._keyFilename

    def setKeyFilename(self, keyFilename):
        self._keyFilename = keyFilename        
        
    # Fabric methods
    def local(self,  command):   
         result = local(command, capture=True)
         return result

    def run(self, command):
        env.user = self._userName
        env.password = self._password
        env.host_string = self._hostName
        env.port = self._port        
        env.key_filename = [self._keyFilename]
        # warn, instead of abort, when commands fail
        env.warn_only = True
        
#        # local key files
#        env.key_filename = ["/path/to/keyfile"]        
#        env.key_filename = [
#            '%s/.keys/key1.pem' % HOME,
#            '%s/.keys/key2.pem' % HOME,
#            '%s/.keys/key3.pem' % HOME,
#            '%s/.keys/key4.pem' % HOME,
#        ]

#        output = run('ls non_existent_file')
#        print 'output:', output
#        print 'failed:', output.failed
#        print 'return_code:', output.return_code
#           env.abort_on_prompts = False
#            env.reject_unknown_hosts = True         # reject unknown hosts
#            env.disable_known_hosts = True          # do not load user known_hosts file
#            env.user = 'username'                   # username to use when connecting to remote hosts
#            env.password = 'mypassword'             # password for use with authentication and/or sudo
#            env.hosts = ['host1.com', 'host2.com']  # comma-separated list of hosts to operate on
#            env.roles = ['web']                     # comma-separated list of roles to operate on
#            env.key_filename = 'id_rsa'             # path to SSH private key file. May be repeated.
#            env.fabfile = '../myfabfile.py'         # name of fabfile to load, e.g. 'fabfile.py' or '../other.py'
#            env.shell = '/bin/sh'                   # specify a new shell, defaults to '/bin/bash -l -c'
#            env.rcfile = 'myfabconfig'              # specify location of config file to use
#            env.hide = ['everything']               # comma-separated list of output levels to hide
#            env.show = ['debug']                    # comma-separated list of output levels to show
#            env.version = '1.0'
#            env.sudo_prompt = 'sudo password:'
#            env.use_shell = False
#            env.roledefs = {'web': ['www1', 'www2', 'www3'],
#                            'dns': ['ns1', 'ns2'],
#                            }
#            env.cwd = 'mydir'
        output = run(command)
        return output
        
    def put(self, localPath, remotePath):
        put(localPath, remotePath)

    def get(self, remotePath):
        get(remotePath)
        
    def sudo(self, command):
        sudo(command)

    def disconnect(self):
        for key in connections.keys():
            connections[key].close()
            del connections[key]
            
