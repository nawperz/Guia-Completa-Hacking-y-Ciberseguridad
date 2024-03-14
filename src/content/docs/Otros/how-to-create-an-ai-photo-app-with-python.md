---
title: Como crear una aplicación fotografica con PYTHON
---

[#python](https://dev.to/t/python)[#tutorial](https://dev.to/t/tutorial)[#opensource](https://dev.to/t/opensource)[#coding](https://dev.to/t/coding)

Let's learn how to build an image recognition application using Python and Taipy.  
We'll start by developing the model, and then we will use Taipy to build a Graphical User Interface (GUI) to use it.  
The application will allow us to upload an image, and it will identify the content using our trained model.

[![application](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fupcro013hlvelhxq0v9a.png)](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fupcro013hlvelhxq0v9a.png)

---

## [](https://dev.to/taipy/how-to-create-an-ai-photo-app-with-python-23g8?ref=dailydev#what-is-a-neural-network-builder)What is a Neural Network Builder

Let’s start!  
The first phase is to create a Neural Network for image classification.  
We will use a Neural Network Builder from **TensorFlow** and the **CIFAR-10** dataset.  
Tensorflow is an essential for Artificial Intelligence library to develop and train our neural network.

[Star ⭐ the TensorFlow repository](https://github.com/tensorflow/tensorflow)

The dataset comprises +50,000 images and is crucial for training image recognition models.  
We will be able to put our model to the test with Taipy, and build an application.

[Star ⭐ the Taipy repository](https://github.com/Avaiga/taipy)

Your support means a lot🌱, and really helps us in so many ways, like writing articles! 🙏

---

Our model will be trained on the ten categories present in the CIFAR dataset:

- airplane ✈️
- automobile 🚗
- bird 🦜
- cat 🐈
- deer 🦌
- dog 🐶
- frog 🐸
- horse 🐴
- ship ⚓

Our model will be able to classify images into these ten categories.

---

## [](https://dev.to/taipy/how-to-create-an-ai-photo-app-with-python-23g8?ref=dailydev#creating-a-neural-network-builder)Creating a Neural Network Builder

---

### [](https://dev.to/taipy/how-to-create-an-ai-photo-app-with-python-23g8?ref=dailydev#prerequisites)Prerequisites

- **_Python_**- The Python programming language should be available on your computer
- **_virtualenv_** - A tool for creating isolated virtual Python environments _I will be using virtualenv for this project; however, you can use your preference, like venv, or Conda, and adapt your commands._

**_IMPORTANT : Depending on your setup, you might need to use the command python or python3 when running commands in the terminal_**

---

### [](https://dev.to/taipy/how-to-create-an-ai-photo-app-with-python-23g8?ref=dailydev#setup)Setup

Ok, time to build!  
Run these commands to set your project up:  

```
mkdir ml-photo-app
cd ml-photo-app
mkdir neural-network-builder
cd neural-network-builder
virtualenv venv
source venv/bin/activate
cd venv
```

Now let's install the real deal, two Python libraries: **TensorFlow** and **numpy**- _a library for mathematical operations on arrays._

Use the following command:  

```
pip install tensorflow numpy
```

---

### [](https://dev.to/taipy/how-to-create-an-ai-photo-app-with-python-23g8?ref=dailydev#download-cifar-dataset)Download CIFAR dataset

But first, data!  
Now, let’s download the CIFAR-10 dataset from [here](https://www.cs.toronto.edu/~kriz/cifar.html).

[![CIFAR](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fbmvgqqxds91ps38n3pbm.png)](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fbmvgqqxds91ps38n3pbm.png)

The one we need is the _CIFAR-10 Python version_.  
When you download and unzip the files, you should see a folder named _cifar-10-batches-py_.  
Copy that folder and all the files inside the project we just created: _neural-network-builder/venv_.

---

### [](https://dev.to/taipy/how-to-create-an-ai-photo-app-with-python-23g8?ref=dailydev#python-script-generatemodelpy)Python script: generate-model.py

Create a file called _generate-model.py_.  
This will be our Python script for the model training and exporting.  
  
Add the code below to the _generate-model.py_.  

```python
import os
import shutil
import pickle
import numpy as np
import tensorflow as tf
from tensorflow.keras import datasets, layers, models

def load_cifar10_data(data_dir):
    train_images = []
    train_labels = []

    for i in range(1, 6):
        with open(os.path.join(data_dir, f'data_batch_{i}'), 'rb') as f:
            data_dict = pickle.load(f, encoding='bytes')
            images = data_dict[b'data']
            labels = data_dict[b'labels']

            train_images.extend(images)
            train_labels.extend(labels)

    train_images = np.array(train_images).reshape(-1, 3,
                                                  32, 32).transpose(0, 2, 3, 1)
    train_labels = np.array(train_labels)

    with open(os.path.join(data_dir, 'test_batch'), 'rb') as f:
        data_dict = pickle.load(f, encoding='bytes')
        test_images = data_dict[b'data'].reshape(
            -1, 3, 32, 32).transpose(0, 2, 3, 1)
        test_labels = np.array(data_dict[b'labels'])

    return (train_images, train_labels), (test_images, test_labels)


def build_model():
    # Define the model architecture
    model = models.Sequential()
    model.add(layers.Conv2D(
        32, (3, 3), activation='relu', input_shape=(32, 32, 3)))
    model.add(layers.MaxPooling2D((2, 2)))
    model.add(layers.Conv2D(64, (3, 3), activation='relu'))
    model.add(layers.MaxPooling2D((2, 2)))
    model.add(layers.Conv2D(64, (3, 3), activation='relu'))

    # Add dense layers on top
    model.add(layers.Flatten())
    model.add(layers.Dense(64, activation='relu'))
    model.add(layers.Dense(10))

    return model

def train_model(model, train_images, train_labels, test_images, test_labels):
    # Compile and train the model
    model.compile(optimizer='adam',
                  loss=tf.keras.losses.SparseCategoricalCrossentropy(
                      from_logits=True),
                  metrics=['accuracy'])

    history = model.fit(train_images, train_labels, epochs=50,
                        validation_data=(test_images, test_labels))

    # Check if the model directory exists
    if os.path.exists('model'):
        # If it does, delete it
        shutil.rmtree('model')
    # Recreate the model directory
    os.makedirs('model')

    # Save the model
    model.save('model/cifar-10-batches-py-model.keras')

    return history

# Load and preprocess the CIFAR10 dataset
data_dir = 'C:/Users/marin/Documents/GitHub/AB/ml-photo-app/neural-network-builder/venv/cifar-10-batches-py'
(train_images, train_labels), (test_images,
                               test_labels) = load_cifar10_data(data_dir)


# Normalize pixel values to be between 0 and 1
train_images, test_images = train_images / 255.0, test_images / 255.0

# Build and train the model
model = build_model()
history = train_model(model, train_images, train_labels,
                      test_images, test_labels)


# Print the history dictionary
print(history.history)
```

---

### [](https://dev.to/taipy/how-to-create-an-ai-photo-app-with-python-23g8?ref=dailydev#run-the-generatemodelpy-script)Run the _generate-model.py_ script

Moment of truth! Run your file.  
This file will build, train, and save our model.  
  
Depending on your computer, this process can take more or less time.

Let’s focus on the parameter called epochs in our script, which is set to _epochs=50._

[![epochs](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fcb3mclcefqy3472itcv2.png)](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fcb3mclcefqy3472itcv2.png)

An epoch is an important hyperparameter, representing one complete cycle through all training datasets.  
Each sample will update the model’s parameters.  
This cycle is not about the time it takes but the number of times it runs through the data.  
This key parameter influences the training process. Indeed, having more epochs affects the model’s learning rate.  
  
The higher the number, the longer it will take to train the model.

Underfitting could happen if there are insufficient epochs for the model to identify the underlying patterns in the data. However, an excessive number of epochs might cause the model to overfit the training set, resulting in subpar generalization on fresh, untried data.

To run the script, use this command here (you might need to use _python_ or _python3_):  

```python
python3 generate-model.py
```

Now, a little patience! Wait for your model to be trained and saved in the _model_ folder.  
When creating our GUI front end, we will copy that model folder.  
Now, let’s add a GUI to play with our model!

---

## [](https://dev.to/taipy/how-to-create-an-ai-photo-app-with-python-23g8?ref=dailydev#build-our-gui-using-taipy)Build our GUI using Taipy

### [](https://dev.to/taipy/how-to-create-an-ai-photo-app-with-python-23g8?ref=dailydev#setup)Setup

Navigate back to the main project folder ml-photo-app and then run these scripts to set up our interface:  

``` bash
mkdir frontend
cd frontend
virtualenv venv
source venv/bin/activate
cd venv
```

Now, let’s install the Python libraries we will be using:

- Taipy
- TensorFlow
- Numpy
- Pillow ( PIL) - Python imaging library

Run this command:  

```python
pip install taipy tensorflow pillow numpy
```

---

### [](https://dev.to/taipy/how-to-create-an-ai-photo-app-with-python-23g8?ref=dailydev#frontend-folder)Frontend folder

Let’s get our fresh new model and copy it from our neural-network-builder project into our frontend folder.  
Create two files in our root folder inside of _frontend_:

- _index.py_
- _index.css_.

These are the files we will run for our GUI.

---

### [](https://dev.to/taipy/how-to-create-an-ai-photo-app-with-python-23g8?ref=dailydev#set-your-css-preferences-indexcss)Set your CSS preferences: index.css

Add this code to the index.css file we just made:  

```css
@import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:ital,wght@0,100;0,300;0,400;0,500;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,700;1,800;1,900&display=swap');

body {
  background: rgb(36, 57, 86);

  font-family: 'Alegreya Sans', sans-serif;

  font-weight: 400;

  font-style: normal;

  font-size: 18px;
}

.container {
  margin: 0 auto;
}

.attachment,
.prediction {
  display: flex;

  flex-flow: row nowrap;

  align-items: center;
}

.attachment div {
  margin: 1rem;
}

.prediction p {
  margin-right: 1rem;
}
```

---

### [](https://dev.to/taipy/how-to-create-an-ai-photo-app-with-python-23g8?ref=dailydev#create-the-indexpy-python-script)Create the index.py Python script

To create an application with Taipy, you can use Markdown, the Python API, or HTML.  
In this tutorial, we will use the **HTML** method, but feel free to use whichever option!

And lastly, add this code to the _index.py_ script:  

``` python
from taipy.gui import Gui
from taipy.gui import Html
from tensorflow.keras import models
from PIL import Image
import tensorflow
import numpy as np


class_names = {
    0: 'airplane',
    1: 'automobile',
    2: 'bird',
    3: 'cat',
    4: 'deer',
    5: 'dog',
    6: 'frog',
    7: 'horse',
    8: 'ship',
    9: 'truck',
}


model = models.load_model("C:/Users/marin/Documents/GitHub/AB/ml-photo-app/model/cifar-10-batches-py-model.keras")


def predict_image(model, path_to_img):
    img = Image.open(path_to_img)
    img = img.convert("RGB")
    img = img.resize((32, 32))
    data = np.asarray(img)
    data = data / 255
    logits = model.predict(np.array([data])[:1])
    probs = tensorflow.nn.softmax(logits).numpy()

    top_prob = probs.max()
    top_pred = class_names[np.argmax(probs)]

    return top_prob, top_pred


opt = tensorflow.keras.optimizers.legacy.Adam(learning_rate=0.1)


content = ""
img_path = "https://placehold.co/600?text=No+Image+Available&font=roboto"
prob = 0
pred = ""


html_page = Html("""
<div class="container">
<h1>Machine Learning Photo App</h1>
<p>There is a prediction indication that ranges from 0 to 100. The greater the value, the more certain the machine model is that the prediction is true. This all depends on the Neural Network Builder model that we generated. The longer you train the model, the smarter it will get. If it does not have enough training time, it will make incorrect predictions.</p>
<div class="attachment">
<div><taipy:file_selector extensions=".png">{content}</taipy:file_selector></div>
<div><p>Choose an image from your computer to upload</p></div>
</div>
<div>
<taipy:image>{img_path}</taipy:image>
<taipy:indicator min="0" max="100" width="25vw" height="25vh" orientation="vertical" value="{prob}">{prob}</taipy:indicator>
</div>
<div class="prediction">
<p>Prediction:</p><div><taipy:text>{pred}</taipy:text></div>
</div>
</div>
""")

def on_change(state, var_name, var_val):
    if var_name == "content":
        top_prob, top_pred = predict_image(model, var_val)
        state.prob = round(top_prob * 100)
        state.pred = "Its a " + top_pred
        state.img_path = var_val


app = Gui(page=html_page)

if __name__ == "__main__":
    app.run(use_reloader=True, port=8000)
```

Our application will run on the 8000 port here, but feel free to change it.

---

### [](https://dev.to/taipy/how-to-create-an-ai-photo-app-with-python-23g8?ref=dailydev#run-the-application)Run the application

``` python
app.run(use_reloader=True, port=8000)
```

With the _use_realoder_ set to *True”, if you make any changes to your GUI code, you don’t have to rerun everything; just refresh your application page.

To run our app, use this command here:  

``` python
taipy run index.py
```

---

### [](https://dev.to/taipy/how-to-create-an-ai-photo-app-with-python-23g8?ref=dailydev#how-to-use-the-application)How to use the application?

Upload any _.png_, preferably with an image part of these ten categories!

- airplane
- automobile
- bird
- cat
- deer
- dog
- frog
- horse
- ship

Have fun seeing how your application classifies images!

---

## [](https://dev.to/taipy/how-to-create-an-ai-photo-app-with-python-23g8?ref=dailydev#final-thoughts)Final Thoughts

Our project is completed!

We used Python to create an image classifier model that we could use directly through a GUI with Taipy. Don't hesitate to check out Tensflow's and Taipy's documentation if you want to make a more comprehensive application.

Feedback welcomed!