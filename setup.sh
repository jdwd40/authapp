#!/bin/bash

# Create directories
mkdir -p src/controllers
mkdir -p src/models
mkdir -p src/routes
mkdir -p src/middleware
mkdir -p src/services
mkdir -p src/config
mkdir -p src/tests
mkdir -p src/db/seed/development
mkdir -p src/db/seed/test
mkdir -p src/db/data/development
mkdir -p src/db/data/test

# Create test data in JSON format
echo '[
    {
        "id": 1,
        "username": "testuser1",
        "email": "testuser1@example.com"
    },
    {
        "id": 2,
        "username": "testuser2",
        "email": "testuser2@example.com"
    }
]' > src/db/seed/development/users.json

echo '[
    {
        "id": 1,
        "username": "testuser1",
        "email": "testuser1@example.com"
    },
    {
        "id": 2,
        "username": "testuser2",
        "email": "testuser2@example.com"
    }
]' > src/db/seed/test/users.json
