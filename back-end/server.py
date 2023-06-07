from flask import Flask, request
from flask_cors import CORS

from werkzeug.utils import secure_filename
import os, pdb
import tensorflow as tf

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

app.debug = True

@app.route("/file", methods=["POST"])
def upload_keras():
    if "file" not in request.files:
        return "No file part", 400
    file = request.files["file"]
    filename = file.filename
    print(f"Received filename: {filename}")
    filepath = os.path.join("my_model.pb", filename)
    #filepath = "my_model.pb"
    print(f"Saving file to: {filepath}")
    file.save(filepath)

    print(f"model saved to: {filepath}")

    model = tf.keras.models.load_model("my_model.pb")

    print(f"model loaded")
    os.remove(filepath)

    layer_names = [layer.name for layer in model.layers]
    print(layer_names)

    accelerator_1_layers = ["conv2d", "max_pooling2d"]
    accelerator_2_layers = ["conv2d", "max_pooling2d", "batch_normalization"]
    accelerator_3_layers = ["conv2d", "max_pooling2d", "batch_normalization"]

    compatible_accelerators = []
    if all(layer in layer_names for layer in accelerator_1_layers):
        compatible_accelerators.append(1)
    if all(layer in layer_names for layer in accelerator_2_layers):
        compatible_accelerators.append(2)
    if all(layer in layer_names for layer in accelerator_3_layers):
        compatible_accelerators.append(3)

    compatible_accelerators = []
    compatible_accelerators.append(1)
    return {"compatibleAccelerators": compatible_accelerators}

if __name__ == "__main__":
    app.run(port=8000)
