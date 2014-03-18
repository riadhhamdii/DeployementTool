#!/usr/bin/python
#
# Project : Deployement Automatisation
# Author : MRH
# File : intiopts class file

import sys, os, getopt
import logging

sys.path.append("dao")
from xmlparse import *

class initopts:
    
    _archiveName = None
    _commandName = None
    _clusterName = None
    _versionArchive = None         
    
    def __init__(self):
        self._archiveName = None
        self._commandName = None
        self._clusterName = None
    
    def usage(self):
        logging.error("Usage autodeploy -a archive -t action:checkout|prepare|deploy|finalize|rollback [-v version] [-c cluster]")
        logging.info("Example:autodeploy -a s7 -v 201211301153 -t deploy -c ordohost")
        sys.exit(2)

    def getArchiveName(self):
        return self._archiveName
        
    def getCommandName(self):
        return self._commandName

    def getClusterName(self):
        return self._clusterName

    def getVersionArchive(self):
        return self._versionArchive

    def checkOpts(self):
        # Define program arguments
        try:
            opts, args = getopt.getopt(sys.argv[1:], "a:v:t:c:h", ["help", "archive=", "version=", "action=", "cluster="])
        except getopt.GetoptError, err:
            self.usage()
            
        # Checking & parsing arguments
        for o, a in opts:
            if o in ("-h", "--help"):
                self.usage()
            elif o in ("-a", "--archive"):
                self._archiveName = a
            elif o in ("-v", "--version"):
                self._versionArchive = a                
            elif o in ("-t", "--action"):
                self._commandName = a
            elif o in ("-c", "--cluster"):
                self._clusterName = a

        # Archvie, version & commande are required
        if self._archiveName == None:
            self.usage()           
        if self._commandName == None:
            self.usage()
        else:
            # Commande argument should be a checkout or prepare or deployor finalize or rollback
            if self._commandName != "checkout" and self._commandName != "prepare" and self._commandName != "deploy" and self._commandName != "finalize" and self._commandName != "rollback":
                self.usage()
            if (self._commandName == "deploy" or self._commandName == "rollback") and self._versionArchive == None:
                self.usage() 
    
	def getXmlDocument(self, confFileName):
	
	    # Parsing xml file configuration            
		xmlParsing = xmlparse(confFileName)
		docElement = xmlParsing.getDocElement()
		
		return docElement
                
