export type environment = 'prod' | 'test' | 'dev';

export interface Config {
    port: number;
    environment: environment
}


  
  const config: Config = {
    port: 3000,
    environment: 'dev'
  };
  
  export { config };