import os
from smartorder_sdk import FoundryClient
from smartorder_sdk.core.api import UserTokenAuth



def analyze_items(cart_items, user_location="1025 Thomas Jefferson St NW, Washington, DC", max_dist=30, user_request="None"):
    try:
        item_list = [item["name"] for item in cart_items]
        quantity_map = {item["name"]: item["quantity"] for item in cart_items}

        raw_result = client.ontology.queries.logic_for_smart_order(
            item_list=item_list,
            user_location=user_location,
            max_dist=max_dist,
            user_request=user_request
        )


        print("🔹 Raw Palantir Response:", raw_result) 

        final_result = []
        for item in raw_result:
            if not all(k in item for k in ["Name of Item", "Store Name", "Price of Item"]):
                print("Invalid response item:", item)
                continue  

            final_result.append({
                "ItemName": item["Name of Item"],
                "StoreName": item["Store Name"],
                "Price": item["Price of Item"],
                "Quantity": quantity_map.get(item["Name of Item"], 1)
            })

        print("Processed Palantir Response:", final_result) 

        return final_result

    except Exception as e:
        print("ERROR:", str(e))
        raise RuntimeError(f"Error calling smartorder_sdk: {e}")

    
if __name__ == "__main__":
    test_cart = [
        {"name": "Pizza", "quantity": 2},
        {"name": "Burger", "quantity": 1},
        {"name": "Soda", "quantity": 3}
    ]
    
    try:
        result = analyze_items(test_cart)
        print("Palantir API response:", result)
    except Exception as e:
        print("Test failed:", e)