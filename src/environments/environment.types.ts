export type Environment = {
  firebase: {
    projectId: string;
    appId: string;
    storageBucket: string;
    apiKey: string;
    authDomain: string;
    messagingSenderId: string;
  };
  http: {
    baseUrl: string;
  };
  production: boolean;
  enableDevConfig: boolean;
};
