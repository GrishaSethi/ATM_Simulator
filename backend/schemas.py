from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date, datetime

# --- BANK ---
class BankDetailsBase(BaseModel):
    Bank_Name: str
    IFSC_Code: str
    Address: str
class BankDetailsCreate(BankDetailsBase):
    pass
class BankDetailsOut(BankDetailsBase):
    Bank_ID: int
    class Config:
        orm_mode = True

# --- BRANCH ---
class BranchDetailsBase(BaseModel):
    Bank_ID: int
    Branch_Name: str
    Branch_Address: str
class BranchDetailsCreate(BranchDetailsBase):
    pass
class BranchDetailsOut(BranchDetailsBase):
    Branch_ID: int
    class Config:
        orm_mode = True

# --- CUSTOMER ---
class CustomerDetailsBase(BaseModel):
    Customer_Name: str
    Phone_Number: str
    Email: EmailStr
    Address: str
class CustomerDetailsCreate(CustomerDetailsBase):
    pass
class CustomerDetailsOut(CustomerDetailsBase):
    Customer_ID: int
    class Config:
        orm_mode = True

# --- ACCOUNT ---
class AccountDetailsBase(BaseModel):
    Account_Number: str
    Customer_ID: int
    Branch_ID: int
    Balance: int
class AccountDetailsCreate(AccountDetailsBase):
    pass
class AccountDetailsOut(AccountDetailsBase):
    class Config:
        orm_mode = True

# --- TRANSACTION ---
class TransactionsBase(BaseModel):
    Account_Number: str
    Transaction_Type: str
    Receiver_Account: Optional[str] = None
    Amount: int
    Credit_Debit: str
class TransactionsCreate(TransactionsBase):
    pass
class TransactionsOut(TransactionsBase):
    Transaction_ID: int
    Transaction_Date: datetime
    class Config:
        orm_mode = True

# --- CARD ---
class CardDetailsBase(BaseModel):
    Card_Number: str
    Account_Number: str
    Card_Type: str
    Card_Limit: Optional[int] = None
    Transaction_Limit: Optional[int] = None
    PIN: int
    Expiry_Date: date
class CardDetailsCreate(CardDetailsBase):
    pass
class CardDetailsOut(CardDetailsBase):
    class Config:
        orm_mode = True

# --- ATM ---
class ATMBase(BaseModel):
    Address: str
    Bank_ID: int
    Current_Amount: int
class ATMCreate(ATMBase):
    pass
class ATMOut(ATMBase):
    ATM_ID: int
    class Config:
        orm_mode = True

# --- ATM TRANSACTION ---
class ATMTransactionsBase(BaseModel):
    ATM_ID: int
    Card_Number: str
    Amount: int
    Transaction_Type: str
class ATMTransactionsCreate(ATMTransactionsBase):
    pass
class ATMTransactionsOut(ATMTransactionsBase):
    Transaction_ID: int
    Transaction_Date: datetime
    class Config:
        orm_mode = True

# --- EMPLOYEE DETAILS ---
class EmployeeDetailsBase(BaseModel):
    Emp_Name: str
    Phone_Number: str
    Emp_Email: EmailStr
    Emp_Address: str
    Emp_DOB: date
    Emp_Blood_Group: Optional[str] = None
class EmployeeDetailsCreate(EmployeeDetailsBase):
    pass
class EmployeeDetailsOut(EmployeeDetailsBase):
    Emp_ID: int
    class Config:
        orm_mode = True

# --- EMPLOYEES ---
class EmployeesBase(BaseModel):
    Emp_ID: int
    Branch_ID: int
    DOJ: date
    Salary: int
class EmployeesCreate(EmployeesBase):
    pass
class EmployeesOut(EmployeesBase):
    class Config:
        orm_mode = True

# --- LOGIN ---
class LoginBase(BaseModel):
    Username: str
    Passwrd: str
    Authorization: str
    Customer_ID: Optional[int] = None
    Emp_ID: Optional[int] = None
class LoginCreate(LoginBase):
    pass
class LoginOut(LoginBase):
    class Config:
        orm_mode = True
