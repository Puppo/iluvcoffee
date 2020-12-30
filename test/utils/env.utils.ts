const ENV_E2E_TEST = {
  DATABASE_USER: 'postgres',
  DATABASE_PASSWORD: 'pass123',
  DATABASE_NAME: 'postgres',
  DATABASE_PORT: '5433',
  DATABASE_HOST: 'localhost',
  API_KEY: 'api-key',
};

export default (): void => {
  Object.entries(ENV_E2E_TEST).map(([key, value]) => {
    process.env[key] = value;
  });
};
