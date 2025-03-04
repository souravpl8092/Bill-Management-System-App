const addItem = (setBillData) => {
  setBillData((prev) => ({
    ...prev,
    items: [
      ...prev.items,
      { item: "", description: "", quantity: "", price: "", total: 0 },
    ],
  }));
};

export default addItem;
