cd "/root/quantResearch/backend"
/usr/local/bin/pm2 start "app.py" --interpreter="/root/akashResearchAndDevelopment/..venv/bin/python3" --name="backend-quantResearch-1" --no-autorestart --time

cd "/root/quantResearch/my-frontend-app"
/usr/local/bin/pm2 start "npm" --name="frontend-quantResearch-1" -- run preview -- --host 139.5.188.242 --port 3000