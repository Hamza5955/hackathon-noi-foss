# Backend Hackathon 2024 | Gruppo FOSS Challange 

This is the backend for the Hackathon 2024 at Scenna, and it tackles the challange of Gruppo FOSS.

## "Quick" setup with Docker
```bash
# Build image
sudo docker build -t backend-hackathon-2024-foss-challange .

# Run container
sudo docker run -p 5000:5000 backend-hackathon-2024-foss-challange
```


## Manuall setup
Install requirements:

```bash
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate

# Install Flask and Pillow (for image processing)
pip install Flask Pillow ultralytics
```
Run app:
```bash
# Run the app
python3 app.py
```

```bash
#Process an image
curl -X POST -F 'file=@path_to_your_image_file.jpg' http://127.0.0.1:5000/upload

#Process multiple images
curl -X POST -F 'file=@path_to_your_image_file_1.jpg' ... -F 'file=@path_to_your_image_file_N.jpg' http://127.0.0.1:5000/upload
```

