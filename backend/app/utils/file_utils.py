import os
import shutil
import uuid

TEMP_DIR = "temp"

os.makedirs(TEMP_DIR, exist_ok=True)

def save_temp_file(file):
    ext = file.filename.split(".")[-1]
    name = f"{uuid.uuid4()}.{ext}"
    path = os.path.join(TEMP_DIR, name)

    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return path

def delete_file(path):
    if os.path.exists(path):
        os.remove(path)
