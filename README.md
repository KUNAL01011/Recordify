# Project Name :- Reacordify

-> first set up the project where i think nothing much complex i do like simply create the next and install the shadcn libary for ui component and utilise the feature of dark theme that provide by shadcn
libary

-> i paste two file in this project first one is global.css and .env file check this out when i read the global.css then i finaly find that we have three things to setup the css like base for base stucture and component be link button and utilities be like margin ,padding etc


1. Database Connection :- using neon database with prisma orm
-> here we using neon database that use internally postgrase database now i setup the neon platform for my project and i use orm prisma to comunicate with the server the steps to setup prisma to comunicate with database
    -> npm install prisma @prisma/client
    -> npx prisma init
    -> create the global prisma cliect :- to check ignore the creation of multiple instance of prismaclient
    -> npx prisma generate
    -> npx prisma db push

-> Schema creation for this project
    schema.prisma :- this file hold all the schema of the project 
    prisma.ts :- so besicaly i am using next to communicate wite db whene i send some data to db so what nextjs do they first they connect to db every time that is the problem we don't want to create a every call create a db connection . to over this problem i write the prisma.ts file this file create global database instance so if i want to send data i use global instance to send a data insted creating new one or if not connection stablish right now this file create also new connection.

2. Authentication :- using cleck for authentication
    -> create project on clerk and they give you some env data
    -> change two file 
        middleware.ts :- protect the routes
        layout.tsx :- set the provider for global access of auth
    Note :- sign in or sign up i created the page and in whene i click to login and if then auth will redirect to callback and page.tsx file check the user data exist the created a data in if not created in backend then send save the data into backend db.

3. React Query Setup
    -> first setup the react query provider and wrap the children to provider
    -> inside the clidren now you can access the  useQuery and useMutation 