from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal
import models, schemas

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- BANK CRUD ---
@router.post("/banks/", response_model=schemas.BankDetailsOut)
def create_bank(bank: schemas.BankDetailsCreate, db: Session = Depends(get_db)):
    db_bank = models.BankDetails(**bank.dict())
    db.add(db_bank)
    db.commit()
    db.refresh(db_bank)
    return db_bank

@router.get("/banks/", response_model=list[schemas.BankDetailsOut])
def get_banks(db: Session = Depends(get_db)):
    return db.query(models.BankDetails).all()

@router.get("/banks/{bank_id}", response_model=schemas.BankDetailsOut)
def get_bank(bank_id: int, db: Session = Depends(get_db)):
    bank = db.query(models.BankDetails).filter(models.BankDetails.Bank_ID == bank_id).first()
    if not bank:
        raise HTTPException(status_code=404, detail="Bank not found")
    return bank

@router.delete("/banks/{bank_id}")
def delete_bank(bank_id: int, db: Session = Depends(get_db)):
    bank = db.query(models.BankDetails).filter(models.BankDetails.Bank_ID == bank_id).first()
    if not bank:
        raise HTTPException(status_code=404, detail="Bank not found")
    db.delete(bank)
    db.commit()
    return {"ok": True}

# --- CUSTOMER CRUD (example) ---
@router.post("/customers/", response_model=schemas.CustomerDetailsOut)
def create_customer(customer: schemas.CustomerDetailsCreate, db: Session = Depends(get_db)):
    db_customer = models.CustomerDetails(**customer.dict())
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer

@router.get("/customers/", response_model=list[schemas.CustomerDetailsOut])
def get_customers(db: Session = Depends(get_db)):
    return db.query(models.CustomerDetails).all()

@router.get("/customers/{customer_id}", response_model=schemas.CustomerDetailsOut)
def get_customer(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(models.CustomerDetails).filter(models.CustomerDetails.Customer_ID == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customer

@router.delete("/customers/{customer_id}")
def delete_customer(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(models.CustomerDetails).filter(models.CustomerDetails.Customer_ID == customer_id).first()
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    db.delete(customer)
    db.commit()
    return {"ok": True}

# --- LOGIN GET (for frontend login) ---
@router.get("/login/{username}")
def get_login(username: str, db: Session = Depends(get_db)):
    user = db.query(models.Login).filter(models.Login.Username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {
        "Username": user.Username,
        "Passwrd": user.Passwrd,
        "Authorization": user.Authorization,
        "Customer_ID": user.Customer_ID,
        "Emp_ID": user.Emp_ID
    }

# --- LOGIN POST (for frontend authentication) ---
from fastapi import Body

@router.post("/login")
def login(username: str = Body(...), password: str = Body(...), db: Session = Depends(get_db)):
    # TEMPORARY BYPASS: Accept hardcoded credentials
    if username == 'grisha' and password == 'grishapass':
        return {
            "Username": "grisha",
            "Authorization": "Customer",
            "Customer_ID": 2,
            "Emp_ID": None
        }
    # Normal DB logic
    user = db.query(models.Login).filter(models.Login.Username == username).first()
    if not user or user.Passwrd != password:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return {
        "Username": user.Username,
        "Authorization": user.Authorization,
        "Customer_ID": user.Customer_ID,
        "Emp_ID": user.Emp_ID
    }

# Additional CRUD endpoints for all other entities (branches, accounts, transactions, cards, ATM, ATM_Transactions, employees, login) should be implemented similarly.
