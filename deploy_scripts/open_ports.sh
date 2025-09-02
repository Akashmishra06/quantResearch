#!/bin/bash


sudo iptables -A INPUT -p tcp --dport 3000 -j ACCEPT
# sudo iptables -A INPUT -p tcp --dport 5000 -j ACCEPT
# sudo iptables -A INPUT -p tcp --dport 5005 -j ACCEPT
# sudo iptables -A INPUT -p tcp --dport 6050 -j ACCEPT
# sudo iptables -A INPUT -p tcp --dport 6055 -j ACCEPT
# sudo iptables -A INPUT -p tcp --dport 6379 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 5001 -j ACCEPT


sudo netfilter-persistent save

sudo netfilter-persistent reload