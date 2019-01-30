#!/usr/bin/env python

import RPi.GPIO as GPIO
import SimpleMFRC522
import urllib2
import json

reader = SimpleMFRC522.SimpleMFRC522()



while (1):
    try:
        id, text = reader.read()
        data = {
            'id': id,
            'text': text
        }

        if(text != ''):
            req = urllib2.Request('http://localhost:3000/api/setRead')
            req.add_header('Content-Type', 'application/json')

            response = urllib2.urlopen(req, json.dumps(data))
    except Exception:
        pass
    finally: GPIO.cleanup()