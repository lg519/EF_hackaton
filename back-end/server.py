from flask import Flask, request, make_response

from werkzeug.utils import secure_filename
import os, pdb
import tensorflow as tf

app = Flask(__name__)

app.debug = True

def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'POST'
    return response

@app.route("/file", methods=["POST"])
def upload_keras():
    #pdb.set_trace()
    if "file" not in request.files:
        return "No file part", 400
    file = request.files["file"]
    filename = secure_filename(file.filename)
    filepath = os.path.join("/tmp", filename)
    file.save(filepath)

    # Load the TensorFlow .pb model
    model = tf.keras.models.load_model(filepath) # my_model.pb (directory)
    os.remove(filepath)  # delete the uploaded file

    # Get the model layers
    layer_names=[layer.name for layer in model.layers]

    # Here you can define the layers supported by your hardware accelerators
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

    return add_cors_headers(make_response({"compatibleAccelerators": compatible_accelerators, "layers": layers}))


if __name__ == "__main__":
    #upload_keras("/home/username/Desktop/ef_model/EF_hackaton/EF_hackaton/my_model.pb")
    app.run(port=8000)
