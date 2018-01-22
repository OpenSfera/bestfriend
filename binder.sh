#!/bin/bash
PPORT=3000

sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports $PPORT
