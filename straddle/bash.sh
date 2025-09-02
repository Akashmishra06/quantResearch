#!/bin/bash

cd "/root/quantResearch/straddle"
/usr/local/bin/pm2 start "banknifty.py" --interpreter="/root/akashResearchAndDevelopment/..venv/bin/python3" --name="banknifty-1" --no-autorestart --time


cd "/root/quantResearch/straddle"
/usr/local/bin/pm2 start "nifty.py" --interpreter="/root/akashResearchAndDevelopment/..venv/bin/python3" --name="nifty-1" --no-autorestart --time


cd "/root/quantResearch/straddle"
/usr/local/bin/pm2 start "sensex.py" --interpreter="/root/akashResearchAndDevelopment/..venv/bin/python3" --name="sensex-1" --no-autorestart --time