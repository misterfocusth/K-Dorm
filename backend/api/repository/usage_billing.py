from collections.abc import List
from domain.models import UsageBilling


class UsageBillingRepository:

    @staticmethod
    def get_list_by_student_id(self, student_id: str) -> List[UsageBilling]:
        usage_billings = UsageBilling.objects.filter(student_id=student_id).all()

        return list(usage_billings)
