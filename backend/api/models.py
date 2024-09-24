from datetime import timezone
from django.db import models


class Task(models.Model):
    title = models.CharField(max_length=80)
    description = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False)

    class Meta:
        ordering = ['-date_created']
        db_table = 'task'

    def __str__(self):
        return self.title


class MyBaseModel(models.Model):
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    deletedAt = models.DateTimeField(null=True, blank=True, default=None)

    def softDelete(self):
        self.deletedAt = timezone.now()
        self.save()

    def restore(self):
        self.deletedAt = None
        self.save()

    @property
    def isDeleted(self):
        return self.deletedAt is not None

    class Meta:
        abstract = True


class RecruitmentWave(MyBaseModel):
    name = models.CharField(max_length=255)
    year = models.IntegerField()


class Account(MyBaseModel):
    email = models.EmailField(unique=True)
    secret = models.TextField()
    salt = models.TextField()
    firstName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    isDisabled = models.BooleanField(default=False)


class File(MyBaseModel):
    handle = models.TextField()
    note = models.TextField()
    path = models.TextField()

    publiclyVisible = models.BooleanField(default=False)

    visibleToStudents = models.ManyToManyField(
        'Student',
        related_name='accessToFiles'
    )
    visibleToStaffs = models.ManyToManyField(
        'Staff',
        related_name='accessToFiles'
    )
    visibleToMaintenanceStaffs = models.ManyToManyField(
        'MaintenanceStaff',
        related_name='accessToFiles'
    )
    visibleToSecurityStaffs = models.ManyToManyField(
        'SecurityStaff',
        related_name='accessToFiles'
    )

    activity = models.ForeignKey(
        'Activity',
        on_delete=models.CASCADE,
        related_name='files'
    )

    maintenanceTicket = models.ForeignKey(
        'MaintenanceTicket',
        on_delete=models.CASCADE,
        related_name='files'
    )


class Student(MyBaseModel):
    studentId = models.CharField(max_length=255)
    account = models.OneToOneField(
        'Account',
        on_delete=models.CASCADE,
        related_name='student'
    )


class Staff(MyBaseModel):
    account = models.OneToOneField(
        'Account',
        on_delete=models.CASCADE,
        related_name='staff'
    )


class MaintenanceStaff(MyBaseModel):
    account = models.OneToOneField(
        'Account',
        on_delete=models.CASCADE,
        related_name='maintenanceStaff'
    )


class SecurityStaff(MyBaseModel):
    account = models.OneToOneField(
        'Account',
        on_delete=models.CASCADE,
        related_name='securityStaff'
    )


class Building(MyBaseModel):
    name = models.CharField(max_length=255, unique=True)


class Room(MyBaseModel):
    floor = models.IntegerField()
    name = models.CharField(max_length=255)

    building = models.ForeignKey(
        'Building',
        on_delete=models.CASCADE,
        related_name='rooms'
    )


class Residence(MyBaseModel):
    startDate = models.DateTimeField()
    endDate = models.DateTimeField(null=True, default=None)
    isEvicted = models.BooleanField(default=False)

    student = models.ForeignKey(
        'Student',
        on_delete=models.CASCADE,
        related_name='residences'
    )
    room = models.ForeignKey(
        'Room',
        on_delete=models.CASCADE,
        related_name='residences',
        null=True,
    )
    recruitmentWave = models.ForeignKey(
        'RecruitmentWave',
        on_delete=models.CASCADE,
        related_name='residences'
    )


class UsageBilling(MyBaseModel):
    cycle = models.DateTimeField()

    deadline = models.DateTimeField(null=True, default=None)
    fineRate = models.FloatField()

    # Usage unit
    electricityUsage = models.FloatField()
    waterUsage = models.FloatField()

    # Cost per unit
    electricityCost = models.FloatField()
    waterCost = models.FloatField()

    fineCost = models.FloatField()
    extraCost = models.FloatField()
    extraCostNote = models.TextField(null=True, default=None)

    # Stripe reference
    ref = models.TextField(null=True, default=None)

    isPaid = models.BooleanField(default=False)
    paidDate = models.DateTimeField(null=True, default=None)

    room = models.ForeignKey(
        'Room',
        on_delete=models.CASCADE,
        related_name='usageBilling'
    )


class RentBilling(MyBaseModel):
    cycle = models.DateTimeField()

    isPaid = models.BooleanField(default=False)
    paidDate = models.DateTimeField(null=True, default=None)

    deadline = models.DateTimeField(null=True, default=None)
    fineRate = models.FloatField()

    rentCost = models.FloatField()
    fineCost = models.FloatField()
    extraCost = models.FloatField()
    extraCostNote = models.TextField(null=True, default=None)

    # Stripe reference
    ref = models.TextField(null=True, default=None)

    residence = models.ForeignKey(
        'Residence',
        on_delete=models.CASCADE,
        related_name='rentBillings'
    )
    student = models.ForeignKey(
        'Student',
        on_delete=models.CASCADE,
        related_name='rentBillings'
    )


class ActivityCategory(MyBaseModel):
    handle = models.TextField()
    name = models.TextField()

    visibleToStudents = models.BooleanField(default=False)
    visibleToStaffs = models.BooleanField(default=False)
    visibleToSecurityStaffs = models.BooleanField(default=False)


class Activity(MyBaseModel):
    name = models.TextField()
    note = models.TextField(null=True, default=None)
    date = models.DateTimeField()
    location = models.TextField()

    student = models.ForeignKey(
        'Student',
        on_delete=models.CASCADE,
        related_name='activities'
    )

    category = models.ForeignKey(
        'ActivityCategory',
        on_delete=models.CASCADE,
        related_name='activities'
    )


class MaintenanceTicket(MyBaseModel):
    title = models.TextField()
    description = models.TextField()

    resolvedAt = models.DateTimeField(null=True, default=None)
    isResolved = models.BooleanField(default=False)

    student = models.ForeignKey(
        'Student',
        on_delete=models.CASCADE,
        related_name='maintenanceTickets'
    )

    maintenanceStaff = models.ForeignKey(
        'MaintenanceStaff',
        on_delete=models.CASCADE,
        related_name='maintenanceTickets'
    )


class IdentificationKey(MyBaseModel):
    key = models.TextField()
    expiredAt = models.DateTimeField()
    account = models.ForeignKey(
        'Account',
        on_delete=models.CASCADE,
        related_name='identificationKeys'
    )
