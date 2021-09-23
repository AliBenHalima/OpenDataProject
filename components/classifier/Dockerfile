FROM tensorflow/tensorflow:2.6.0 as base
WORKDIR /app

ADD requirements.txt .
RUN pip install -r requirements.txt

COPY . .

ENV MODEL_PATH=/app/models/v0/model.h5
ENV TOKENIZER_PATH=/app/models/v0/tokenizer.pickle

CMD python src/api.py