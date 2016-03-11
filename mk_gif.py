from moviepy.editor import *
clip = VideoFileClip("bench.mp4").subclip((32),(42)).resize(width=325,height=325)
clip.write_gif("test2.gif", fps=1)
