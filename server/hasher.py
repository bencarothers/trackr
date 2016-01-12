from hashlib import sha1

def hash_alg(toHash):
	data = sha1(toHash)
	return data.hexdigest()

