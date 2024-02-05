let adminResponse = await fetch('http://localhost:3000/admin.html',{
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
});
let books = await response.json()
console.log(books);

books.forEach(renderBook)