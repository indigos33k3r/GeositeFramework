#! /usr/bin/env python

import os
import logging
from BaseHTTPServer import HTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler

PORT = 54633
PATH_TO_PROJECT = 'GeositeFramework/'

logging.basicConfig(level=logging.INFO)

class CustomRootHTTPServer(HTTPServer):
    def __init__(self, base_path, *args, **kwargs):
        HTTPServer.__init__(self, *args, **kwargs)
        self.RequestHandlerClass.base_path = base_path

class CustomRootHTTPRequestHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        words = filter(None, path.split('/'))
        modified_path = self.base_path
        for word in words:
            modified_path = os.path.join(modified_path, word)
        return modified_path

def serve():
    server = CustomRootHTTPServer(PATH_TO_PROJECT, ('', PORT), CustomRootHTTPRequestHandler)
    logging.info('Now serving on http://localhost:54633')
    server.serve_forever()

if __name__ == '__main__':
    serve()