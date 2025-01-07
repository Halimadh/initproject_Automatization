export let API_URL: string;
export let HEADRS: object;

const env = (window as any).conf;
if (env) {
  API_URL = env.BACKEND_URL;
}

HEADRS = {
  'Content-Type': 'application/json',
  // 'Authorization': `Bearer ${localStorage.getItem('app_token')}`
};