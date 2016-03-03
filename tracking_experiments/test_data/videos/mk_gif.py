from moviepy.editor import *
clip = VideoFileClip("bench.mp4").subclip((22.65),(41)).resize(.25)
clip.write_gif("test.gif", fps=12,fuzz=30)
