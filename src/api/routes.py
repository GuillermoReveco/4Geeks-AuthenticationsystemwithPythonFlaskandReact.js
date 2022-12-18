"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from sqlalchemy import create_engine
import os
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from typing import List

api = Blueprint('api', __name__)


# engine = create_engine(os.environ.get('DATABASE_URL'))

# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200

# @api.route("/user", methods=["GET"])
# def getUsers():

#     users = User.query.all()
#     # users_list = list(map(lambda x: x.serialize(), users))    
    
#     # return jsonify(users_list), 200    
#     list_users=list()
#     for user in users:
#         list_users.append({"email":user.email,"password":user.password})
#         print(list_users)
#     return jsonify({"lista":list_users}),200

# @api.route('/prueba', methods=["GET"])
@api.route('/prueba')
def prueba():
    users=User.query.all()
    list_users=list()
    for user in users:
        list_users.append({"email":user.email,"password":user.password})
        print(list_users)
    return jsonify({"lista":list_users}),200

@api.route('/login', methods=['POST'])
def login():
    email=request.json.get("email")
    password= request.json.get("password")

    user = User.query.filter_by(email=email).one_or_none()
    if not user or not user.check_password(password, user.password):
        return jsonify({"msg": "Bad username or password"}), 401
    else:
        aux=user.id
        access_token = create_access_token(identity=aux)
        return jsonify({ "token": access_token, "user_id": aux}),200

# @api.route("/user", methods=["GET"])
# @jwt_required()
# def get_user():
#     # Access the identity of the current user with get_jwt_identity
#     current_user_id = get_jwt_identity()
#     # current_user_id=1
#     print("CURREN: ",current_user_id)
#     user = User.query.filter_by(email=current_user_id).one_or_none()
#     print("user: ",type(user))  
#     return jsonify({"id":user.id, "username": user.email }), 200

@api.route('/user', methods=['POST'])
def create_user():
    user=User()
    user.email=request.json.get("email")
    user.password=request.json.get("password")
    user.is_active=True
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg":"usuario creado"})

@api.route("/user", methods=["GET"])
@jwt_required()
# def protected():
def get_user():
    # Access the identity of the current user with get_jwt_identity
    user_id = get_jwt_identity()
    print("ID: ",user_id)
    user = User.query.filter_by(id=user_id).one_or_none()
    print("user: ",type(user))  
    return jsonify({"id":user.id, "mail": user.email }), 200
