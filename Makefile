production: update-production install build prune restart-production

staging: update-staging install build prune restart-staging

update-production:
	git pull origin master

update-staging:
	git pull origin staging

install:
	npm install

build:
	npm run build

prune:
	npm prune

restart-production:
	pm2 restart pm2.json --only api.wwcd.pw

restart-staging:
	pm2 restart pm2.json --only api-staging.wwcd.pw
