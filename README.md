# Trackr

[![Build Status](https://travis-ci.org/bencarothers/trackr.svg?branch=master)](https://travis-ci.org/bencarothers/trackr)
[![Coverage Status](https://coveralls.io/repos/bencarothers/trackr/badge.svg?branch=master&service=github)](https://coveralls.io/github/bencarothers/trackr?branch=master)
[![Heroku](https://heroku-badge.herokuapp.com/?app=bartrackr)]

## Development Notes

### Required Tools

* Bower for gathering front-end packages 
* Npm for gathering node packages
* Pip for Python Packages
* Webpack for converting JSX

### Installation

* Create a virtual environment
    - Python version is ```2.7.9```
    - Once activated run ```python setup.py install```
    - This will take care of all of the Python dependencies
* With Bower installed run ```bower install``` from the root directory of the project
    - Front-end dependencies will be installed in ```static/libraries```
* Run ```npm install``` Node packages will be installed in the project root
    - Optionally link ```ln -s node_modules ./server/static/```
* In the project root run ```webpack --config webpack.js``` to convert the js

### Running the site
```python server/trackr.py```

### Components
* React 
    - Javascript methodology of componentizing JS and HTML into a single file
* Jquery
    - DOM manipulation
* Bootstrap
    - Stylistic and box model standardization 
* Flask
    - Nice lil extensible WSGI server


![Tracked Path](https://github.com/bencarothers/Trackr/blob/master/tracking_experiments/test_data/images/deadlift.png)
![Tracked Path](https://github.com/bencarothers/Trackr/blob/master/tracking_experiments/test_data/images/deadlift_path.png)
