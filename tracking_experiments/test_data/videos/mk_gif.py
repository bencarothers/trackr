from moviepy.editor import *
clip = VideoFileClip("bench.mp4").subclip((32),(42)).resize(width=240)
clip.write_gif("test2.gif", fps=1)
