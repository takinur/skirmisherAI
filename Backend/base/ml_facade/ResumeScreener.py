import sys
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import nltk
from nltk.corpus import stopwords
#nltk.download('stopwords')
#nltk.download('punkt')
from nltk.tokenize import word_tokenize
import string
import re
import json
import pickle
import os
import sys,fitz

class resumeScreener:
    def __init__(self):
        self.stopwords_set = set(stopwords.words('english')+['``',"''"])
        self.max_length = 500
        self.trunc_type = 'post'
        self.padding_type = 'post'
    
    def _clean_resume(self, resume_text):
        resume_text = re.sub('http\S+\s*', ' ', resume_text)  # remove URLs
        resume_text = re.sub('RT|cc', ' ', resume_text)  # remove RT and cc
        resume_text = re.sub('#\S+', '', resume_text)  # remove hashtags
        resume_text = re.sub('@\S+', '  ', resume_text)  # remove mentions
        resume_text = re.sub('[%s]' % re.escape("""!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"""), ' ', resume_text)  # remove punctuations
        resume_text = re.sub(r'[^\x00-\x7f]',r' ', resume_text) 
        resume_text = re.sub('\s+', ' ', resume_text)  # remove extra whitespace
        resume_text = resume_text.lower()  # convert to lowercase
        resume_text_tokens = word_tokenize(resume_text)  # tokenize
        filtered_text = [w for w in resume_text_tokens if not w in self.stopwords_set]  # remove stopwords
        return ' '.join(filtered_text)
    
    def screenResume(self, text):
        # Get feature text tokenizer used for model training
        with open('assets/tokenizer/feature_tokenizer.pickle', 'rb') as handle:
            feature_tokenizer = pickle.load(handle)

        # Get label encoding dictionary from model training
        with open('assets/dictionary/dictionary.pickle', 'rb') as handle:
            encoding_to_label = pickle.load(handle)

        # Handle unknown label case and load original labels
        encoding_to_label[0] = 'unknown'
        with open("assets/data/labels.json", "r") as read_file:
            original_labels = json.load(read_file)
        
        cleaned_input = self._clean_resume(text)
        # Convert user input to padded sequence
        predict_sequences = feature_tokenizer.texts_to_sequences([cleaned_input])
        predict_padded = pad_sequences(predict_sequences, maxlen=self.max_length, padding=self.padding_type, truncating=self.trunc_type)
        predict_padded = np.array(predict_padded)
        
        # Load model and make prediction
        model = keras.models.load_model('assets/model')
        prediction = model.predict(predict_padded)
        
        # Get encodings of top 5 results
        encodings = np.argpartition(prediction[0], -8)[-8:]
        encodings = encodings[np.argsort(prediction[0][encodings])]
        encodings = reversed(encodings)
        
        data = {}
        # Send results of top 5 encodings and confidences to output
        for encoding in encodings:
            label = encoding_to_label[encoding]
            probability = prediction[0][encoding] * 100
            probability = round(probability, 2)
            data[original_labels[label]] = probability
        
        return data

resumeScreen = resumeScreener()

print(resumeScreen)
# pickle.dump(resumeScreen,open("resumeScreener.pkl","wb"))
