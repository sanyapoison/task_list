from pydantic import BaseModel, EmailStr, Field
from typing import Optional
import datetime

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=50)

class User(UserBase):
    id: int

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TaskBase(BaseModel):
    title: str = Field(min_length=1, max_length=100)
    description: Optional[str] = Field(max_length=250)

class TaskCreate(TaskBase):
    status: Optional[bool] = False

class TaskUpdate(TaskBase):
    status: Optional[bool] = None

class Task(TaskBase):
    id: int
    status: bool
    created_at: datetime.datetime

    class Config:
        from_attributes = True
