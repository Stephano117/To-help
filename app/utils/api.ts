import axios from 'axios';

const OPENAI_API_KEY = 'F5TNIRD40RrPVJpBCzaezMdhqZAtb6cD_laDXZ0Xli7XrsVnesXKyB53T3BlbkFJhDMHs0qP1eSzzNwymdsrAC4azPhrUyidrWREiEMjFj5FSYuZlZ5xQzX5wFdK6zZa3ZV8gMae4A'; // Remplacez par votre clé API
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

export const sendMessageToChatGPT = async (message : string) => {
  try {
    const response = await axios.post(
      OPENAI_URL,
      {
        model: 'gpt-3.5-turbo', // ou 'gpt-4' si vous y avez accès
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return 'Sorry, I could not process your request.';
  }
};