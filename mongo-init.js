print("Started Adding the Users.");
db = db.getSiblingDB("admin");
db.createCollection("Users")
db.createCollection("Messages")
print("End Adding the User Roles.");