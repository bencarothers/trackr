import numpy
import cv2

input = cv2.imread("videos/bensPath.jpg")
output = image.copy()
gray = cv2.cvtColor(input, cv2.COLOR_BGR2GRAY)

# The following function requires some fine tuning depending on the image chosen
circles = cv2.HoughCircles(gray, cv2.cv.CV_HOUGH_GRADIENT, 1.3, 750)

if circles is not None:
    # convert coordinates to integers
    circles = numpy.round(circles[0, :]).astype("int")

    for (x, y, r) in circles:
        # draw a circle for each found
        cv2.circle(output, (x, y), r, (0, 255, 0), 4)

cv2.imwrite("images/plateFound.png",output) 

