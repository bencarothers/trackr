import numpy
import cv2

input = cv2.imread("test_data/images/deadlift.png")
output = input.copy()
gray = cv2.cvtColor(input, cv2.COLOR_BGR2GRAY)

# The following function requires some fine tuning depending on the image chosen
circles = cv2.HoughCircles(gray, cv2.cv.CV_HOUGH_GRADIENT, 1.3, 750)

if circles is not None:
    # convert coordinates to integers
    print 'uh'
    circles = numpy.round(circles[0, :]).astype("int")

    for (x, y, r) in circles:
        # draw a circle for each found
        cv2.circle(output, (x, y), r, (0, 255, 0), 4)
        print 'stuff is happenin'

cv2.imwrite("test_data/images/plate_found.png",output)

