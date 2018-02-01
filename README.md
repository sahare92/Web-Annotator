# Web-Annotator
A Web-aapplication for manuscripts annotation.

To install do the following:

1. Install latest stable versions of npm and nodejs 
2. Clone or download the git repository
3. On the git run in command line "npm install -g nodemon" and "npm install"
4. Move to the client directory and run in command line "npm install
5. Create a local mongoDB with a database named 'web-annotator'

To run:

For development mode:
1. From git repo run "nodemon" to run the server from command line 
2. cd "/client" directory and run "npm start" from command line 
3. the server will run on localhost:8000.

For production mode:
*only on the first time*
1. cd "'projet-folder-path'/etc"
2. run "chmod 777 ./run-server"
2. run "sudo ./run-server"