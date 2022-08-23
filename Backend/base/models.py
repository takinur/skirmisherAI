from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):
    def create_user(self, name, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        
        email = self.normalize_email(email)
        email = email.lower()
        
        user = self.model(
            name = name,
            email=email,
        )

        user.set_password(password)
        user.save(using=self._db)
        
        return user

    def create_superuser(self, name, email, password=None):
        user = self.create_user(
            name,
            email,
            password=password,
        )
        
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        
        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    
    def __str__(self):
        return self.email
    
    