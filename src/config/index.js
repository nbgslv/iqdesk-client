import dotenv from 'dotenv';

dotenv.config();

const config = {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.REACT_APP_PORT, 10),

  /**
   * URL for API service
   */
  apiUrl: process.env.REACT_APP_API_URL,
};

export default config;
