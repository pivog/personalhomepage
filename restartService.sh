#!/bin/bash

systemctl service dockerServer disable
systemctl service dockerServer kill

git pull
