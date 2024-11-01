# Project Name :- Reacordify

-> first set up the project where i think nothing much complex i do like simply create the next and install the shadcn libary for ui component and utilise the feature of dark theme that provide by shadcn
libary

-> i paste two file in this project first one is global.css and .env file check this out when i read the global.css then i finaly find that we have three things to setup the css like base for base stucture and component be link button and utilities be like margin ,padding etc


1. Database setup
-> here we using neon database that use internally postgrase database now i setup the neon platform for my project and i use orm prisma to comunicate with the server the steps to setup prisma to comunicate with database
    -> npm install prisma @prisma/client
    -> npx prisma init
    -> create the global prisma cliect :- to check ignore the creation of multiple instance of prismaclient
    -> npx prisma generate
    -> npx prisma db push

