from email.policy import default
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):
    def create_user(self, name, email, password=None, role=None):
        if not email:
            raise ValueError('Users must have an email address!')

        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(
            name=name,
            email=email,
            role=role,
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, name, email, password=None):
        user = self.create_user(
            name,
            email,
            password=password,
            role=1,  # HACK: CHANGE later for ADMIN
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
    slogan = models.CharField(max_length=200, default='')
    website = models.URLField(null=True, blank=True,)
    phone = models.CharField(max_length=20, default='')
    location = models.CharField(max_length=100, default='')
    about = models.TextField(default='')
    logo = models.ImageField(
        upload_to=upload_to, null=True, blank=True)  # FIXME: image upload
    size = models.CharField(max_length=40, default='')
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=False, blank=True, null=True)
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE)

    def __str__(self):
        return self.company_name


# Resume Upload
def upload_resume_to(instance, filename):
    return 'resumes/{filename}'.format(filename=filename)


class FileUpload(models.Model):
    file = models.FileField(upload_to=upload_resume_to)
    uploaded_at = models.DateTimeField(auto_now_add=True)


class CandidateProfile(models.Model):
    designation = models.CharField(max_length=80, default='')
    location = models.CharField(max_length=100, default='')
    website = models.CharField(max_length=100, null=True, blank=True)
    resume_file = models.CharField(max_length=255, default='')
    # These are extracted from resume
    name = models.CharField(max_length=80, default='')
    email = models.EmailField(
        max_length=255, unique=False, blank=True, null=True)
    phone = models.CharField(max_length=20, default='')
    resume_raw_text = models.TextField(null=True, blank=True)

    user = models.OneToOneField(
        UserAccount, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=False, blank=True, null=True)


class Skill(models.Model):
    name = models.CharField(max_length=80)
    candidate = models.ForeignKey(
        CandidateProfile, on_delete=models.CASCADE, related_name='skills')
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=False, blank=True, null=True)

    def __str__(self):
        return self.name


class Education(models.Model):
    name = models.CharField(max_length=80)
    candidate = models.ForeignKey(
        CandidateProfile, on_delete=models.CASCADE, related_name='educations')
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=False, blank=True, null=True)

    def __str__(self):
        return self.name


class Experience(models.Model):
    name = models.CharField(max_length=80)
    candidate = models.ForeignKey(
        CandidateProfile, on_delete=models.CASCADE, related_name='experiences')
    details = models.TextField(null=True, blank=True)
    range = models.CharField(max_length=100, default='')
    total = models.IntegerField(default=0)  # Might need to change
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=False, blank=True, null=True)

    def __str__(self):
        return self.name


class Social(models.Model):
    name = models.CharField(max_length=80)
    candidate = models.ForeignKey(
        CandidateProfile, on_delete=models.CASCADE, related_name='socials')
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=False, blank=True, null=True)

    def __str__(self):
        return self.name


class Project(models.Model):
    details = models.TextField(null=True)
    candidate = models.ForeignKey(
        CandidateProfile, on_delete=models.CASCADE, related_name='projects')
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=False, blank=True, null=True)

    def __str__(self):
        return self.details


class Vacancy(models.Model):
    title = models.CharField(max_length=80)
    type = models.CharField(max_length=80, default='')
    level = models.CharField(max_length=80, null=True, blank=True)
    salary = models.CharField(max_length=80, default='')
    qualifications = models.TextField(default='')
    benefits = models.CharField(max_length=100, default='')

    work_location = models.CharField(max_length=100, default='')

    description = models.TextField(null=True)
    employer = models.ForeignKey(
        EmployerProfile, on_delete=models.CASCADE, related_name='vacancies')
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=False, blank=True, null=True)

    def __str__(self):
        return self.title


class JobApplication(models.Model):
    total_score = models.DecimalField(
        max_digits=5, decimal_places=2, default=0)
    skill_score = models.DecimalField(
        max_digits=5, decimal_places=2, default=0)
    nlp_score = models.DecimalField(max_digits=5, decimal_places=2, default=0)

    status = models.CharField(max_length=80, default='')
    candidate = models.ForeignKey(
        CandidateProfile, on_delete=models.CASCADE, related_name='applications')
    vacancy = models.ForeignKey(
        Vacancy, on_delete=models.CASCADE, related_name='applications')
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=False, blank=True, null=True)


class Invitation(models.Model):
    meet_url = models.CharField(max_length=200, default='')
    schedule = models.DateField(blank=True, null=True)
    remarks = models.CharField(max_length=200, default='')
    vacancy = models.ForeignKey(
        Vacancy, on_delete=models.CASCADE, related_name='Inviations')
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=False, blank=True, null=True)
