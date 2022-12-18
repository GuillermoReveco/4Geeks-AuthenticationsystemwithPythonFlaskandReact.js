from flask_sqlalchemy import SQLAlchemy
from hmac import compare_digest


db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    # NOTE: In a real application make sure to properly hash and salt passwords
    def check_password(self, password, password_user):
        # encMessage = fernet.encrypt(password.encode())
        # return compare_digest(str(encMessage), password_user)
        return compare_digest(password, password_user)
