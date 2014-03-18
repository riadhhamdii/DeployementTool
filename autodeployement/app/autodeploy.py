#!/usr/bin/python
#
# Project : Deployement Automatisation
# Author : MRH
# File : Main file

import sys, getopt
import os
import subprocess
import logging

sys.path.append("src")
sys.path.append("dao")

from xmlparse import *
from archive import *
from cluster import *
from action import *
from machine import *
from initopts import *

logging.basicConfig(format='%(asctime)s:[%(levelname)s]:%(message)s', datefmt='%Y-%m-%d %I:%M:%S', level=logging.DEBUG)

#  Entry point
if __name__ == '__main__':

    # Check arguments
    initOpt = initopts()
    initOpt.checkOpts()
    
    # Get list of arguments
    archiveName = initOpt.getArchiveName()
    commandName = initOpt.getCommandName()
    clusterNameEntry = initOpt.getClusterName()
    archiveVersion = initOpt.getVersionArchive()

	docElement = initOpt.getXmlDocument("archive.xml")()
    
    # Initialize archive object            
    archiveObject = None
    clustersArchive = list()

    # Get archive details
    for elementArchive in docElement.getElementsByTagName("archive"):
        if elementArchive.nodeType == elementArchive.ELEMENT_NODE:
            # Search the archive in argument
            if elementArchive.getAttribute("name") == archiveName:
                # Instanciate archive object
                archiveObject = archive(None, None, None, None, None, None, None , None,  None,  None)
                logging.info("Archive "+archiveName)
                
                nameArchive = elementArchive.getAttribute("name")
                dirArchive= elementArchive.getAttribute("dir")
                srcArchive= elementArchive.getAttribute("src")                

                archiveObject.setNomArchive(nameArchive) 
                archiveObject.setVersionArchive(archiveVersion)                
                archiveObject.setRepertoireArchive(dirArchive)
                archiveObject.setSourceArchive(srcArchive)
                
                # Get list of clusters
                for elementTarget in elementArchive.getElementsByTagName("target"):
                    # All clusters in argument
                    if clusterNameEntry is None:
                        clusterObject = cluster(None, None, None, None,  None)                        
                        clusterName = elementTarget.getAttribute("cluster")
                        clusterObject.setNomCluster(clusterName)                        
                        userNameCluster = elementTarget.getAttribute("username")
                        clusterObject.setUserNameCluster(userNameCluster)                       
                        
                        machinesInCluster = list()
                        # Get list of machines
                        for elementMachine in elementTarget.getElementsByTagName("machine"):
                            machineName = elementMachine.getAttribute("name")
                            machineObject = machine(None, None, None, None, None)
                            machineObject.setNomMachine(machineName)
                            machinesInCluster.append(machineObject)
                        clusterObject.setMachinesInCluster(machinesInCluster)
                        clustersArchive.append(clusterObject)
                    else:
                        # Cluster in argument
                        clusterName = elementTarget.getAttribute("cluster")
                        if clusterNameEntry == clusterName:
                            clusterObject = cluster(None, None, None, None, None)                            
                            clusterObject.setNomCluster(clusterName)                        
                            userNameCluster = elementTarget.getAttribute("username")
                            clusterObject.setUserNameCluster(userNameCluster)
                            
                            machinesInCluster = list()
                            # Get list of machines
                            for elementMachine in elementTarget.getElementsByTagName("machine"):
                                machineName = elementMachine.getAttribute("name")
                                machineObject = machine(None, None, None, None, None)
                                machineObject.setNomMachine(machineName)
                                machinesInCluster.append(machineObject)
                            clusterObject.setMachinesInCluster(machinesInCluster)
                            clustersArchive.append(clusterObject)
                            break                               
                    
                archiveObject.setClustersArchive(clustersArchive)
                        
                # Get list of actions
                actionsArchive = list()
                for elementAction in elementArchive.getElementsByTagName("action"):
                    actionObject = action(None, None, None, None,  None)                    
                    actionName = elementAction.getAttribute("name")
                    actionType = elementAction.getAttribute("type")
                    actionCmd = elementAction.getAttribute("cmd")                    
                    
                    actionObject.setLabelAction(actionName)                    
                    actionObject.setTypeAction(actionType)                    
                    actionObject.setCmdAction(actionCmd)                    
                    actionsArchive.append(actionObject)

                archiveObject.setActionsArchive(actionsArchive)
                break
     
    # Check if the archive in argument is found
    if archiveObject is None:
        logging.warning("Archive "+archiveName+" not found in configuration file.")
    if len(clustersArchive) == 0:
        logging.warning("No clusters found.") 
        sys.exit(2)        
    if archiveObject is not None:
        logging.info(commandName+" archive")
        if commandName == "checkout":
            # Checkout archive
            archiveObject.checkoutArchive()
        if commandName == "prepare":
            # Prepare archive
            archiveObject.prepareArchive()
        if commandName == "deploy":
            # Deploy archive
            archiveObject.deployArchive()
        if commandName == "finalize":
            # Finalize archive
            archiveObject.finalizeArchive()
        if commandName == "rollback":
            # Rollback archive   
            archiveObject.rollbackArchive()
            
        # Disconnect from all clusters
        logging.info("Disconnect from servers")
        archiveObject.getFabricRunCommand().disconnect()

        # Destroy Objects
        del archiveObject

    # Exit programm
    logging.info("Exit program")
    sys.exit(0)

