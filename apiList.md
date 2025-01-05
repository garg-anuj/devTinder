## authRouter 
    POST    /auth/signUp
    POST    /auth/login
    POST    /auth/logout

## profileRouter
    GET     /profile/view
    PATCH   /profile/edit
    PATCH   /profile/password

## connectionRequestRouter
 [interested, ignored, accepted, rejected ]
    /request/send/interested/:userId 
    /request/send/ignored/:userId 
    /request/review/accept/:requestId
    /request/review/rejected/:requestId

## user

GET     /user/:userId
GET     /user/connections
GET     /user/requests
GET     /user/requests/interested 
GET     /user/requests/ignored
GET     /user/requests/accepted
GET     /user/requests/rejected
GET     /user/feed  - Gets You the profiles of other users on platform

