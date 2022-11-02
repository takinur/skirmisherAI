import pickle
import json
import re
import string
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
import nltk
from rich import print, print_json
from tensorflow import keras
import sys
import numpy as np
import os

import tensorflow as tf
tf.compat.v1.logging.set_verbosity(
    tf.compat.v1.logging.ERROR)  # Disable GPU Warning for TF'


# from tensorflow.keras.preprocessing.text import Tokenizer
# from tensorflow.keras.preprocessing.sequence import pad_sequences


# nltk.download('stopwords')
# nltk.download('punkt')


class resumeScreener:
    def __init__(self):
        self.stopwords_set = set(stopwords.words('english')+['``', "''"])
        self.max_length = 500
        self.trunc_type = 'post'
        self.padding_type = 'post'

    def _clean_resume(self, resume_text):
        resume_text = re.sub('http\S+\s*', ' ', resume_text)  # remove URLs
        resume_text = re.sub('RT|cc', ' ', resume_text)  # remove RT and cc
        resume_text = re.sub('#\S+', '', resume_text)  # remove hashtags
        resume_text = re.sub('@\S+', '  ', resume_text)  # remove mentions
        resume_text = re.sub('[%s]' % re.escape(
            """!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"""), ' ', resume_text)  # remove punctuations
        resume_text = re.sub(r'[^\x00-\x7f]', r' ', resume_text)
        # remove extra whitespace
        resume_text = re.sub('\s+', ' ', resume_text)
        resume_text = resume_text.lower()  # convert to lowercase
        resume_text_tokens = word_tokenize(resume_text)  # tokenize
        # remove stopwords
        filtered_text = [
            w for w in resume_text_tokens if not w in self.stopwords_set]
        return ' '.join(filtered_text)

    def screenResume(self, text):
        # Get feature text tokenizer used for model training
        tokenizer_path = os.path.join(os.path.dirname(
            __file__), 'assets/tokenizer/feature_tokenizer.pickle')
        with open(tokenizer_path, 'rb') as handle:
            feature_tokenizer = pickle.load(handle)

        # Get label encoding dictionary from model training
        dic_path = os.path.join(os.path.dirname(
            __file__), 'assets/dictionary/dictionary.pickle')
        with open(dic_path, 'rb') as handle:
            encoding_to_label = pickle.load(handle)

        # Handle unknown label case and load original labels
        encoding_to_label[0] = 'unknown'
        label_path = os.path.join(os.path.dirname(
            __file__), 'assets/data/labels.json')
        with open(label_path, "r") as read_file:
            original_labels = json.load(read_file)

        cleaned_input = self._clean_resume(text)
        # Convert user input to padded sequence
        predict_sequences = feature_tokenizer.texts_to_sequences([
                                                                 cleaned_input])
        # predict_padded = pad_sequences(predict_sequences, maxlen=self.max_length, padding=self.padding_type, truncating=self.trunc_type)
        predict_padded = tf.keras.utils.pad_sequences(
            predict_sequences, maxlen=self.max_length, padding=self.padding_type, truncating=self.trunc_type)
        predict_padded = np.array(predict_padded)

        # Load model and make prediction
        model_path = os.path.join(os.path.dirname(__file__), 'assets/model/')
        model = keras.models.load_model(model_path)
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


