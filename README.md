# chat-app
This is a real-time chat application created with mongoDB, express, react, nodeJS and socket.io
# How to run
* Clone this repository and move to 'chat-app-master' directory.
```
git clone https://github.com/korawichtawan/chat-app.git
cd chat-app
```
* Create .env file with the following variables
```
USERNAME=<enter username>
PASSWORD=<enter password>
```
* Run with docker-compose command and wait until you see this word "frontend    | webpack compiled successfully"
```
docker-compose up
```
![docker-compose](https://user-images.githubusercontent.com/54474175/182028763-a5838d4b-3a1c-4007-a352-b7c39ec56cb6.JPG)
# How to use 
Open 2 tab of browser (one tab in normal mode and another tab in incognito mode) and go to http://localhost:3000/<br />
<img src="https://github.com/korawichtawan/chat-app/blob/master/images/first-page.JPG" width=35% height=35%><br />
Go to register page to create new account and choose avatar (both tab).
<p>
<img src="https://github.com/korawichtawan/chat-app/blob/master/images/register-first-user.JPG" width=35% height=35%>
<img src="https://github.com/korawichtawan/chat-app/blob/master/images/choose-avatar.JPG" width=35% height=35%>
<p>
After choose avatar, you will see a chat page (refresh page to update friends list).
<p>
<img src="https://github.com/korawichtawan/chat-app/blob/master/images/chat-page.JPG" width=35% height=35%>
<img src="https://github.com/korawichtawan/chat-app/blob/master/images/chat-page-2.JPG" width=35% height=35%>
<p>
Click on your friend's profile to talk with him/her.<br />
<img src="https://github.com/korawichtawan/chat-app/blob/master/images/chat-message.JPG" width=35% height=35%>
