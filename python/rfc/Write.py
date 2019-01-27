#!/usr/bin/env python

import RPi.GPIO as GPIO
import SimpleMFRC522
import sys

reader = SimpleMFRC522.SimpleMFRC522()

try:
    if len(sys.argv) > 1:
        text = sys.argv[1]
    else:
        text = ""
    print("Now place your tag to write")
    reader.write(text)
    print("Written")
finally:
    GPIO.cleanup()
