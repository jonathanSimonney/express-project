# installation
run 
```
touch .env
npm install
```

and while npm is installing, fill .env following this model : 

```
DB_USER=userName
DB_PASSWORD=userPassword
DB_HOST=someHostNumber
DB_PORT=somePortNumber
DB_NAME=someDbName
SESSION_SECRET=change this fake secret
```

and run `npm start` once `npm install` is done.
