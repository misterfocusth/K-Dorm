from collections.abc import List
from domain.models import RentBilling


class RentBillingRepository:

    @staticmethod
    def get_list_by_student_id(self, student_id: str) -> List[RentBilling]:
        rent_billings = RentBilling.objects.filter(student_id=student_id).all()

        return list(rent_billings)
