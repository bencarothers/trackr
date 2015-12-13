# Trackr

## Development Notes

### Required Tools

* Bower (Gathering JS dependencies)
* React-tools (Converting JSX => JS)

### Installation

* Create a virtual environment
    - Python version is ```2.7.9```
    - Once activated run ```python setup.py install```
    - This will take care of all of the Python dependencies
* With Bower installed run ```bower install``` from the root directory of the project
    - Front-end dependencies will be installed in ```static/libraries```
* Once you have the babel-cli React tools run ```jsx server/static/jsx server/static/js```
    - This converts your files written in React JSX to browser readable JS

### Running the site
```python server/trackr.py```

### Components
* RequireJS
    - Used to deal with dependencies required throughout all of the JS files
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
