#!/usr/bin/python
#
# Project : Deployement Automatisation
# Author : MRH
# File : Archive class file

import datetime
import os,  sys
import logging
import jenkins
import time

sys.path.append("dao")

from jenkinsapi import api
from FabricSupport import *
from xmlparse import *
from xml.dom import minidom
from time import gmtime, strftime

class archive(): 
    
        _idArchive = None
        _nomArchive = None
        _repertoireArchive = None
        _droitsArchive = None
        _descriptionArchive = None
        _sourceArchive = None
        _mepArchive = None
        _actionsArchive = None
        _clustersArchive = None
        _versionArchive = None        
        _fabricRunCommand = None

        # Constructor
        def __init__(self, idArchive, nomArchive, repertoireArchive, droitsArchive, descriptionArchive, sourceArchive, mepArchive, actionsArchive,  clustersArchive,  versionArchive):            
            self._idArchive = idArchive
            self._nomArchive = nomArchive
            self._repertoireArchive = repertoireArchive
            self._droitsArchive = droitsArchive
            self._descriptionArchive = descriptionArchive
            self._sourceArchive = sourceArchive
            self._mepArchive = mepArchive
            self._actionsArchive = actionsArchive
            self._clustersArchive = clustersArchive
            self._versionArchive = versionArchive            
            self._fabricRunCommand = FabricSupport(None,  None,  None,  None,  None)
            self._fabricRunCommand.setPort(22)            
        
        def __del__(self):
            return 1
        
        # Gettters & Setters
        def getIdArchive(self):
            return self._idArchive

        def setIdArchive(self, idArchive):
            self._idArchive = idArchive  
       
        def getNomArchive(self):
            return self._nomArchive

        def setNomArchive(self, nomArchive):
            self._nomArchive = nomArchive 
         
        def getRepertoireArchive(self):
            return self._repertoireArchive

        def setRepertoireArchive(self, repertoireArchive):
            self._repertoireArchive = repertoireArchive 
           
        def getSourceArchive(self):
            return self._sourceArchive

        def setSourceArchive(self, sourceArchive):
            self._sourceArchive = sourceArchive 
 
        def getMepArchive(self):
            return self._mepArchive

        def setMepArchive(self, mepArchive):
            self._mepArchive = mepArchive
          
        def getActionsArchive(self):
            return self._actionsArchive

        def setActionsArchive(self, actionsArchive):
            self._actionsArchive = actionsArchive  
  
        def getClustersArchive(self):
            return self._clustersArchive

        def setClustersArchive(self, clustersArchive):
            self._clustersArchive = clustersArchive
            
        def getVersionArchive(self):
            return self._versionArchive

        def setVersionArchive(self, versionArchive):
            self._versionArchive = versionArchive            
            
        def getFabricRunCommand(self):
            return self._fabricRunCommand

        def setFabricRunCommand(self, fabricRunCommand):
            self._fabricRunCommand = fabricRunCommand


        # Build from Hudson
        def checkoutArchive(self):
 
            # Parsing xml file configuration            
            xmlParsing = xmlparse("source.xml")
            docElement = xmlParsing.getDocElement()            
           
            #  Get hudson configuration parameters
            deployConfHudson = docElement.getElementsByTagName("hudson")[0]
            hudsonUrl = deployConfHudson.getAttribute("url")            
            hudsonUserName = deployConfHudson.getAttribute("username")
            hudsonPassword = deployConfHudson.getAttribute("password")            

            if self._sourceArchive == "hudson":                                    
