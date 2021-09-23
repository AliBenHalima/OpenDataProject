import pandas as pd
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer
import pickle
import re
import h5py

MAX_SEQUENCE_LENGTH = 80


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
    with  h5py.File(model_path,'r') as fileObj:
        model = tf.keras.models.load_model(fileObj)
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
