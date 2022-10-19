import dotenv from 'dotenv';

// Configuración de las variables de etorno
dotenv.config();

// Host y Puerto de la aplicación
export const hostName = process.env.HOST;
export const port = Number(process.env.PORT);

// Url Base para Api versión y prefijo
export const baseUrlApi = `/${process.env.API_PREFIX}${process.env.API_VERSION}`;

// Mongo connection string
export const mongoConnectionString = process.env.CONNECTION_STRING || '';

// Secret authentication JWT
export const jwtSecret: string = process.env.JWT_SECRET || '';
