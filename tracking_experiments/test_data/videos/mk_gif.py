from moviepy.editor import *
clip = VideoFileClip("deadlift.mp4")
clip.write_gif("vid.gif")
