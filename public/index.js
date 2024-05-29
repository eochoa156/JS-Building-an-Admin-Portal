async function main() {
    try {
        let listResponse = await fetch('http://localhost:3001/listBooks', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!listResponse.ok) {
            throw new Error(`HTTP error! status: ${listResponse.status}`);
        }

        let books = await listResponse.json();
        console.log(books);

        let updateResponse = await fetch('http://localhost:9001/updateBooks', {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": 3,
                "title": "Legends of Arathrae"
            })
        });

        if (!updateResponse.ok) {
            throw new Error(`HTTP error! status: ${updateResponse.status}`);
        }

        let updatedBook = await updateResponse.json();
        console.log(updatedBook);

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
    bookElement.classList.add('col-md-4', 'mb-3');

    bookElement.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <input type="number" value="${book.quantity}" min="0" id="quantity-${book.id}" class="form-control mb-2">
                <button onclick="updateBook(${book.id})" class="btn btn-primary">Save</button>
            </div>
        </div>
    `;

    bookContainer.appendChild(bookElement);
}


document.addEventListener('DOMContentLoaded', main);
