# book-management-q-software
# Run the project
1. In root of project run: "docker-compose up --build -d"

2. To enter into server bash: "docker exec -it book-management-q-software_app_1 sh"

3. Change directory: "cd src/database"

# Database tables will be created pragmatically (in step 1) it is not necessary to have migrations

4. To fill database tables with data, in shell run seeders: "npx sequelize-cli db:seed:all"