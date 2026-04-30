# Persona AI Chatbot

This repository is a persona-based AI chatbot submission for the assignment. The app has 3 different personas with which the user interacts. They are Anshuman Singh, Abhimanyu Saxena, and Kshitij Mishra. Each of them has their own system prompt, their own tone of answering and their own suggestions. They have separate conversation flow. 

The project has two folders: 
- ```backend``` contains the FastAPI backend and the /api/chat route
- ```frontend``` contains the React + Vite frontend

### Features Included

- Three persona images at the top of the page
- Active persona highlight
- Chat reset when the persona changes
- Suggestive questions for each persona
- Typing indicator while the response is loading and graceful error handling 
- Mobile and desktop responsive layout

## Local setup

### ```Backend```

```
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

#### Backend environment variables are present in backend/.env.example for reference.

### ```Frontend```
```
cd frontend
npm install
cp .env.example .env
npm run dev
```

### SCREENSHOTS 

<img width="1918" height="994" alt="image" src="https://github.com/user-attachments/assets/6eb71aac-e365-4ff5-b5dd-d78e3f49ee77" />

<img width="600" height="994" alt="f09bdc2e-75c0-4a1a-a986-bd92d2a97323" src="https://github.com/user-attachments/assets/44f5aff7-ffe3-42da-8dc4-85f903037153" />


### Deployment

- Deployed frontend URL: https://gen-ai-chatbot-psi.vercel.app/
- Deployed backend URL: https://genai-chatbot-mczn.onrender.com/
