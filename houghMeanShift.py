import matplotlib.pyplot as plt
import numpy
import cv2

#Open the video, read the first frame, and get the shape of the window
formVideo = cv2.VideoCapture('videos/1rep.mp4')
ret,frame = formVideo.read()
height, width, depth = frame.shape

# Globals to hold all the points for graphing as well as drawing the path
pathArray = []
xs = []
ys = []

#Find the initial point to track using houghCircles
output = frame.copy()
output = cv2.medianBlur(output,5)
gray = cv2.cvtColor(output, cv2.COLOR_BGR2GRAY)
circles = cv2.HoughCircles(gray, cv2.cv.CV_HOUGH_GRADIENT, 1.2, 700, minRadius = 40)
circles = numpy.round(circles[0, :]).astype("int")
x,y,r = circles[0].tolist()

previousXValue = x 
previousYValue = y 
xSub = x
ySub = y

# a 10 x 10 bounding box around the center of the circle
r,h,c,w = y+5,10,x-5,10
track_window = (c,r,w,h)

# set up the ROI for tracking
roi = frame[r:r+h, c:c+w]
hsv_roi =  cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
mask = cv2.inRange(hsv_roi, numpy.array((0., 60.,32.)), numpy.array((180.,255.,255.)))
roi_hist = cv2.calcHist([hsv_roi],[0],mask,[180],[0,180])
cv2.normalize(roi_hist,roi_hist,0,255,cv2.NORM_MINMAX)

term_crit = ( cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 10, 1 )

while(1):

    ret ,frame = formVideo.read()
    if ret == True:
        # alter the frame to allow for accurate meanshift
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        dst = cv2.calcBackProject([hsv],[0],roi_hist,[0,180],1)
        ret, track_window = cv2.meanShift(dst, track_window, term_crit)

        x,y,w,h = track_window

        #append for drawing and graphing
        pathArray.append((previousXValue, previousYValue, x, y))
        xs.append(x - xSub)
        ys.append(-1*(y - ySub))
        # draw
        for line in pathArray:
            oldX,oldY,nextX,nextY = line
            cv2.line(frame,(oldX+h,oldY+h),(nextX+h,nextY+h),(0,255,0),3)

        previousXValue = x
        previousYValue = y
        cv2.imshow('path',frame)
        k = cv2.waitKey(60) & 0xff
        if k == 27:
            break

    else:
        break

plt.plot(xs, ys)
plt.axis([-width,width,0,max(ys)+30])
plt.title('Bar Path')
plt.axvline(0,linestyle='solid')
plt.show()

cv2.destroyAllWindows()
formVideo.release()
