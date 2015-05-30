import numpy as np
import cv2

formVideo = cv2.VideoCapture('../videos/1rep.mp4')
pathArray = []
ret,frame = formVideo.read()
previousXValue = None 
previousYValue = None 
flag = 0

term_crit = ( cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 10, 1 )

while(1):
    ret ,frame = formVideo.read()
    if ret == True:

        output = frame.copy()
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        circles = cv2.HoughCircles(gray, cv2.cv.CV_HOUGH_GRADIENT, 1.2, 700, minRadius = 40)
        circles = np.round(circles[0, :]).astype("int")
        lastr = 0
        for (x, y, r) in circles:
            nextX = x
            nextY = y

        #cv2.circle(output, (x, y), r, (0, 255, 0), 4)
        line = (x, y, x, y) if flag == 0 else (previousXValue, previousYValue, x, y) 
        pathArray.append(line)
        flag = 1

        for line in pathArray:
            oldX,oldY,nextX,nextY = line
            cv2.line(output,(oldX,oldY),(nextX,nextY),(100,255,0),4)
        previousXValue = x
        previousYValue = y

        cv2.imshow('path',output)
        k = cv2.waitKey(60) & 0xff
        if k == 27:
            break
    else:
        break

cv2.destroyAllWindows()
formVideo.release()
