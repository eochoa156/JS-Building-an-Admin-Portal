document.addEventListener('DOMContentLoaded', main);

async function main() {
    try {
        // Fetch the list of books
        let response = await fetch('http://localhost:3001/listBooks');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let books = await response.json();
        
        // Render the books
        books.forEach(renderBook);
    } catch (error) {
        console.error('Error:', error);
    }
}

function renderBook(book) {
    let bookContainer = document.querySelector('.book-container');
    if (!bookContainer) {
        console.error('Error: .book-container element not found');
        return;
    }

    let bookElement = document.createElement('div');
    bookElement.classList.add('book');

    bookElement.innerHTML = `
        <h3>${book.title}</h3>
        <input type="number" value="${book.quantity}" min="0" id="quantity-${book.id}">
        <button onclick="updateBook(${book.id})">Save</button>
    `;

    bookContainer.appendChild(bookElement);
}

async function updateBook(bookId) {
    let quantityInput = document.getElementById(`quantity-${bookId}`);
    let newQuantity = quantityInput.value;

    try {
        let response = await fetch('http://localhost:3001/updateBook', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: bookId,
                quantity: parseInt(newQuantity, 10)
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let updatedBook = await response.json();
        console.log('Book updated:', updatedBook);

    } catch (error) {
        console.error('Error:', error);
    }
}
