The project was to build a interactive chatbot on real people's personas. 

This project helped me to deepen my understanding on GenAI subject. I broke down the problem statement into two parts: Researching personas from internet and then building the actual Chatbot. For the API, I searched for various available api models to use and used Hugging face api (meta-llama/Meta-Llama-3-8B-Instruct) because it seemed more aligned with my particular use case. Then I had to choose right tech stack for this project. I had to make sure that UI looks fast and smooth so I chose React and Vite combo and I used Python with FastApi for the backend so that the integrations of external APIs go smooth.

The most valuable part was researching and iterating on the persona experience. Each persona needed to feel distinct and mirroring their actual personality. I looked into Youtube videos and podcasts, generated their transcripts, studied their Linkedin posts and X tweets to better understand their flow of language and their tone. All three of them had different personalities overall. 

Then I had to prepare the right system prompt so that it didn't look complex nor vague to prevent GIGO principle. I had to curate the prompt carefully so that no scope of any garbage or hallucinatiing output gets seen. I used chat_history to make sure it remembers user's key details in that session. The researching part took more time than building the actual bot because it took various insertions and deletions to match the actual personality as far as possible.

I then built my frontend with whatsapp like interface so that it gives a rather familiar feel to the users. I integrated features like "typing..." indicator, greaceful error handling etc for smoother experience.

I deployed my backend first on Render and then deployed my frontned on Vercel.

Overall, this project improved my confidence in both researching personas and building with APIs. I debugged through issues constantly and learned while fixing them. 
