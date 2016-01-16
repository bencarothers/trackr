class User(object):
    def __init__(self, user_id):
        self.user_id = user_id

    @property 
    def is_active(self):
        return True

    @property
    def is_authenticated(self):
        return True 

    @property
    def is_anonymous(self):
        return False 

    def get_id(self):
        try:
            return unicode(self.user_id)
        except AttributeError:
            raise NotImplementedError("No `id` attribute.")

    def __eq__(self, other):
        if isinstance(other, User):
            return self.get_id() == other.get_id()
        return NotImplemented

    def __ne__(self, other):
        equal = self.__eq__(other)
        if equal is NotImplemented:
            return NotImplemented
        return not equal