OLiMS - It is an online library management system.

Steps to configure the application on a machine:

Clone the project in a folder directly accessible by localhost.

All backend work is done in server.js, app, and config while all the frontend is handled in the public folder.

To start, open a terminal and type folowing commands:

	1. bower install
	2. npm install

It is required that your machine has mongodb installed.
Set the path to connect with the application database, type:

	mongod --dbpath "DRIVE:\path\to\OLiMS\app\data" --port 27017

After all the dependencies are installed, hit the following command:

	npm run start

The application will, by default, run on port 3000 or the port number in the PORT env variable (if specified).

If current port, say 3000, is occupied by some other process then you can change the port by typing the following command in a terminal:
	
	PORT=<your port number>

Then type npm run start to start the application.
