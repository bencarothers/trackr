import numpy as np
import cv2

formVideo = cv2.VideoCapture('videos/dum.mp4')
pathArray = []
ret,frame = formVideo.read()
previousXValue = 100
previousYValue = 440 

#These are hardcoded at the moment
#Ultimately I think I should be using Hoff here
r,h,c,w = 440,20,100,20
track_window = (c,r,w,h)

# set up the ROI for tracking
roi = frame[r:r+h, c:c+w]
hsv_roi =  cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
mask = cv2.inRange(hsv_roi, np.array((0., 60.,32.)), np.array((180.,255.,255.)))
roi_hist = cv2.calcHist([hsv_roi],[0],mask,[180],[0,180])
cv2.normalize(roi_hist,roi_hist,0,255,cv2.NORM_MINMAX)

# Setup the termination criteria, either 10 iteration or move by at least 1 pt
term_crit = ( cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 10, 1 )

while(1):
    ret ,frame = formVideo.read()
    if ret == True:

        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        dst = cv2.calcBackProject([hsv],[0],roi_hist,[0,180],1)

        # apply meanshift to get the new location
        ret, track_window = cv2.meanShift(dst, track_window, term_crit)

        x,y,w,h = track_window
        cv2.rectangle(frame, (x,y), (x+w,y+h), 255,2)
        pathArray.append((previousXValue, previousYValue, x, y))
        for line in pathArray:
            oldX,oldY,nextX,nextY = line
            cv2.line(frame,(oldX,oldY),(nextX,nextY),(0,255,0),4)
        previousXValue = x
        previousYValue = y

        cv2.imshow('path',frame)
        k = cv2.waitKey(60) & 0xff
        if k == 27:
            break
    else:
        break

cv2.destroyAllWindows()
formVideo.release()
