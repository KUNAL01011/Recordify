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

4. Dashbaord Desing
    -> when i go to dashboard this will first check i am authenticated then if i'm then redirect to workspace[0];
    -> [workspaceId] 
        -> layout.tsx :-> this is also check i am authenticated or not if i'm then proceed
        -> page.tsx :->

-> Sidebar 
    -> Modal
    -> Search
    -> SidebarItem
    -> WorkspacePlaceholder
    -> GlobalCard
    -> Loader
    -> InfoBar


## Frontend
1. firstly you hit the middleware if you authenticated you passs the steps and if you not do login
2. login/Register process :- click to login and select the gmail id you want to open account then clerk verify your account and create an entry for the use and save the some session or token to the borwser and retrun some data and here we come take the data and create the entry of the user into are data base and create a workspace that has only free plan. after all this happend this will redirect to dashboard.

3. when you hit the dashboard. the dashboard redirect to workspaceid that has user.
4. Now you land on the dashboard/workspaceId page that has something like the page has 
    -> sidebar :- sidebar is a big component that firstly request to backend to give the all workspace that user have and get all notification that user have .
    -> and also list all the menu item for the workspace.
    -> check if user have free plan then give a button to upgrade to pro plan
    -> And if user have pro plan then user can invite people and create more workspaec also

5. Workspace has a own infoBar :- that has a search bar to search videos and members also and have recode and upload button and at the last user has own profile pic 
6. 


## React Query
-> hooks :- 
    -> useMutationData:-
    -> useQueryData:-

## Backend Api
onAuthenticateUser :- This will check for authentication if user authenticate the send data if not create the user
getNotifications :- Get all notification for the user that he or she have
searchUsers :- search the user with his email, firstName or lastName
verifyAccessToWorkspace :- check user has owern  or member of this workspace
getWorkspaceFolders :- This will return the folder that have the workspace that you give this api to
getAllUserVideos :- This will return all the videos that have the workspace
getWorkspaces :- This will return all workspace that user have
createWorkspace :- this will create a new workspace if the user have pro plan



## Folder Stucture
1. prisma 
    1. schema.prisma
2. src
    1. actions
        1. user.ts
        2. workspaces.ts
    2. app
        1. layout.tsx
        2. (website)
            1. _components
                1. navbar.tsx
            2. layout.tsx
            3. page.tsx
        3. auth
            1. callback
                1. loading.tsx
                2. page.tsx
            2. sign-in
                1. [[...sign-in]]
                    1. page.tsx
            3. sign-up
                1. [[...sign-up]]
                    1. page.tsx
            4. layout.tsx
        4. dashboard
            1. [workspaceId]
                1. layout.tsx
                2. page.tsx
            2. page.tsx
    3. components
        1. forms
            1. workspace-form
                1. index.tsx
                2. schema.ts
        2. global
            1. create-workspace 
                1. index.tsx
            2. from-generator
                1. index.tsx
            3. global-card
                1. index.tsx
            4. global-header
                1. index.tsx
            5. info-bar
                1. index.tsx
            6. loader
                1. index.tsx
                2. spinner.tsx
            7. modal
                1. index.tsx
            8. search
                1. index.tsx
            9. sidebar
                1. index.tsx
                2. sidebar-item.text-xs
                3. workspace-placeholder.tsx
        3. icons : svg icons
        4. theme
            1. index.tsx
        5. ui :- shadcn ui components
    4. constants
        1. index.tsx
    5. hooks
        1. useCreateWorkspace.ts
        2. useMutationData.ts
        3. useQueryData.ts
        4. useSearch.ts
        5. useZodForm.ts
    6. lib
        1. prisma.ts
        2. utils.ts
    7. react-query
        1. index.tsx
    8. types
        1. index.type.ts
    9. middleware
3. .env