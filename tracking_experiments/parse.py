from optparse import OptionParser
#Globals
number = 0
def main():
	parser = OptionParser(usage = "usage: %prog [options]", version = "%prog 1.0")

	parser.add_option("-n", "--number",
					 action = "store_true",
					 dest = "number",
					 default = 5,
					 help = "Add a number to countdown from")

	(options, args) = parser.parse_args()
	try:
		num = int(args[number])
		if type(num) == type(1):
			for i in range(num, 0, -1):
				print i
	except ValueError:
		print "n must be an integer"

	
if __name__ == "__main__":
	main()