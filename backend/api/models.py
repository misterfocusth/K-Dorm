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


class MyModelQuerySet(models.QuerySet):
    def active(self):
        return self.filter(deleted_at__isnull=True)


class MyModelManager(models.Manager):
    def get_queryset(self):
        return MyModelQuerySet(self.model, using=self._db).active()


class MyBaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True, default=None)

    def soft_delete(self):
        self.deleted_at = timezone.now()
        self.save()

    def restore(self):
        self.deleted_at = None
        self.save()

    @property
    def is_deleted(self):
        return self.deleted_at is not None

    class Meta:
        abstract = True


class RecruitmentWave(MyBaseModel):
    name = models.CharField(max_length=255)
    year = models.IntegerField()


class Account(MyBaseModel):
    email = models.EmailField(unique=True)
    secret = models.TextField()
    salt = models.TextField()
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_disabled = models.BooleanField(default=False)


class File(MyBaseModel):
    handle = models.TextField()
    note = models.TextField()
    path = models.TextField()

    publicly_visible = models.BooleanField(default=False)

    visible_to_students = models.ManyToManyField(
        'Student',
        related_name='access_to_files'
    )
    visible_to_staffs = models.ManyToManyField(
        'Staff',
        related_name='access_to_files'
    )
    visible_to_maintenance_staffs = models.ManyToManyField(
        'MaintenanceStaff',
        related_name='access_to_files'
    )
    visible_to_security_staffs = models.ManyToManyField(
        'SecurityStaff',
        related_name='access_to_files'
    )

    activity = models.ForeignKey(
        'Activity',
        on_delete=models.CASCADE,
        related_name='files'
    )

    maintenance_ticket = models.ForeignKey(
        'MaintenanceTicket',
        on_delete=models.CASCADE,
        related_name='files'
    )


class Student(MyBaseModel):
    student_id = models.CharField(max_length=255)
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
        related_name='maintenance_staff'
    )


class SecurityStaff(MyBaseModel):
    account = models.OneToOneField(
        'Account',
        on_delete=models.CASCADE,
        related_name='security_staff'
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
    start_date = models.DateTimeField()
    end_date = models.DateTimeField(null=True, default=None)
    is_evicted = models.BooleanField(default=False)

    student = models.ForeignKey(
        'Student',
        on_delete=models.CASCADE,
        related_name='residences'
    )
    room = models.ForeignKey(
        'Room',
        on_delete=models.CASCADE,
        related_name='residences'
    )
    recruitment_wave = models.ForeignKey(
        'RecruitmentWave',
        on_delete=models.CASCADE,
        related_name='residences'
    )


class UsageBilling(MyBaseModel):
    cycle = models.DateTimeField()

    deadline = models.DateTimeField()
    fine_rate = models.FloatField()

    # Usage unit
    electricity_usage = models.FloatField()
    water_usage = models.FloatField()

    # Cost per unit
    electricity_cost = models.FloatField()
    water_cost = models.FloatField()

    fine_cost = models.FloatField()
    extra_cost = models.FloatField()
    extra_cost_note = models.TextField()

    # Stripe reference
    ref = models.TextField(null=True, default=None)

    is_paid = models.BooleanField(default=False)
    paid_date = models.DateTimeField(null=True, default=None)

    room = models.ForeignKey(
        'Room',
        on_delete=models.CASCADE,
        related_name='usage_billing'
    )


class RentBilling(MyBaseModel):
    cycle = models.DateTimeField()

    is_paid = models.BooleanField(default=False)
    paid_date = models.DateTimeField(null=True, default=None)

    deadline = models.DateTimeField()
    fine_rate = models.FloatField()

    rent_cost = models.FloatField()
    fine_cost = models.FloatField()
    extra_cost = models.FloatField()
    extra_cost_note = models.TextField()

    # Stripe reference
    ref = models.TextField(null=True, default=None)

    room = models.ForeignKey(
        'Room',
        on_delete=models.CASCADE,
        related_name='rent_billings'
    )
    student = models.ForeignKey(
        'Student',
        on_delete=models.CASCADE,
        related_name='rent_billings'
    )


class ActivityCategory(MyBaseModel):
    handle = models.TextField()
    name = models.TextField()

    visible_to_students = models.BooleanField(default=False)
    visible_to_staffs = models.BooleanField(default=False)
    visible_to_security_staffs = models.BooleanField(default=False)


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

    resolved_at = models.DateTimeField(null=True, default=None)
    is_resolved = models.BooleanField(default=False)

    student = models.ForeignKey(
        'Student',
        on_delete=models.CASCADE,
        related_name='maintenance_tickets'
    )

    maintenance_staff = models.ForeignKey(
        'MaintenanceStaff',
        on_delete=models.CASCADE,
        related_name='maintenance_tickets'
    )


class IdentificationKey(MyBaseModel):
    key = models.TextField()
    expired_at = models.DateTimeField()
    account = models.ForeignKey(
        'Account',
        on_delete=models.CASCADE,
        related_name='identification_keys'
    )
