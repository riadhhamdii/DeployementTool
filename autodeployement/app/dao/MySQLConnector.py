#!/usr/bin/python
#
# Project : Deployement Automatisation
# Author : MRH
# File : MySQL Singleton Class


from xml.dom import minidom

import sys;
import os;
import string;
import base64;
import MySQLdb;
 

class MySQLConnector(object):
    
        _connection = None;
        _instance = None;
 
        def __init__(self):
                try:
                        if MySQLConnector._instance == None:
                                MySQLConnector._instance = self;
                                MySQLConnector._instance.connect();
                except Exception, e:
                        print "MySQL Error "+str(e);
 
        def instance(self):
                return MySQLConnector._instance;
 
        def get_connection(self):
                return MySQLConnector._connection;
 
        def connect(self):
                try:
                        doc = minidom.parse("conf/conf.xml")
                        root = doc.documentElement
                        conn = root.childNodes[1]
                        
                        dbhost = conn.getAttribute("hostname")
                        dblogin = conn.getAttribute("user")
                        dbpassword = conn.getAttribute("password")
                        dbname = conn.getAttribute("basename")
                        
                        MySQLConnector._connection = MySQLdb.connect(dbhost, dblogin, dbpassword, dbname);
                        # print "INFO: Database connection successfully established";
                except Exception, e:
                        print "ERROR: MySQL Connection Couldn't be created... Fatal Error! "+str(e);
                        sys.exit();
 
        def disconnect(self):
                try:
                        MySQLConnector._connection.close();
                except:
                        pass;#connection not open
 
        #returns escaped data for insertion into mysql
        def esc(self, esc):
                return MySQLdb.escape_string(str(esc));
 
        #query with no result returned
        def query(self, sql):
                cur = MySQLConnector._connection.cursor();
                return cur.execute(sql);
 
        def tryquery(self, sql):
                try:
                        cur = MySQLConnector._connection.cursor();
                        return cur.execute(sql);
                except:
                        return False;
 
        #inserts and returns the inserted row id (last row id in PHP version)
        def insert(self, sql):
                cur = MySQLConnector._connection.cursor();
                cur.execute(sql);
                return self._connection.insert_id();
 
        def tryinsert(self, sql):
                try:
                        cur = MySQLConnector._connection.cursor();
                        cur.execute(sql);
                        return self._connection.insert_id();
                except:
                        return -1;
 
        #returns the first item of data
        def queryrow(self, sql):
                cur = MySQLConnector._connection.cursor();
                cur.execute(sql);
                return cur.fetchone();
 
        #returns a list of data (array)
        def queryrows(self, sql):
                cur = MySQLConnector._connection.cursor();
                cur.execute(sql);
                return cur.fetchmany();
 
# End class MySQLConnector
