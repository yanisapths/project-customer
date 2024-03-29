![Facebook post - 1 (3)](https://user-images.githubusercontent.com/72002605/227770800-4fa8e9a0-59be-4217-afb9-15cc3f4ae41b.png)
## About 
This project is all-in-one platform for customers to have reserve appointment easily and physical therapy businesses with time and cost-effective of routine work into everyday operation by keeping everything in one place.

### Demo
 - https://www.youtube.com/watch?v=lQzAY91wq6Y (Youtube) 
 - https://daycare-portal.vercel.app/ (PT clinic user) 
 - https://o-live.vercel.app/ (General user) 

## Getting Started
This repo is the customer appliciation.
 This app included:
- Login: Google & LINE Login using NextAuth
- Search by province and browse clinic
- Appointment reservation
- Customer/Patient management
- Appointment Tracking
- Review
and more


### Built with & Components 🚧
- Next.js
- NextAuth
- Axios
- Tailwind CSS
- Mui
- ReactDatePicker
- SweetAlert
- react hot toast


Alternatively, you can run the project with Docker
# Docker 🐳
Please also run backend project
```bash
  git clone https://github.com/yanisapths/project-customer.git
```
Start Container  
```bash
  docker-compose up
```
or 

# Installation 
```bash
git clone https://github.com/yanisapths/project-customer.git
npm install
```
### Environment Variables 
#### .env.local
```bash
NEXTAUTH_URL=
NEXTAUTH_SECRET= go to https://generate-secret.now.sh/32

LINE_ID=
LINE_SECRET=

GOOGLE_ID=
GOOGLE_CLIENT_SECRET=
```

### Run this project

```bash
npm run dev
```


# License
Licensed under the [Apache License](https://github.com/yanisapths/project-customer/blob/main/LICENSE).  <br />

  >  Copyright © 2023 Yanisa Poonthaisong, All rights reserved.
