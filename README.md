If you want to see it just clone it or dowmload it then go to frontend, 
To run frontend run following commands:
 cd frontend ,
 npm i ,
 npm run dev 

To run backend open new terminal and run this commands:

cd backend ,
.\venv\Scripts\activate ,
uvicorn app.main:app --reload 

and create a .env file for it in backend in this format :
APP_NAME=AI Business Manager
ENV=development
JWT_SECRET=supersecretkey123
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=60
GROQ_API_KEY= Replace it with your Api key !!
