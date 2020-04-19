# cash-flow_assignment
Cash-Flow intern assignment by Prajwal Dnyaneshwar Kamble 17D070024

# Features
- make login request with arbitrary non empty username and password
- generate 50 x 50 thumbnail image form original image url


# Download Project
``` 
    git clone https://github.com/prajwal1999/cash-flow_assignment.git 
```

# Installing Dependencies
```
    npm install
```

# Test
```
    npm run test
```

# Usage
### Authentication API
Request
```rest
    POST http://localhost:3000/login/
    Content-Type: application/json
    Paylaod: {
        "username": "username",
        "password": "password"
    }
```
Response
```
     {
        status: 200,
        body: {
            "msg": "Logged In Successfully",
            "accessToken": accessToken,
        }
    }
```
OR
```
    {
        status: 400,
        body: {
            "msg": "Invalid Credentials"
        }
    }
```

----

### Image Thumbnail Generation API
Request
```
GET  http://localhost:3000/compress
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByYWp3YWwxOTk5IiwiaWF0IjoxNTg3Mjc0OTAyfQ.3odcZwZbnVgBM4uRg5qpqWyVi5ESh_5k9gps-lvA6_E

Content-Type: application/json

Payload: {
    "imageUrl": "https://images.unsplash.com/photo-1587022899470-86edec4b1fd7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
}

```
