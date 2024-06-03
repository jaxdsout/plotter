CREATE DATABASE theplotter3;
CREATE USER theplotter3user WITH PASSWORD 'plotter123';
GRANT ALL PRIVILEGES ON DATABASE theplotter3 TO theplotter3user;
ALTER DATABASE theplotter3 OWNER TO theplotter3user;
GRANT USAGE ON SCHEMA public TO theplotter3user;
GRANT CREATE ON SCHEMA public to theplotter3user;