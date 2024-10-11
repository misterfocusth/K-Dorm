from domain.models import Student


class StudentRepository:

    @staticmethod
    def create_new_student_account(student_id, account):
        student = Student.objects.create(studentId=student_id, account=account)
        student.save()

        return student
