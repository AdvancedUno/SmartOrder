# main.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

from call_palantir import analyze_items

app = FastAPI(
    title="Analysis Service (Using smartorder_sdk)",
    version="1.0.0"
)


class Item(BaseModel):
    name: str
    quantity: int

class CartItem(BaseModel):
    customerName:str
    customerRequest:str
    address:str
    cartItems:List[Item]

@app.post("/api/analyze")
def analyze(cart: CartItem):
    if not cart:
        raise HTTPException(status_code=400, detail="Cart is empty")

    items = [{"name": i.name, "quantity": i.quantity} for i in cart.cartItems]

    try:
        result = analyze_items(items, user_location=cart.address, user_request=cart.customerName)

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


