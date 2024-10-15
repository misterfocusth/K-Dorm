from __future__ import annotations

from django.utils import timezone
from django.db import models


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
    class Meta(MyBaseModel.Meta):
        db_table = "recruitment_wave"

    name = models.CharField(max_length=255)
    year = models.IntegerField()
    announcementText = models.TextField(null=True, default=None)


class Account(MyBaseModel):
    class Meta(MyBaseModel.Meta):
        db_table = "account"

    uid = models.TextField(unique=True, null=True)
    email = models.EmailField(unique=True)
    secret = models.TextField()
    salt = models.TextField()
    firstName = models.CharField(max_length=255)
    lastName = models.CharField(max_length=255)
    isDisabled = models.BooleanField(default=False)


class File(MyBaseModel):
    class Meta(MyBaseModel.Meta):
        db_table = "file"

    handle = models.TextField()
    note = models.TextField()
    path = models.TextField()

    publiclyVisible = models.BooleanField(default=False)

    visibleToStudents = models.ManyToManyField(
        "Student", related_name="accessToFiles")
    visibleToStaffs = models.ManyToManyField(
        "Staff", related_name="accessToFiles")
    visibleToMaintenanceStaffs = models.ManyToManyField(
        "MaintenanceStaff", related_name="accessToFiles"
    )
    visibleToSecurityStaffs = models.ManyToManyField(
        "SecurityStaff", related_name="accessToFiles"
    )

    activity = models.ForeignKey(
        'Activity',
        on_delete=models.CASCADE,
        related_name='files',
        null=True,
    )

    maintenanceTicket = models.ForeignKey(
        'MaintenanceTicket',
        on_delete=models.CASCADE,
        related_name='files',
        null=True,
    )


class Student(MyBaseModel):
    class Meta(MyBaseModel.Meta):
        db_table = "student"

    studentId = models.CharField(max_length=255)
    isOnBoarded = models.BooleanField(default=False)
    account = models.OneToOneField(
        "Account", on_delete=models.CASCADE, related_name="student"
    )


class Staff(MyBaseModel):
    class Meta(MyBaseModel.Meta):
        db_table = "staff"

    account = models.OneToOneField(
        "Account", on_delete=models.CASCADE, related_name="staff"
    )


class MaintenanceStaff(MyBaseModel):
    class Meta(MyBaseModel.Meta):
        db_table = "maintenance_staff"

    account = models.OneToOneField(
        "Account", on_delete=models.CASCADE, related_name="maintenanceStaff"
    )


class SecurityStaff(MyBaseModel):
    class Meta(MyBaseModel.Meta):
        db_table = "security_staff"

    account = models.OneToOneField(
        "Account", on_delete=models.CASCADE, related_name="securityStaff"
    )


class Building(MyBaseModel):
    class Meta(MyBaseModel.Meta):
        db_table = "building"

    name = models.CharField(max_length=255, unique=True)


class Room(MyBaseModel):
    class Meta(MyBaseModel.Meta):
        db_table = "room"

    floor = models.IntegerField()
    name = models.CharField(max_length=255)

    building = models.ForeignKey(
        "Building", on_delete=models.CASCADE, related_name="rooms"
    )


class Residence(MyBaseModel):
    class Meta(MyBaseModel.Meta):
        db_table = "residence"

    startDate = models.DateTimeField()
    endDate = models.DateTimeField(null=True, default=None)
    isEvicted = models.BooleanField(default=False)

    student = models.ForeignKey(
        "Student", on_delete=models.CASCADE, related_name="residences"
    )
    room = models.ForeignKey(
        "Room",
        on_delete=models.CASCADE,
        related_name="residences",
        null=True,
    )
    recruitmentWave = models.ForeignKey(
        "RecruitmentWave", on_delete=models.CASCADE, related_name="residences"
    )


class BaseBillingModel(MyBaseModel):
    class Meta(MyBaseModel.Meta):
        abstract = True

    cycle = models.DateTimeField()
    isPaid = models.BooleanField(default=False)
    paidDate = models.DateTimeField(null=True, default=None)

    deadline = models.DateTimeField(null=True, default=None)
    fineRate = models.FloatField()

    fineCost = models.FloatField()
    extraCost = models.FloatField()
    extraCostNote = models.TextField(null=True, default=None)

    # Stripe reference
    ref = models.TextField(null=True, default=None)


class UsageBilling(BaseBillingModel):
    class Meta(BaseBillingModel.Meta):
        db_table = "usage_billing"

    # Usage unit
    electricityUsage = models.FloatField()
    waterUsage = models.FloatField()

    # Cost per unit
    electricityCost = models.FloatField()
    waterCost = models.FloatField()

    room = models.ForeignKey(
        "Room", on_delete=models.CASCADE, related_name="usageBilling"
    )


class RentBilling(BaseBillingModel):

    class Meta(BaseBillingModel.Meta):
        db_table = "rent_billing"

    rentCost = models.FloatField()

    residence = models.ForeignKey(
        "Residence", on_delete=models.CASCADE, related_name="rentBillings"
    )
    student = models.ForeignKey(
        "Student", on_delete=models.CASCADE, related_name="rentBillings"
    )


class ActivityCategory(MyBaseModel):
    class Meta(MyBaseModel.Meta):
        db_table = "activity_category"

    handle = models.TextField()
    name = models.TextField()

    visibleToStudents = models.BooleanField(default=False)
    visibleToStaffs = models.BooleanField(default=False)
    visibleToSecurityStaffs = models.BooleanField(default=False)


class Activity(MyBaseModel):
    class Meta(MyBaseModel.Meta):
        db_table = "activity"

    name = models.TextField()
    note = models.TextField(null=True, default=None)
    date = models.DateTimeField()
    location = models.TextField()

    # Volunteering Activity Earned Hours
    earnedVolunteerHours = models.FloatField(null=True, default=None)

    student = models.ForeignKey(
        "Student", on_delete=models.CASCADE, related_name="activities"
    )

    category = models.ForeignKey(
        "ActivityCategory", on_delete=models.CASCADE, related_name="activities"
    )


class MaintenanceTicket(MyBaseModel):
    class Meta(MyBaseModel.Meta):
        db_table = "maintenance_ticket"

    title = models.TextField()
    description = models.TextField()

    location = models.TextField(null=True, default=None)

    resolvedAt = models.DateTimeField(null=True, default=None)
    isResolved = models.BooleanField(default=False)

    student = models.ForeignKey(
        "Student", on_delete=models.CASCADE, related_name="maintenanceTickets"
    )

    maintenanceStaff = models.ForeignKey(
        'MaintenanceStaff',
        on_delete=models.CASCADE,
        related_name='maintenanceTickets',
        null=True,
    )


class IdentificationKey(MyBaseModel):
    class Meta(MyBaseModel.Meta):
        db_table = "identification_key"

    key = models.TextField()
    expiredAt = models.DateTimeField()
    account = models.ForeignKey(
        "Account", on_delete=models.CASCADE, related_name="identificationKeys"
    )
