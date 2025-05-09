from sqlalchemy import Column, Integer, String, ForeignKey, Date, DateTime, TIMESTAMP, UniqueConstraint, CheckConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class BankDetails(Base):
    __tablename__ = 'Bank_Details'
    Bank_ID = Column(Integer, primary_key=True, autoincrement=True)
    Bank_Name = Column(String(50), nullable=False)
    IFSC_Code = Column(String(15), unique=True, nullable=False)
    Address = Column(String(500), nullable=False)
    branches = relationship('BranchDetails', back_populates='bank', cascade="all, delete-orphan")
    atms = relationship('ATM', back_populates='bank', cascade="all, delete-orphan")

class BranchDetails(Base):
    __tablename__ = 'Branch_Details'
    Branch_ID = Column(Integer, primary_key=True, autoincrement=True)
    Bank_ID = Column(Integer, ForeignKey('Bank_Details.Bank_ID', ondelete='CASCADE'), nullable=False)
    Branch_Name = Column(String(100), nullable=False)
    Branch_Address = Column(String(500), nullable=False)
    bank = relationship('BankDetails', back_populates='branches')
    accounts = relationship('AccountDetails', back_populates='branch', cascade="all, delete-orphan")
    employees = relationship('Employees', back_populates='branch', cascade="all, delete-orphan")

class CustomerDetails(Base):
    __tablename__ = 'Customer_Details'
    Customer_ID = Column(Integer, primary_key=True, autoincrement=True)
    Customer_Name = Column(String(50), nullable=False)
    Phone_Number = Column(String(15), unique=True, nullable=False)
    Email = Column(String(50), unique=True, nullable=False)
    Address = Column(String(500), nullable=False)
    accounts = relationship('AccountDetails', back_populates='customer', cascade="all, delete-orphan")
    logins = relationship('Login', back_populates='customer', cascade="all, delete-orphan")

class AccountDetails(Base):
    __tablename__ = 'Account_Details'
    Account_Number = Column(String(20), primary_key=True)
    Customer_ID = Column(Integer, ForeignKey('Customer_Details.Customer_ID', ondelete='CASCADE'), nullable=False)
    Branch_ID = Column(Integer, ForeignKey('Branch_Details.Branch_ID', ondelete='CASCADE'), nullable=False)
    Balance = Column(Integer, nullable=False, default=0)
    customer = relationship('CustomerDetails', back_populates='accounts')
    branch = relationship('BranchDetails', back_populates='accounts')
    transactions = relationship('Transactions', back_populates='account', cascade="all, delete-orphan")
    cards = relationship('CardDetails', back_populates='account', cascade="all, delete-orphan")

class Transactions(Base):
    __tablename__ = 'Transactions'
    Transaction_ID = Column(Integer, primary_key=True, autoincrement=True)
    Account_Number = Column(String(20), ForeignKey('Account_Details.Account_Number', ondelete='CASCADE'), nullable=False)
    Transaction_Type = Column(String(20), nullable=False)
    Receiver_Account = Column(String(20), ForeignKey('Account_Details.Account_Number', ondelete='SET NULL'), nullable=True)
    Amount = Column(Integer, nullable=False, default=0)
    Credit_Debit = Column(String(7), nullable=False, default="Debit")
    Transaction_Date = Column(TIMESTAMP, server_default=func.current_timestamp())
    account = relationship('AccountDetails', back_populates='transactions', foreign_keys=[Account_Number])

class CardDetails(Base):
    __tablename__ = 'Card_Details'
    Card_Number = Column(String(12), primary_key=True)
    Account_Number = Column(String(20), ForeignKey('Account_Details.Account_Number', ondelete='CASCADE'), nullable=False)
    Card_Type = Column(String(30), nullable=False)
    Card_Limit = Column(Integer, nullable=True)
    Transaction_Limit = Column(Integer, nullable=True)
    PIN = Column(Integer, nullable=False)
    Expiry_Date = Column(Date, nullable=False)
    account = relationship('AccountDetails', back_populates='cards')
    atm_transactions = relationship('ATMTransactions', back_populates='card', cascade="all, delete-orphan")

class ATM(Base):
    __tablename__ = 'ATM'
    ATM_ID = Column(Integer, primary_key=True, autoincrement=True)
    Address = Column(String(500), nullable=False)
    Bank_ID = Column(Integer, ForeignKey('Bank_Details.Bank_ID', ondelete='CASCADE'), nullable=False)
    Current_Amount = Column(Integer, nullable=False, default=0)
    bank = relationship('BankDetails', back_populates='atms')
    atm_transactions = relationship('ATMTransactions', back_populates='atm', cascade="all, delete-orphan")

class ATMTransactions(Base):
    __tablename__ = 'ATM_Transactions'
    Transaction_ID = Column(Integer, primary_key=True, autoincrement=True)
    ATM_ID = Column(Integer, ForeignKey('ATM.ATM_ID', ondelete='CASCADE'), nullable=False)
    Card_Number = Column(String(12), ForeignKey('Card_Details.Card_Number', ondelete='CASCADE'), nullable=False)
    Amount = Column(Integer, nullable=False)
    Transaction_Type = Column(String(20), nullable=False)
    Transaction_Date = Column(TIMESTAMP, server_default=func.current_timestamp())
    atm = relationship('ATM', back_populates='atm_transactions')
    card = relationship('CardDetails', back_populates='atm_transactions')
    __table_args__ = (
        CheckConstraint("Transaction_Type IN ('Withdraw', 'Deposit', 'Balance Inquiry')", name='check_transaction_type'),
    )

class EmployeeDetails(Base):
    __tablename__ = 'Employee_Details'
    Emp_ID = Column(Integer, primary_key=True, autoincrement=True)
    Emp_Name = Column(String(50), nullable=False)
    Phone_Number = Column(String(15), unique=True, nullable=False)
    Emp_Email = Column(String(50), unique=True, nullable=False)
    Emp_Address = Column(String(500), nullable=False)
    Emp_DOB = Column(Date, nullable=False)
    Emp_Blood_Group = Column(String(5), nullable=True)
    employees = relationship('Employees', back_populates='employee', cascade="all, delete-orphan")
    logins = relationship('Login', back_populates='employee', cascade="all, delete-orphan")

class Employees(Base):
    __tablename__ = 'Employees'
    Emp_ID = Column(Integer, ForeignKey('Employee_Details.Emp_ID', ondelete='CASCADE'), primary_key=True)
    Branch_ID = Column(Integer, ForeignKey('Branch_Details.Branch_ID', ondelete='CASCADE'), primary_key=True)
    DOJ = Column(Date, nullable=False, default=func.current_date())
    Salary = Column(Integer, nullable=False, default=0)
    employee = relationship('EmployeeDetails', back_populates='employees')
    branch = relationship('BranchDetails', back_populates='employees')

class Login(Base):
    __tablename__ = 'Login'
    Username = Column(String(50), primary_key=True)
    Passwrd = Column(String(50), nullable=False)
    Authorization = Column(String(10), nullable=False, default="Customer")
    Customer_ID = Column(Integer, ForeignKey('Customer_Details.Customer_ID', ondelete='SET NULL'), nullable=True)
    Emp_ID = Column(Integer, ForeignKey('Employee_Details.Emp_ID', ondelete='SET NULL'), nullable=True)
    customer = relationship('CustomerDetails', back_populates='logins', foreign_keys=[Customer_ID])
    employee = relationship('EmployeeDetails', back_populates='logins', foreign_keys=[Emp_ID])
