# sqlalchemy database connection
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.exc import OperationalError

# load local .env
from dotenv import load_dotenv
import os

# get the base directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
# load the .env file
load_dotenv(os.path.join(BASE_DIR, ".env"))
# get the database url
DB_URL = os.getenv("DB_URL")
print("DB_URL:", DB_URL)
# create the engine
engine = create_engine(DB_URL)

# create the session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# create the base
Base = declarative_base()
