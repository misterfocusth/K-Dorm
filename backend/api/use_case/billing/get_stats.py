
from datetime import datetime
from typing import TypedDict

class Stats(TypedDict):
    total_unpaid: float
    usage_unpaid: float
    rent_unpaid: float
    nearest_deadline: int # unix timestamp
    unpaid_bill_count: int

'''
    For student to get overall stats of their billing
'''
def get_stats(student_id: str) -> Stats:
    