def wrapper(text, label):
    # text = 'TAKINUR I MAHIM Dhaka, Bangladesh takinurm@gmail.com takinur.com github.com/takinur linkedin.com/in/takinur 2019 - Ongoing B.Sc. (hons.) in Computing University of Greenwich EDUCATION Relevant Coursework: Computing Project, Software Development Technique, Dynamic Website, Human Computer Interaction Design, Object-Oriented Programming, Database Administration PROFESSIONAL EXPERIENCE Full-Stack Web Developer (Freelance) Modified existing websites to correct coding errors, features add and workflow changes. Implemented mobile-first with usable components for better UX. Worked closely with clients to collect requirements and to ensure product quality. Designed and created UI that is optimized and SEO friendly. Configured web servers and deployed production ready website. 2021 - Ongoing SKILLS Programming: Python, JavaScript, TypeScript, PHP, HTML, CSS, SQL Technologies: Docker, Git, Bash, Node.JS, Figma, AWS, Linux, Composer, Vite, RestAPI, Testing Django, FastAPI, React, TailwindCSS, VUE, Laravel, Bootstrap, Next, Nuxt, Express Frameworks: Databases: PostgreSQL, MySQL, Oracle, MongoDB, SQLite Other: English Language, Tensorflow, Pandas, Matplotlib, Agile, OOP, Quick Learner PROJECTS Developed a booking site for consumers to book, manage and track parcel. Implemented HR Management and three-way user management system. Made a customized process for flawless payment with Stripe API. E-Courier Web Application PHP, Laravel, JavaScript, TailwindCSS, MySQL, VUE.JS Reversed Job Platform Python, FastAPI, PHP, Laravel, JavaScript, Bootstrap, MySQL Enabled users to post, manage and view jobs along with skills overview. Made a advance search feature to find and invite preferred candidate to hire. Talent Screening Web APP Python, Django, JavaScript, React, TailwindCSS, PostgreSQL, Redux, TensorFlow Developed a SPA Application with Restful API for automatic Resume Screening. Implemented Machine Leaning Algorithm to analyze and Suitability Prediction. Executed custom Natural Language Processing to extract essential info from Resume. Researched thoroughly and documented the study with background and scopes. Web Developer BIOVAAS TECH AID | Multiplan Center, 69-71 New Elephant Road, Dhaka Built and maintained website for E-Commerce Platform. Assisted troubleshooting software. Modified, extended as per requirements and performed white-box, black-box testing. Filed reports, gathered requirements, and performed research for extensibility. Jan 2020 - Jun 2021'
    rs = resumeScreener()

    # check prediction score for each label
    data = rs.screenResume(text)

    # Capitilize first letter of each title
    label = label.title()

    score = 0

    # Check if prediction inlcudes given label
    if label in data:
        score = data[label]
    else:
        # Return first label score
        score = list(data.values())[0]

    return score

# pickle.dump(resumeScreen,open("resumeScreener.pkl","wb"))


'''
Crucial for Debugging and Testing

---Take Argument from command line and Screen resume
---python resumeScreener.py "Resume Text"

'''

if __name__ == '__main__':
    # text = 'TAKINUR I MAHIM Dhaka, Bangladesh takinurm@gmail.com takinur.com github.com/takinur linkedin.com/in/takinur 2019 - Ongoing B.Sc. (hons.) in Computing University of Greenwich EDUCATION Relevant Coursework: Computing Project, Software Development Technique, Dynamic Website, Human Computer Interaction Design, Object-Oriented Programming, Database Administration PROFESSIONAL EXPERIENCE Full-Stack Web Developer (Freelance) Modified existing websites to correct coding errors, features add and workflow changes. Implemented mobile-first with usable components for better UX. Worked closely with clients to collect requirements and to ensure product quality. Designed and created UI that is optimized and SEO friendly. Configured web servers and deployed production ready website. 2021 - Ongoing SKILLS Programming: Python, JavaScript, TypeScript, PHP, HTML, CSS, SQL Technologies: Docker, Git, Bash, Node.JS, Figma, AWS, Linux, Composer, Vite, RestAPI, Testing Django, FastAPI, React, TailwindCSS, VUE, Laravel, Bootstrap, Next, Nuxt, Express Frameworks: Databases: PostgreSQL, MySQL, Oracle, MongoDB, SQLite Other: English Language, Tensorflow, Pandas, Matplotlib, Agile, OOP, Quick Learner PROJECTS Developed a booking site for consumers to book, manage and track parcel. Implemented HR Management and three-way user management system. Made a customized process for flawless payment with Stripe API. E-Courier Web Application PHP, Laravel, JavaScript, TailwindCSS, MySQL, VUE.JS Reversed Job Platform Python, FastAPI, PHP, Laravel, JavaScript, Bootstrap, MySQL Enabled users to post, manage and view jobs along with skills overview. Made a advance search feature to find and invite preferred candidate to hire. Talent Screening Web APP Python, Django, JavaScript, React, TailwindCSS, PostgreSQL, Redux, TensorFlow Developed a SPA Application with Restful API for automatic Resume Screening. Implemented Machine Leaning Algorithm to analyze and Suitability Prediction. Executed custom Natural Language Processing to extract essential info from Resume. Researched thoroughly and documented the study with background and scopes. Web Developer BIOVAAS TECH AID | Multiplan Center, 69-71 New Elephant Road, Dhaka Built and maintained website for E-Commerce Platform. Assisted troubleshooting software. Modified, extended as per requirements and performed white-box, black-box testing. Filed reports, gathered requirements, and performed research for extensibility. Jan 2020 - Jun 2021'

    # Check if the number of arguments is correct
    args_len = len(sys.argv)
    if args_len > 1:
        text = sys.argv[1]

    # Extracted data from the resume class
    data = wrapper(text, 'Web developer')

    print(data)
