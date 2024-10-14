from domain.models import Student


class StudentRepository:

    @staticmethod
    def create_new_student_account(student_id, account) -> Student:
        student = Student.objects.create(studentId=student_id, account=account)
        student.save()

        return student

    @staticmethod
    def get_student_by_account_id(account_id: str) -> Student | None:
        try:
            student = Student.objects.get(account_id=account_id)
        except Student.DoesNotExist:
            return None

        return student

    @staticmethod
    def get_student_by_pk(id: str) -> Student | None:
        try:
            student = Student.objects.get(id=id)
        except Student.DoesNotExist:
            return None

        return student

    @staticmethod
    def get_student_by_studentId(studentId: str) -> Student | None:
        try:
            student = Student.objects.get(studentId=studentId)
        except Student.DoesNotExist:
            return None

        return student
