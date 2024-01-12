# TradEITI - Application for Exchange of Class Hours for Students
## Project Description
TradEITI is a web application designed to facilitate the exchange of class hours among students. The problem we encountered during our first year of studies was the lack of an available platform for students to exchange class hours. Currently, students often have to resort to primitive solutions, such as Google Docs. Our goal is to create an exchange platform that enables students to more efficiently address this issue.

## Online Version
<a href="https://www.tradeiti.com/">https://www.tradeiti.com/</a>

<div>Full login is only possible for individuals with an account in the USOS PW domain, as this is an application for students.</div>

## Technologies

- Backend based on the Spring framework
- Frontend using React technology
- PostgreSQL database
- Docker containers
- Integration with USOS API
We want to allow students to use their own data from the USOS system. Through integration with the USOS API, each user will be able to log in using their existing data.

## Application Features
The TradEITI application will offer the following features:

- Adding new offers for the exchange of class hours.
- Searching for offers on the homepage using various filters.
- Managing one's own exchange offers.
- Accepting exchange offers from other students.
## Authors
- Kacper Multan
- Oliwier Szypczyn
- Artur Kempiński
- Jakub Kryczka
## My Role in the Project
My role primarily involved creating the user interface of the application and integrating the user layer with the server layer, including:

- Creating the project structure on the frontend
- Establishing the connection with the backend
- Handling all logical operations on the frontend (e.g., data caching in the form after page refresh, offer filtering, etc.)
- Partially building the page structure and styling
- Adding the frontend application to the Docker container
- Assisting in configuring the connection with USOS through USOS OAUTH 1.0
## License
This project is available under a closed license. All rights reserved.
