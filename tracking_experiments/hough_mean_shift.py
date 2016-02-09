import matplotlib.pyplot as plt
import numpy
import cv2

try:
    from line_profiler import LineProfiler

    def do_profile(follow=[]):
        def inner(func):
            def profiled_func(*args, **kwargs):
                try:
                    profiler = LineProfiler()
                    profiler.add_function(func)
                    for f in follow:
                        profiler.add_function(f)
                    profiler.enable_by_count()
                    return func(*args, **kwargs)
                finally:
                    profiler.print_stats()
            return profiled_func
        return inner

except ImportError:
    def do_profile(follow=[]):
        "Helpful if you accidentally leave in production!"
        def inner(func):
            def nothing(*args, **kwargs):
                return func(*args, **kwargs)
            return nothing
        return inner

class Trackr:
    
    def __init__(self, input_video_path):
    # Globals to hold all the points for graphing as well as drawing the path
        self.input_video_path = input_video_path
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
        print type(frame)
        height, self.width, depth = frame.shape
        return form_video, frame.copy()

    def find_circles(self, video):
        video = cv2.medianBlur(self.frame, 5)
        gray = cv2.cvtColor(video, cv2.COLOR_BGR2GRAY)
        #The 2-1 Hough Transform. Considered best for tracking images of real circles.
        #Looking into this may be an avenue for pulling out better performance.
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
                k = cv2.waitKey(1) & 0xff
                if k == 27:
                    break
            else:
                break

        plt.plot(self.xs, self.ys)
        plt.axis([-self.width,self.width,0,max(self.ys)+30])
        plt.title('Bar Path')
        plt.axvline(0,linestyle='solid')
        plt.show()

        cv2.destroyAllWindows()
        self.video.release()

if __name__ == "__main__":
    Trackr("test_data/videos/deadlift.mp4")