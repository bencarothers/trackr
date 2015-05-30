import numpy
import cv2

input = cv2.imread("videos/bensPath.jpg")
output = image.copy()
gray = cv2.cvtColor(input, cv2.COLOR_BGR2GRAY)

circles = cv2.HoughCircles(gray, cv2.cv.CV_HOUGH_GRADIENT, 1.3, 750)

if circles is not None:
    # convert the (x, y) coordinates and radius of the circles to integers
    circles = numpy.round(circles[0, :]).astype("int")

    for (x, y, r) in circles:
        cv2.circle(output, (x, y), r, (0, 255, 0), 4)

cv2.imwrite("images/plateFound.png",output) 

