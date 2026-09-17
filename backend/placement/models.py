from django.db import models

# Create your models here.




class Student(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    department = models.CharField(max_length=50)
    cgpa = models.DecimalField(max_digits=4, decimal_places=2)

    def __str__(self):
        return self.name
    
class Company(models.Model):
    company_name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    website = models.URLField(blank=True)

    def __str__(self):
        return self.company_name
class Job(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    job_title = models.CharField(max_length=100)
    package = models.DecimalField(max_digits=10, decimal_places=2)
    eligibility_cgpa = models.DecimalField(max_digits=4, decimal_places=2)

    def __str__(self):
        return self.job_title
class Application(models.Model):
    STATUS_CHOICES = [
        ('Applied', 'Applied'),
        ('Shortlisted', 'Shortlisted'),
        ('Selected', 'Selected'),
        ('Rejected', 'Rejected'),
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Applied')
    applied_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.name} - {self.job.job_title}"