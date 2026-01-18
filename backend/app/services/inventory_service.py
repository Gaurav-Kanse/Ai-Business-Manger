inventory_db = {}

LOW_STOCK_THRESHOLD = 5


def update_inventory(invoice_json: dict):
    low_stock_items = []

    for item in invoice_json["items"]:
        name = item["name"].lower()
        qty = item["quantity"]

        inventory_db[name] = inventory_db.get(name, 0) + qty

        if inventory_db[name] <= LOW_STOCK_THRESHOLD:
            low_stock_items.append(name)

    return low_stock_items
