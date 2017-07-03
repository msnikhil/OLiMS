##**OLiMS** - It is an online library management system.

### Steps to configure the application on a machine:

All back end work is done in **server.js**, **app**, and **config** folder while all the front end is handled in the **public** folder.

Install latest version of **Bower** and **NodeJS** (with **npm**).

To start, open a terminal and type folowing commands:

	1. npm install
	2. bower install

It is required that your machine has **MongoDB** installed.

Start a mongod instance by running the mongod.exe(Windows) or type `mongod` on your terminal.

After all the dependencies are installed, hit the following command:

	npm run start

The application will, by default, run on port **3000**.

To change the port numbers and other configs visit the following files:

	OLiMS/config/envValues.js
	OLiMS/public/js/app.js

Then type `npm run start` to start the application.

### Application walkthrough


If you are not logged in then by default you will be on the registration page.
A new User is created every time you register.

Click on admin login to log in to the system.
Enter following credentials to login:
```		
	Username: admin21
	Password: admin21
```

**Note**: New admin credentials cannot be created from the UI as of now.

You'll be taken to the dashboard once login is successful.