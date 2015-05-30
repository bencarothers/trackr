import matplotlib.pyplot as plt
import numpy
import cv2

formVideo = cv2.VideoCapture('../videos/1rep.mp4')
pathArray = []
xs = []
ys = []
ret,frame = formVideo.read()
height, width, depth = frame.shape

output = frame.copy()
output = cv2.medianBlur(output,5)
gray = cv2.cvtColor(output, cv2.COLOR_BGR2GRAY)
circles = cv2.HoughCircles(gray, cv2.cv.CV_HOUGH_GRADIENT, 1.2, 700, minRadius = 40)
circles = numpy.round(circles[0, :]).astype("int")
lastr = 0

for (x, y, r) in circles:
    X = x
    Y = y
    R = r
print x,y,r

# based on the bounding box
previousXValue = x 
previousYValue = y 

r,h,c,w = Y,10,X,10
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

        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        dst = cv2.calcBackProject([hsv],[0],roi_hist,[0,180],1)

        ret, track_window = cv2.meanShift(dst, track_window, term_crit)

        x,y,w,h = track_window
        # cv2.rectangle(frame, (x,y), (x+w,y+h), 255,2)

        pathArray.append((previousXValue, previousYValue, x, y))
        xs.append(x)
        ys.append(y)
        for line in pathArray:
            oldX,oldY,nextX,nextY = line
            cv2.line(frame,(oldX+h,oldY+h),(nextX+h,nextY+h),(0,255,0),4)

        previousXValue = x
        previousYValue = y

        cv2.imshow('path',frame)

        k = cv2.waitKey(60) & 0xff
        if k == 27:
            break

    else:
        break

plt.plot(xs, ys)
plt.axis([0,width,0,height])
plt.title('Bar Path')
plt.show()

cv2.destroyAllWindows()
formVideo.release()
