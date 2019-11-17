-- Create Database ---------------------------------------------

CREATE DATABASE iqoption;
CREATE USER iqoptionapp WITH LOGIN PASSWORD 'slojniy';
GRANT CONNECT ON DATABASE iqoption TO iqoptionapp;
\c iqoption;
GRANT USAGE on SCHEMA public to iqoptionapp;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO iqoptionapp;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO iqoptionapp;
