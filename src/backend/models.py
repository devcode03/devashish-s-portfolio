from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid


# Project Models
class ProjectBase(BaseModel):
    name: str
    description: str
    techStack: List[str]
    features: List[str]
    liveDemo: str
    githubRepo: str
    status: str = "production"  # production, beta, development


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    techStack: Optional[List[str]] = None
    features: Optional[List[str]] = None
    liveDemo: Optional[str] = None
    githubRepo: Optional[str] = None
    status: Optional[str] = None


class Project(ProjectBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True


# Contact Models
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str


class Contact(ContactCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = "new"  # new, read, archived
    createdAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True


class ContactUpdate(BaseModel):
    status: Optional[str] = None


# Admin Models
class AdminLogin(BaseModel):
    username: str
    password: str


class AdminCreate(BaseModel):
    username: str
    password: str


class Admin(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    password: str  # hashed
    createdAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    token: str
    username: str
