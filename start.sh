cp -r ./dist/index.html /app/
cp -r ./dist/static/js /app/static/js
cp -r ./dist/static/css /app/static/css
cp -r ./dist/static/fonts /app/static/fonts
cp -r ./nginx.conf /usr/local/nginx/conf/nginx.conf
cp -r ./default.conf /usr/local/nginx/conf.d/default.conf
/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf;
