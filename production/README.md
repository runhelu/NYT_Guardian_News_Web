### Introduction to some files in production/

`myapp.config.js` is the config file for PM2

You have to keep in mind that when a React application id built, the output is static HTML with some CSS and JS files, so you have to create a Node JS application(sample: `/myclient/server.js`) in order to serve those files on the production environment

Remember to edit all urls in `production/myserver/routers`