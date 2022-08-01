export const ENV = process.env.NODE_ENV;

const envNames = {
    development: 'development',
    production: 'production',
};

const commonEnvVars = {
    APP_PREFIX: process.env.NEXT_PUBLIC_APP_PREFIX,
    CONTRACT_NAME: process.env.NEXT_PUBLIC_CONTRACT_NAME,
};

const envVars = {
    [envNames.development]: {
        ...commonEnvVars,
    },
    [envNames.production]: {
        ...commonEnvVars,
    },
};

export const IS_DEV = ENV === envNames.development;
export const IS_PROD = ENV === envNames.production;

export const APP_CONFIGS = envVars[ENV || envNames.development];
