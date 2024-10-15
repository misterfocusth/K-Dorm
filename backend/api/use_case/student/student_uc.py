from backend.api.use_case.student.edit_student import edit_student as _edit_student
from backend.api.use_case.student.onboard import onboard as _onboard
from backend.api.use_case.student.get_student_from_ctx import (
    get_student_from_ctx as _get_student_from_ctx,
)
from backend.api.use_case.student.create_students import (
    create_students as _create_students,
)

edit_student = _edit_student
onboard = _onboard
get_student_from_ctx = _get_student_from_ctx
create_students = _create_students
