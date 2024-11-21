let inventory = [];

// Select the form and table body elements
const inventoryForm = document.getElementById('inventory-form');
const itemName = document.getElementById('item-name');
const quantity = document.getElementById('quantity');
const price = document.getElementById('price');
const category = document.getElementById('category');
const inventoryTable = document.getElementById('inventory-table').getElementsByTagName('tbody')[0];
const searchBar = document.getElementById('search-bar');
const totalQuantity = document.getElementById('total-quantity');
const totalPrice = document.getElementById('total-price');

// Add Item to Inventory
inventoryForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Create the new item object
    const newItem = {
        name: itemName.value,
        quantity: parseInt(quantity.value),
        price: parseFloat(price.value),
        category: category.value
    };

    // Add new item to the inventory array
    inventory.push(newItem);

    // Render the inventory table
    renderInventory();

    // Reset form fields
    inventoryForm.reset();
});

// Render Inventory List
function renderInventory() {
    // Clear the table before re-rendering
    inventoryTable.innerHTML = '';

    // Filter inventory based on search query
    const searchQuery = searchBar.value.toLowerCase();
    const filteredInventory = inventory.filter(item => {
        return (
            item.name.toLowerCase().includes(searchQuery) ||
            item.category.toLowerCase().includes(searchQuery)
        );
    });

    filteredInventory.forEach((item, index) => {
        // Calculate total price for the item
        const totalItemPrice = (item.quantity * item.price).toFixed(2);

        const row = inventoryTable.insertRow();
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td>${item.category}</td>
            <td>${totalItemPrice}</td> <!-- Display the total price here -->
            <td><button onclick="deleteItem(${index})">Delete</button></td>
        `;
    });

    // Update totals
    updateTotals();
}

// Delete Item
function deleteItem(index) {
    inventory.splice(index, 1); // Remove the item from the array
    renderInventory(); // Re-render the table
}

// Sort by Price Ascending
document.getElementById('sort-price-asc').addEventListener('click', function () {
    inventory.sort((a, b) => a.price - b.price); // Sort array by price ascending
    renderInventory(); // Re-render after sorting
});

// Sort by Price Descending
document.getElementById('sort-price-desc').addEventListener('click', function () {
    inventory.sort((a, b) => b.price - a.price); // Sort array by price descending
    renderInventory(); // Re-render after sorting
});

// Update Total Quantity and Total Price
function updateTotals() {
    let totalQuantityValue = 0;
    let totalPriceValue = 0;

    inventory.forEach(item => {
        totalQuantityValue += item.quantity;
        totalPriceValue += item.price * item.quantity;
    });

    totalQuantity.textContent = totalQuantityValue;
    totalPrice.textContent = totalPriceValue.toFixed(2);
}

// Search bar event listener to filter inventory dynamically
searchBar.addEventListener('input', function () {
    renderInventory();
});
