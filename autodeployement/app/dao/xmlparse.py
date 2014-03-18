#!/usr/bin/python
#
# Project : Deployement Automatisation
# Author : MRH
# File : xmlparse class file

import sys, getopt
import os
import subprocess
import logging

from xml.dom import minidom


class xmlparse:
    
    _fileName = None
    _docElement = None
    
    def __init__(self,  fileName):
        
        self._fileName = fileName      
        
        try:
            doc = minidom.parse("conf/"+fileName)
            root = doc.documentElement
            self._docElement = root

        except Exception, e:
            logging.critical("Parssing xml file error "+str(e))
            logging.info("Exit program")
            sys.exit(2)
    
    def getDocElement(self):        
        return self._docElement
    
    def findTag(self,  tagName,  attributName):
        for elementArchive in self._docElement.getElementsByTagName(tagName):
              return elementArchive.getAttribute(attributName)
                 
        logging.warning("Tag name "+tagName+" hasn't attribute "+attributName)
        return 0