#                    jenkins = api.Jenkins("https://ci.edt02.net/api/python")
#                    print len(jenkins.get_jobs_list())
#                    for i in jenkins.get_auth():
#                        print i
#                    return 0
#                    awesome_job = jenkins.get_job('testtest')
#                    awesome_build = awesome_job.get_last_build()
#                    if awesome_build.is_good():
#                        print "The build passed successfully"
#                    else:
#                        print awesome_build.get_status()
#                
#                    return 0
                
                    # Instanciate Jenkins Object
                    jenkinsObject = jenkins.Jenkins(hudsonUrl,  hudsonUserName,  hudsonPassword)
                    if jenkinsObject.job_exists("EMPAQUETAGE_scripts_v7_pour_consume"):
                        #Build archive
                        jenkinsObject.build_job("EMPAQUETAGE_scripts_v7_pour_consume")
                        logging.info("Build archive "+self._nomArchive+" successfully.")
                        return 1
                    else:
                        # No job found in hudson
                        logging.error("Job "+self._nomArchive+" not found.")
                        return 0
            else:
                    logging.warning("Please check source archive.")
                    return 0
            


        # Prepare archive
        def prepareArchive(self):
            
            # Parsing xml file configuration            
            xmlParsing = xmlparse("source.xml")
            docElement = xmlParsing.getDocElement()  
        
            #  Get release configuration parameters
            deployConfRelease = docElement.getElementsByTagName("path")[0]
            # RRD : remote release directory
            remoteReleasePath = deployConfRelease.getAttribute("release")
            
            # Check existing clusters
            if len(self._clustersArchive) == 0:
                logging.error("No clusters found.")
                return 0            
            
            # Loop for clusters
            for clusterGroup in self._clustersArchive:
                    logging.info("Cluster "+clusterGroup.getNomCluster())
                    self._fabricRunCommand.setUserName(clusterGroup.getUserNameCluster())

                    # Check existing machines
                    if len(clusterGroup.getMachinesInCluster()) == 0:
                        logging.error("No machines found in "+clusterGroup.getNomCluster()+".")
                        continue
                    
                    # Loop for all machines in clusters
                    for machineGroup in clusterGroup.getMachinesInCluster():
                            machineDestination = machineGroup.getNomMachine()
                            logging.info("Machine "+machineDestination)
                            self._fabricRunCommand.setHostName(machineGroup.getNomMachine())
                            
                            remoteArchivePath = self._repertoireArchive
                            remoteBackupArchivePath = remoteReleasePath                           
                           
                            # Checking existing remote release path
                            remoteBackupArchivePathTest = self._fabricRunCommand.run("if [ -e "+remoteBackupArchivePath+" ]; then echo 'remoteBackupArchivePathTestExist'; else echo 'remoteBackupArchivePathTestNotExist'; fi")

                            if remoteBackupArchivePathTest == "remoteBackupArchivePathTestNotExist":
                                logging.warning("Path "+remoteBackupArchivePath+" not found in "+machineDestination+".")
                                self._fabricRunCommand.run("mkdir "+remoteBackupArchivePath)
                                logging.warning("Creating release path "+remoteBackupArchivePath+" in "+machineDestination+".")
                            
                            # BEGIN save a backup archive
                            logging.info("Save a backup archive")
                            backupCmd = "cp -R "+remoteArchivePath+" "+remoteBackupArchivePath
                            self._fabricRunCommand.run(backupCmd)
                            
                            # Get current date
                            today = datetime.datetime.today()
                            dateAndTime = today.strftime("%Y%m%d%H%M")
                            
                            # Rename for new archive name                                
                            tarArchive = self._nomArchive+"."+dateAndTime+".tar.gz"
                            
                            # Tar archive & remove backup archive source                    
                            tarCmd = "cd "+remoteBackupArchivePath+"; tar -zcf "+tarArchive+" "+self._nomArchive+"; rm -rf "+self._nomArchive
                            self._fabricRunCommand.run(tarCmd)
                            
                            # Check if tar backup archive is successfully created
                            rollbackArchiveCommandTest = "if [ -f "+remoteBackupArchivePath+tarArchive+" ]; then echo 'rollbackArchiveTestExist'; else echo 'rollbackArchiveTestNotExist'; fi"
                            rollbackArchiveTest = self._fabricRunCommand.run(rollbackArchiveCommandTest)
                            
                            if rollbackArchiveTest == "rollbackArchiveTestNotExist":
                                logging.error("Archive "+tarArchive+" not found in "+machineDestination+".")
                                logging.warning("Ignore prepare in "+machineDestination+".")
                                return 0
                            # End save a backup archive
                            
                            logging.info("Saving archive successfully in "+machineDestination+".")
                            
                            # Check existing machines
                            if len(self._actionsArchive) == 0:
                                logging.warning("No actions found for "+self._nomArchive+".")
                                continue
                            
                            # Loop for all actions
                            for actionGroup in self._actionsArchive:                                        
                                    if actionGroup.getTypeAction() == "before":
                                            logging.info("Run "+actionGroup.getLabelAction()+" in "+machineDestination)
                                            self._fabricRunCommand.run(actionGroup.getCmdAction())
                                            
                            logging.info("Execute actions uccessfully in "+machineDestination+".")                
            return 1
                

        # Finalize archive
        def finalizeArchive(self):
            
                # Check existing clusters
                if len(self._clustersArchive) == 0:
                    logging.error("No clusters found.")
                    return 0
                
                # Loop for clusters
                for clusterGroup in self._clustersArchive:
                        logging.info("Cluster "+clusterGroup.getNomCluster())
                        self._fabricRunCommand.setUserName(clusterGroup.getUserNameCluster())

                        # Check existing machines
                        if len(clusterGroup.getMachinesInCluster()) == 0:
                            logging.error("No machines found in "+clusterGroup.getNomCluster()+".")
                            continue
                        
                        # Loop for all machines in clusters
                        for machineGroup in clusterGroup.getMachinesInCluster():
                                machineDestination = machineGroup.getNomMachine()
                                logging.info("Machine "+machineDestination)
                                self._fabricRunCommand.setHostName(machineGroup.getNomMachine())
                                
                                # Check existing machines
                                if len(self._actionsArchive) == 0:
                                    logging.warning("No actions found for "+self._nomArchive+".")
                                    continue                                
                                
                                # Loop for all actions                                
                                for actionGroup in self._actionsArchive:                                        
                                        if actionGroup.getTypeAction() == "after":
                                                logging.info("Run "+actionGroup.getLabelAction()+" in "+machineDestination)
                                                self._fabricRunCommand.run(actionGroup.getCmdAction())
                return 1


        # Deploy archive
        def deployArchive(self):
            
            # Parsing xml file configuration            
            xmlParsing = xmlparse("source.xml")
            docElement = xmlParsing.getDocElement() 
        
            #  Get release configuration parameters
            deployConfRelease = docElement.getElementsByTagName("path")[0]
            deployConfFTP = docElement.getElementsByTagName("ftp")[0]
            
            # Remote release directory
            remoteReleasePath = deployConfRelease.getAttribute("release")            
            # Remote deploy directory
            remoteDeployPath = deployConfRelease.getAttribute("deploy")            
            
            # FTP paramerters
            ftpHostname = deployConfFTP.getAttribute("hostname")
            ftpUsername = deployConfFTP.getAttribute("username")
            
           # Check existing clusters            
            if len(self._clustersArchive) == 0:
                logging.error("No clusters found.")
                return 0            
            
            # Loop for clusters
            for clusterGroup in self._clustersArchive:
                    logging.info("Cluster "+clusterGroup.getNomCluster())
                    self._fabricRunCommand.setUserName(clusterGroup.getUserNameCluster())
                    
                    # Check existing machines
                    if len(clusterGroup.getMachinesInCluster()) == 0:
                        logging.error("No machines found in "+clusterGroup.getNomCluster()+".")
                        continue                    
                    
                    # Loop for all machines in clusters
                    for machineGroup in clusterGroup.getMachinesInCluster():
                            machineDestination = machineGroup.getNomMachine()
                            logging.info("Machine "+machineDestination)
                            self._fabricRunCommand.setHostName(machineDestination)
                            
                            # Check existing rollback archive directory
                            remoteReleasePathTestCommand= "if [ -e "+remoteReleasePath+" ]; then echo 'remoteReleasePathTestExist'; else echo 'remoteReleasePathTestNotExist'; fi"
                            remoteReleasePathTest= self._fabricRunCommand.run(remoteReleasePathTestCommand)
                            if remoteReleasePathTest == "remoteReleasePathTestNotExist":
                                logging.error("Remote release diectory "+remoteReleasePath+" not found in "+machineDestination+".")
                                logging.warning("Ignore deployement in "+machineDestination+".")
                                continue
                            
                            # Check existing last backup archive
                            lastBackupArchiveTestCommand = "cd "+remoteReleasePath+"; ls -r "+self._nomArchive+"*.tar.gz | wc -l"
                            lastBackupArchive = self._fabricRunCommand.run(lastBackupArchiveTestCommand)
                            
                            if lastBackupArchive  == 0:
                                logging.error("No backup archive in remote release diectory "+remoteReleasePath+" in "+machineDestination+".")
                                logging.warning("Ignore deployement in "+machineDestination+".")
                                continue
                            
                            # Remote archvie path    
                            remoteArchivePath = self._repertoireArchive  
                                                            
                            # Get archive from ftp server
                            logging.info("Get archive to deploy from ftp server.")
                            
                            # Create remoteDeployPath if not exist
                            remoteDeployPathCommand = "if [ ! -e "+remoteDeployPath+" ]; then mkdir "+remoteDeployPath+"; fi"
                            self._fabricRunCommand.run(remoteDeployPathCommand)                            
                            
                            removeRemoteArchiveCommand = "cd "+remoteDeployPath+"; sftp "+ftpUsername+"@"+ftpHostname+":/home/"+self._nomArchive+"."+self._versionArchive+".tar.gz .;"
                            self._fabricRunCommand.run(removeRemoteArchiveCommand)

                            logging.info("Check size of archive to deploy.")
                            archiveToDeploy = self._nomArchive+"."+self._versionArchive+".tar.gz"
                            
                            removeRemoteArchiveTestSizeCommand= "cd "+remoteDeployPath+"; if [ -s "+archiveToDeploy+" ]; then echo 'deployArchiveSizeTestNotZero'; else echo 'deployArchiveSizeTestZero'; fi"
                            removeRemoteArchiveTestSize = self._fabricRunCommand.run(removeRemoteArchiveTestSizeCommand)

                            if removeRemoteArchiveTestSize == "deployArchiveSizeTestZero":
                                logging.error("Archive "+archiveToDeploy+" to deploy not found or is zero size in "+machineDestination+".")
                                logging.warning("Ignore deployement in "+machineDestination+".")
                                return 0

                            # Remove remote archive
                            logging.info("Remove remote archive.")
                            removeRemoteArchiveCommand = "rm -rf "+remoteArchivePath+"/*"
                            self._fabricRunCommand.run(removeRemoteArchiveCommand) 

                            # Untar & gunzip archive to deploy
                            logging.info("Deploying.")
                            tarDeployedArchiveCmd = "cd "+remoteDeployPath+"; tar -xzf "+archiveToDeploy+" -C "+remoteArchivePath+"/.; cd "+remoteArchivePath+"; rm -rf "+self._nomArchive+" "+archiveToDeploy
                            self._fabricRunCommand.run(tarDeployedArchiveCmd) 
                            
                            # Remove temporary deplo file
                            self._fabricRunCommand.run("rm -rf "+remoteDeployPath+"/*") 
                            logging.info("Deploy "+archiveToDeploy+" successfully in "+machineDestination+".")
                            
            return 1

        
        # Rollback archive
        def rollbackArchive(self):

            # Parsing xml file configuration            
            xmlParsing = xmlparse("source.xml")
            docElement = xmlParsing.getDocElement() 
        
            #  Get release configuration parameters
            deployConfRelease = docElement.getElementsByTagName("path")[0]
            # RRD : remote release directory
            remoteReleasePath = deployConfRelease.getAttribute("release")
            
            # Check existing clusters
            if len(self._clustersArchive) == 0:
                logging.error("No clusters found.")
                return 0
            
            # Loop for clusters
            for clusterGroup in self._clustersArchive:
                    logging.info("Cluster "+clusterGroup.getNomCluster())
                    self._fabricRunCommand.setUserName(clusterGroup.getUserNameCluster())
                    
                    # Check existing machines
                    if len(clusterGroup.getMachinesInCluster()) == 0:
                        logging.error("No machines found in "+clusterGroup.getNomCluster()+".")
                        continue
                        
                    # Loop for all machines in clusters
                    for machineGroup in clusterGroup.getMachinesInCluster():
                            machineDestination = machineGroup.getNomMachine()
                            logging.info("Machine "+machineDestination)
                            self._fabricRunCommand.setHostName(machineDestination)

                            # Check upload archive
                            remoteReleasePathTestCommand = "if [ -e "+remoteReleasePath+" ]; then echo 'remoteReleasePathTestExist'; else echo 'remoteReleasePathTestNotExist'; fi"
                            rollbackArchivePathTest = self._fabricRunCommand.run(remoteReleasePathTestCommand)
                            if rollbackArchivePathTest == "remoteReleasePathTestNotExist":
                                logging.error("Remote releases directory "+remoteReleasePath+" not found in "+machineDestination+".")
                                logging.warning("Ignore roolback in "+machineDestination+".")
                                continue
                            
                            # Get last backup archive
                            logging.info("Get version archive "+self._versionArchive+" in "+machineDestination)
                            lastBackupArchive = self._nomArchive+"."+self._versionArchive+".tar.gz"
                            
                            lastBackupArchiveCommand = "cd "+remoteReleasePath+"; ls -r "+lastBackupArchive+" | head -n 1"                            
                            lastBackupArchiveCommandResult = self._fabricRunCommand.run(lastBackupArchiveCommand)
                             
                            if lastBackupArchive != lastBackupArchiveCommandResult:
                                logging.warning("Version archive "+self._versionArchive+" not found in "+machineDestination)
                                continue
                             
                            # Remove remote archive
                            logging.info("Remove archive "+self._nomArchive+" in "+machineDestination)
                            removeArchiveCommand = "rm -rf "+self._repertoireArchive+"/*"
                            self._fabricRunCommand.run(removeArchiveCommand)                                
                            
                            # Restore backup archive
                            backupCommand = "cp -R "+remoteReleasePath+lastBackupArchive+" "+self._repertoireArchive+"/."
                            backupArchive = self._fabricRunCommand.run(backupCommand)

                            # Untar and unzip restore archive
                            unTarCmd = "cd "+self._repertoireArchive+"; tar -xzf "+lastBackupArchive+" -C ./.; mv "+self._nomArchive+"/* .; rm -rf "+self._nomArchive+" "+lastBackupArchive
                            self._fabricRunCommand.run(unTarCmd)
                            logging.info("Rollback archive "+self._nomArchive+" successfully in "+machineDestination+".")
                            
            return 1


