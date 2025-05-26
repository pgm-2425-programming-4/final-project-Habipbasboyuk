	
export const API_URL = import.meta.env.PROD
  ? "https://final-project-habipbasboyuk.onrender.com/api"
  : "http://localhost:1337/api";
  
export const API_TOKEN = import.meta.env.PROD
  ? "PROD token"
  : "local token";