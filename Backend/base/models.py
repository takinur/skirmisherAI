from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, name, email, password=None, role=None):
        if not email:
            raise ValueError('Users must have an email address')
        
        email = self.normalize_email(email)
        email = email.lower()
        
        user = self.model(
            name  = name,
            email = email,
            role  = role,
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
    
    ROLE_CHOICES = (
        (1, 'EMPLOYER'),
        (2, 'CANDIDATE'),
    )
    
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, default=1)
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']
    
    def __str__(self):
        return self.email
    

# Explicitly set upload path and filename
def upload_to(instance, filename):
    # return 'images/{}/{}'.format(instance.user.id, filename)
    return 'images/{filename}'.format(filename=filename)

class EmployerProfile(models.Model):
    company_name = models.CharField(max_length=80)
    slogan = models.CharField(max_length=200, blank=True, default='')
    website = models.URLField(default='', blank=True,)
    phone = models.CharField(max_length=20, blank=True, default='')
    location = models.CharField(max_length=100, default='')
    about = models.TextField(default='', blank=True)
    logo = models.ImageField(upload_to=upload_to, default='', blank=True) #FIXME: image upload
    size = models.CharField(max_length=40, default='', blank=True)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=False, blank=True, null=True)
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.company_name



class Skills(models.Model):
    name = models.CharField(max_length=80)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=False, blank=True, null=True)
    
    def __str__(self):
        return self.name
    
class Education(models.Model):
    name = models.CharField(max_length=80)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=False, blank=True, null=True)
    
    def __str__(self):
        return self.name

class Experience(models.Model):
    name = models.CharField(max_length=80)
    details = models.TextField(default='', blank=True)
    range = models.CharField(max_length=100, default='', blank=True)
    total = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=False, blank=True, null=True)
    
    def __str__(self):
        return self.name    

class Social(models.Model):
    name = models.CharField(max_length=80)
    url = models.URLField(default='', blank=True)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=False, blank=True, null=True)
    
    def __str__(self):
        return self.name

class Projects(models.Model):
    details = models.TextField(default='')
    
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=False, blank=True, null=True)
        
# class Resume(models.Model):    
#     file = models.FileField(upload_to=upload_to, default='', blank=True)
#     name = models.CharField(max_length=80, default='')
#     email = models.EmailField(max_length=255, unique=False, blank=True, default='')
#     phone = models.CharField(max_length=20, blank=True, default='')
#     skills = models.ForeignKey(Skills, on_delete=models.CASCADE, null=True, blank=True)
#     education = models.ForeignKey(Education, on_delete=models.CASCADE, null=True, blank=True)
#     experince = models.ForeignKey(Experience, on_delete=models.CASCADE, null=True, blank=True)
#     social = models.ForeignKey(Social, on_delete=models.CASCADE, null=True, blank=True)
#     projects = models.ForeignKey(Projects, on_delete=models.CASCADE, null=True, blank=True)
#     text = models.TextField(default='', blank=True)
#     created_at = models.DateTimeField(auto_now=True)
#     updated_at = models.DateTimeField(auto_now=False, blank=True, null=True)
    
#     def __str__(self) -> str:
#         return super().__str__()    

# Resume Upload
def upload_resume_to(instance, filename):
    return 'resumes/{filename}'.format(filename=filename)
class CandidateProfile(models.Model):
    designation = models.CharField(max_length=80, blank=True, default='')
    phone = models.CharField(max_length=20, blank=True, default='')
    location = models.CharField(max_length=100, default='')
    # resume = models.ForeignKey(Resume, on_delete=models.CASCADE, null=True, blank=True)
    resume_file = models.FileField(upload_to=upload_resume_to, default='', blank=True)
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=False, blank=True, null=True)
    
    def __str__(self) -> str:
        return super().resume #FIXME: Resume is not defined probably

