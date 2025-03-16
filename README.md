# Django + React stack

This project consists of a Django backend serving json to a UI built with React.

# Installation

The backend was built with python 3.11. Versions >3.8 should be viable but could require a different combination of package versions. Required packages can be installed with.

```
pip install -r prices_api/requirements.txt
```

For the frontend packages.

```
cd src
npm install
```

# Local deployment

From the price_api folder running the following command makes the necessary migrations 

```
py manage.py migrate
```

The following runs the server listening on port 8000.

```
py manage.py runserver
```

To initialize the sqlite database with the data in price_api/input_data.json, simply hitting the "load" endpoint is sufficient, i.e., go to localhost:8000/load.

Running the following command from the root starts the frontend on port 5173.
```
npm run dev
```