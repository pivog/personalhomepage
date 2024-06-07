import os
import time
import subprocess

os.chdir(os.path.dirname(os.path.realpath(__file__)))

files = ["./startTestServer.sh", "./startDevCompilation.sh"]

for filename in files: subprocess.getoutput("gnome-terminal -- " + filename)

while True:
    time.sleep(0.5)