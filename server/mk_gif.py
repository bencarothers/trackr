from moviepy.editor import *
def make_gif(input_path, output_path):
	clip = VideoFileClip(input_path).subclip((32),(42)).resize(width=325)
	clip.write_gif(output_path, fps=1)
