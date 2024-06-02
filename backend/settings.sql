CREATE DATABASE plotplot;
CREATE USER plotplotuser WITH PASSWORD 'plotter123';
GRANT ALL PRIVILEGES ON DATABASE plotplot TO plotplotuser;
ALTER DATABASE plotplot OWNER TO plotplotuser;
GRANT USAGE ON SCHEMA public TO plotplotuser;
GRANT CREATE ON SCHEMA public to plotplotuser;