from flask import Flask, request
from flask_cors import CORS
import zipfile
from werkzeug.utils import secure_filename
import os, pdb
import tensorflow as tf
import shutil

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

app.debug = True

@app.route("/file", methods=["POST"])
def upload_keras():
    # Check and create directory if it doesn't exist
    if not os.path.exists('uploaded_model'):
        os.makedirs('uploaded_model')

    if "file" not in request.files:
        return "No file part", 400
    file = request.files["file"]
    filename = file.filename
    print(f"Received filename: {filename}")

    # Save the file
    filepath = os.path.join("uploaded_model", filename)
    print(f"Saving file to: {filepath}")
    file.save(filepath)

    # Extract the zip file
    with zipfile.ZipFile(filepath, 'r') as zip_ref:
        zip_ref.extractall("uploaded_model")

    # Print the contents of the directory "uploaded_model"
    print("Contents of 'uploaded_model':")
    print(os.listdir("uploaded_model"))

    # Assume the model is in a directory with the same name as the original filename (minus .zip)
    model_dir = filename.rstrip(".zip")
    model_filepath = os.path.join("uploaded_model", model_dir)

    model = tf.keras.models.load_model(model_filepath)

    print(f"model loaded")

    layer_names = [layer.name for layer in model.layers]
    print(layer_names)

    accelerator_1_layers = ["conv2d", "max_pooling2d"]
    accelerator_2_layers = ['conv2d', 'batch_normalization', 'max_pooling2d', 'conv2d_1', 'batch_normalization_1', 'max_pooling2d_1', 'flatten', 'dense']
    accelerator_3_layers = ["conv2d", "max_pooling2d", "batch_normalization", "bob"]

    compatible_accelerators = []
    if all(layer in layer_names for layer in accelerator_1_layers):
        compatible_accelerators.append(1)
    if all(layer in layer_names for layer in accelerator_2_layers):
        compatible_accelerators.append(2)
    if all(layer in layer_names for layer in accelerator_3_layers):
        compatible_accelerators.append(3)

    # Remove the zip file
    os.remove(filepath)

    # Clean up the directory
    shutil.rmtree('uploaded_model')

    print(f"Compatible accelerators: {compatible_accelerators}")
    return {"compatibleAccelerators": compatible_accelerators}

if __name__ == "__main__":
    app.run(port=8000)