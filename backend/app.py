from flask import Flask, request, jsonify
from PIL import Image
from ultralytics import YOLO


import io

app = Flask(__name__) #Define Flask App
model = YOLO("yolov9c.pt") #Define YOLO model

#Function to process image and get rectangle start (top-left) and end (bottom-right) points
def process_image(image, model):
    #Use YOLOv9 to make predictions (generate lables and rectangles)
    results = model.predict(image, conf=0.5)
    found_objects = []

    for result in results:
        for box in result.boxes:
            found_objects.append({
                "type": result.names[int(box.cls[0])], #Object type Ex. Car, Person, Cat, etc
                "start": [int(box.xyxy[0][0]), int(box.xyxy[0][1])], # Rectangle start X,Y coordinates
                "end": [int(box.xyxy[0][2]), int(box.xyxy[0][3])],# Rectangle end X,Y coordinates
            })

    return found_objects

# Define a route to handle the file upload and processing
@app.route('/upload', methods=['POST'])
def upload_file():
    

    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    images_processing_results = []

    #For each passed image process it
    for file in request.files.getlist("file"):
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        if file:
            image = Image.open(file.stream)
            images_processing_results.append({
                "image": file.filename, 
                "objects": process_image(image, model)
            })   
        
    try:
        # Prepare the JSON response
        response = {
            'message': 'Images processed successfully',
            'processing_result': images_processing_results
        }
        
        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify({'error': 'File processing failed'}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
