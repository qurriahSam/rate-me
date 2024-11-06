// Define the type of the environment variables.
declare interface Env {
  readonly NODE_ENV: string;
  // Replace the following with your own environment variables.
  // Example: NGX_VERSION: string;
  NG_APP_API_KEY: string;
  NG_APP_AUTH_DOMAIN: string;
  NG_APP_PROJECT_ID: string;
  NG_APP_STORAGE_BUCKET: string;
  NG_APP_MESSAGING_SENDER_ID: string;
  NG_APP_APP_ID: string;
  NG_APP_MEASURMENT_ID: string;
  NG_APP_SCREENSHOTONE_ACCESS_KEY: string;
  NG_APP_SCREENSHOTONE_SECRET_KEY: string;
}

// Choose how to access the environment variables.
// Remove the unused options.

// 1. Use import.meta.env.YOUR_ENV_VAR in your code. (conventional)
declare interface ImportMeta {
  readonly env: Env;
}
