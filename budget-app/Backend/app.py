from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from marshmallow import fields, validate, ValidationError
from sqlalchemy import Boolean

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session
from sqlalchemy import select, delete

from typing import List

from variables import db_password
import datetime
import re

from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, JWTManager
import secrets
from passlib.hash import pbkdf2_sha256
import bcrypt


app = Flask(__name__)
cors = CORS(app)

app.config["JWT_SECRET_KEY"] = "97260527711002338858562908657457184063"
jwt = JWTManager(app)


app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+mysqlconnector://root:{db_password}@localhost/spend_savvy"

class Base(DeclarativeBase):
  pass


db = SQLAlchemy(app, model_class=Base)
ma = Marshmallow(app)


class User(Base):
  __tablename__ = 'users'
  
  user_id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)
  firstname: Mapped[str] = mapped_column(db.String(255))
  lastname: Mapped[str] = mapped_column(db.String(255))
  username: Mapped[str] = mapped_column(db.String(255), unique=True)
  password: Mapped[str] = mapped_column(db.String(255))
  income: Mapped[str] = mapped_column(db.String(255))
  checking: Mapped[str] = mapped_column(db.String(255))
  savings: Mapped[str] = mapped_column(db.String(255))
  budget: Mapped[str] = mapped_column(db.String(255))

  goals: Mapped[List["Goal"]] = db.relationship("Goal", back_populates="user")


class Goal(Base):
  __tablename__ = "goals"
  goal_id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)
  user_id: Mapped[int] = mapped_column(db.ForeignKey("users.user_id"))
  amount: Mapped[str] = mapped_column(db.String(255))
  icon: Mapped[str] = mapped_column(db.String(255))
  text: Mapped[str] = mapped_column(db.String(255))
  isPrimary: Mapped[bool] = mapped_column(Boolean)
  
  user: Mapped["User"] = db.relationship("User", back_populates="goals")


with app.app_context():
    db.create_all()


# =========================================================
# ======================// Schemas //======================
# =========================================================
class GoalSchema(ma.Schema):
    goal_id = fields.Integer(required=False)
    user_id = fields.Integer(required=True)
    amount = fields.String(required=True)
    icon = fields.String(required=True)
    text = fields.String(required=True)
    isPrimary = fields.Boolean(required=True) 
   
    class Meta:
        fields = ("goal_id", "user_id", "amount", "icon", 'text', 'isPrimary')

goal_schema = GoalSchema()
goals_schema = GoalSchema(many=True)



class UserSchema(ma.Schema):
  user_id = fields.Integer(dump_only=True)
  firstname = fields.String(required=True)
  lastname = fields.String(required=True)
  username = fields.String(required=True)
  password = fields.String(required=True, validate=validate.Length(min=8))
  income = fields.String(required=True)
  checking = fields.String(required=True)
  savings = fields.String(required=True)
  budget = fields.String(required=True)
  goals = fields.Nested(GoalSchema, many=True)

  class Meta:
    fields = ('user_id', 'firstname', 'lastname', 'username', 'password', 'income', 'checking', 'savings', 'budget','goals')
  
user_schema = UserSchema()
users_schema = UserSchema(many=True)



# ==================== API Routes =====================
# Add new customer
@app.route('/signup', methods=['POST'])
def add_user():
    try:
      user_data = user_schema.load(request.json)
      print(user_data)
      
    except ValidationError as err:  
      return jsonify(err.messages), 400
    
    with Session(db.engine) as session:
        with session.begin():
          firstname = user_data['firstname']
          lastname = user_data['lastname']
          username = user_data['username']
          hashed_password = bcrypt.hashpw(user_data['password'].encode('utf-8'), bcrypt.gensalt())
          income = user_data['income']
          checking = user_data['checking']
          savings = user_data['savings']
          budget = user_data['budget']
          goals_data = user_data.get('goals', [])
          goals = []
          

          existing_user = session.query(User).filter_by(username=username).first()
          
          if existing_user:
                return jsonify({"Message": "Username already exists. Please use a different username."}), 400

            # Add new user if email does not exist
          new_user= User(firstname=firstname, lastname=lastname, username=username, password=hashed_password, income=income, checking=checking, savings=savings, budget=budget)
          
          for goal_data in goals_data:
                goal = Goal(
                    user=new_user,
                    amount=goal_data['amount'],
                    icon=goal_data['icon'],
                    text=goal_data['text'],
                    isPrimary=goal_data['isPrimary'],
                )
                goals.append(goal)
                session.add(goal)

          new_user.goals = goals  # Associate the goals with the new user
          session.add(new_user)
          session.commit()
                
    return jsonify({"Message": "New user added successfully!"})




# Get all users
@app.route('/users', methods=['GET'])
def get_users():
  query = select(User)
  users = db.session.execute(query).scalars().all()
  
  print(users)
  return users_schema.jsonify(users)






if __name__ == '__main__':
  app.run(debug=True)