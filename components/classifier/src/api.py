import flask
from flask import request, jsonify
import pandas as pd
import json
from datetime import datetime
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer
import numpy as np
import pickle
import re
MAX_SEQUENCE_LENGTH = 80

MODEL_PATH = "model.h5"
TOKENIZER_PATH = "tokenizer.pickle"
def clean_text(text:pd.Series) -> pd.Series:
    #Remove emojis and special chars
    clean = text
    reg = re.compile('\\.+?(?=\B|$)')
    clean = text.apply(lambda r: re.sub(reg, string=r, repl=''))
    reg = re.compile('\x89Û_')
    clean = clean.apply(lambda r: re.sub(reg, string=r, repl=' '))
    reg = re.compile('\&amp')
    clean = clean.apply(lambda r: re.sub(reg, string=r, repl='&'))
    reg = re.compile('\\n')
    clean = clean.apply(lambda r: re.sub(reg, string=r, repl=' '))

    #Remove hashtag symbol (#)
    clean = clean.apply(lambda r: r.replace('#', ''))

    #Remove user names
    reg = re.compile('@[a-zA-Z0-9\_]+')
    clean = clean.apply(lambda r: re.sub(reg, string=r, repl='@'))

    #Remove URLs
    reg = re.compile('https?\S+(?=\s|$)')
    clean = clean.apply(lambda r: re.sub(reg, string=r, repl='www'))

    #Lowercase
    clean = clean.apply(lambda r: r.lower())
    return clean


def load_model(model_path:str,tokenizer_path:str):
    model = tf.keras.models.load_model(model_path)
    with open(tokenizer_path, 'rb') as handle:
        tokenizer = pickle.load(handle)
    return model ,tokenizer

def preproccess_text(texts, tokenizer):
    # do a quick test
    test_text = pd.Series(texts)
    testX = clean_text(test_text)
    testX = tokenizer.texts_to_sequences(test_text)
    testX = pad_sequences(testX, maxlen=MAX_SEQUENCE_LENGTH)
    return testX

# import sys
# # insert at 1, 0 is the script path (or '' in REPL)
# sys.path.insert(1, './QT-NLU/run_model.py')
# import run_model
# import run_model as f1

app = flask.Flask(__name__)
app.config["DEBUG"] = True

# f1.clean_text(pd.Series)



@app.route('/', methods=['GET'])
def home():
    return "<h1>Distant Reading Archive</h1><p>This site is a prototype API for distant reading of science fiction novels.</p>"


@app.route('/api/test', methods=['POST'])
def api_test():

    return request.form

@app.route('/api/post', methods=['POST'])
def api():

    # return request.form
    # os.environ['CUDA_VISIBLE_DEVICES'] = '-1'
    if tf.test.gpu_device_name():
        physical_devices = tf.config.list_physical_devices('GPU')
        tf.config.experimental.set_memory_growth(physical_devices[0], True)
        print('GPU found')
    else:
        print("No GPU found")
    print(tf.__version__)
    print(tf.config.list_physical_devices('GPU'))

    model , tokenizer = load_model(MODEL_PATH,TOKENIZER_PATH)

    input = [
        request.form['comment'],
        request.form['comment']
    ]

    model_input = preproccess_text(input , tokenizer)
    model_output = model.predict(model_input, verbose=True)
    print(request.form['comment'], model_output[0])
    print(request.form['comment'], model_output[1])
    print("done")
    d = type(model_output[0])
    result = {'data' : model_output[0].tolist()}

    return json.dumps(model_output[0].tolist()[0])
    # return {'result':model_output[0].tolist()[0]}


app.run()
