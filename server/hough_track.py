import matplotlib.pyplot as plt
import numpy
try:
    import cv2
except ImportError:
    import pip
    installed_packages = pip.get_installed_distributions()
    installed_packages_list = sorted(["%s==%s" % (i.key, i.version)
                                           for i in installed_packages])
    print(installed_packages_list)                                                                                             for i in installed_packages])
#Open the video, read the first frame, and get the shape of the window

class Trackr_Vid:
    def __init__(self, input_video):
    # Globals to hold all the points for graphing as well as drawing the path
        self.input_video_path = input_video
        self.video = None
        self.frame = None
        self.width = None
        self.path_array = []
        self.xs = []
        self.ys = []

        #main algorithm
        self.video, self.frame = self.video_capture()
        circles = self.find_circles(self.video)
        self.point_to_track(circles)


    def video_capture(self):
        form_video = cv2.VideoCapture(self.input_video_path)
        ret, frame = form_video.read()
        height, self.width, depth = frame.shape
        return form_video, frame.copy()

    def find_circles(self, video):
        video = cv2.medianBlur(self.frame, 5)
        gray = cv2.cvtColor(video, cv2.COLOR_BGR2GRAY)
        circles = cv2.HoughCircles(image = gray, method = cv2.cv.CV_HOUGH_GRADIENT,
            dp = 1.2, minDist = 700, minRadius = 40)
        return circles

    def point_to_track(self, circles):
        circles = numpy.round(circles[0,:]).astype('int')
        x, y, r = circles[0].tolist()


#Find the initial point to track using houghCircles
        previousXValue = x
        previousYValue = y
        xSub = x
        ySub = y

        #a 10 x 10 bounding box around the center of the circle
        r,h,c,w = y+5,10,x-5,10
        track_window = (c,r,w,h)

        #set up the ROI for tracking
        roi = self.frame[r:r+h, c:c+w]
        hsv_roi =  cv2.cvtColor(self.frame, cv2.COLOR_BGR2HSV)
        mask = cv2.inRange(hsv_roi, numpy.array((0., 60.,32.)), numpy.array((180.,255.,255.)))
        roi_hist = cv2.calcHist([hsv_roi],[0],mask,[180],[0,180])
        cv2.normalize(roi_hist,roi_hist,0,255,cv2.NORM_MINMAX)

        term_crit = ( cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 10, 1 )

        while(1):

            ret, self.frame = self.video.read()
            if ret == True:
                # alter the frame to allow for accurate meanshift
                hsv = cv2.cvtColor(self.frame, cv2.COLOR_BGR2HSV)
                dst = cv2.calcBackProject([hsv],[0],roi_hist,[0,180],1)
                ret, track_window = cv2.meanShift(dst, track_window, term_crit)

                x,y,w,h = track_window

                #append for drawing and graphing
                self.path_array.append((previousXValue, previousYValue, x, y))
                self.xs.append(x - xSub)
                self.ys.append(-1*(y - ySub))
                # draw
                for line in self.path_array:
                    oldX,oldY,nextX,nextY = line
                    cv2.line(self.frame,(oldX+h,oldY+h),(nextX+h,nextY+h),(0,255,0),3)

                previousXValue = x
                previousYValue = y
                cv2.imshow('path',self.frame)
                k = cv2.waitKey(60) & 0xff
                if k == 27:
                    break
            else:
                break

#        plt.plot(self.xs, self.ys)
#        plt.axis([-self.width,self.width,0,max(self.ys)+30])
#        plt.title('Bar Path')
#        plt.axvline(0,linestyle='solid')
#        plt.show()

        cv2.destroyAllWindows()
        self.video.release()
