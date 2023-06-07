from flask import Flask, request
from flask_cors import CORS  # Import CORS
from werkzeug.utils import secure_filename
import os
import tensorflow as tf

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.debug = True


@app.route("/file", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return "No file part", 400
    file = request.files["file"]
    filename = secure_filename(file.filename)
    filepath = os.path.join("/tmp", filename)
    file.save(filepath)

    # Load the TensorFlow .pb model
    model = tf.saved_model.load(filepath)
    os.remove(filepath)  # delete the uploaded file

    # Get the model layers
    layers = [node.op for node in model.graph.as_graph_def().node]

    # Here you can define the layers supported by your hardware accelerators
    accelerator_1_layers = ["Conv2D", "Relu", "MaxPool"]
    accelerator_2_layers = ["Conv2D", "Relu", "MaxPool", "BatchNorm"]
    accelerator_3_layers = ["Conv2D", "Relu", "MaxPool", "BatchNorm", "Dropout"]

    compatible_accelerators = []
    if all(layer in layers for layer in accelerator_1_layers):
        compatible_accelerators.append(1)
    if all(layer in layers for layer in accelerator_2_layers):
        compatible_accelerators.append(2)
    if all(layer in layers for layer in accelerator_3_layers):
        compatible_accelerators.append(3)

    return {"compatibleAccelerators": compatible_accelerators, "layers": layers}


if __name__ == "__main__":
    app.run(port=8000)
