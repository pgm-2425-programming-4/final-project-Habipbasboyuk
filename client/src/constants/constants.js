	
export const API_URL = import.meta.env.PROD
  ? "https://final-project-habipbasboyuk.onrender.com"
  : "http://localhost:1337/api/todos";
  
export const API_TOKEN = import.meta.env.PROD
  ? "PROD token"
  : "local token";