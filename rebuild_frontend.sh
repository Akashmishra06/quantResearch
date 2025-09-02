#!/bin/bash

cd "/root/quantResearch/my-frontend-app"

# Install dependencies (optional, uncomment if needed)
# npm install

# Build the frontend
npm run build

# Restart the PM2 preview process
pm2 restart frontend-quantResearch-1 || pm2 start "npm" --name="frontend-quantResearch-1" -- run preview -- --host 139.5.188.242 --port 3000