let myLibrary = [];
const bookList = document.querySelector('.book-list');

function Book(title, author, pages, bool) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
}

function addBookToLibrary() {
    const newBook = new Book();
    newBook['title'] = document.querySelector('#title').value;
    newBook['author'] = document.querySelector('#author').value;
    newBook['pages'] = document.querySelector('#numberOfPages').value;
    newBook['read'] = document.querySelector('#checkRead').checked;
    myLibrary.push(newBook);
}

function displayLibrary() {
    bookList.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++) {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('col-sm-12', 'col-md-6', 'col-xl-4', 'col-xxl-3');
        bookList.appendChild(cardContainer);

        const card = document.createElement('div');
        card.classList.add('card', 'text-center');
        cardContainer.appendChild(card);

        const title = document.createElement('p');
        title.innerText = myLibrary[i].title;
        title.classList.add('card-header');
        card.appendChild(title);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        card.appendChild(cardBody);

        const author = document.createElement('p');
        author.innerText = myLibrary[i].author;
        author.classList.add('card-title', 'mb-3');
        cardBody.appendChild(author);

        const pages = document.createElement('p');
        pages.innerText = `${myLibrary[i].pages} pages`;
        author.classList.add('card-text', 'mb-3');
        cardBody.appendChild(pages);

        //toggle button to change Book's read status
        const readStatus = document.createElement('button');
        readStatus.classList.add('readStatus');
        readStatus.dataset.indexNumber = i;
        if (myLibrary[i].read == true) {
            readStatus.innerText = 'Already read';
            readStatus.classList.add('isReadYes');
        }
        else {
            readStatus.innerText = 'Not read';
            readStatus.classList.add('isReadNo');
        }
        cardBody.appendChild(readStatus);

        readStatus.addEventListener('click', function () {
            let index = readStatus.dataset.indexNumber;
            myLibrary[index].read == true ? myLibrary[index].read = false : myLibrary[index].read = true;
        });

        //remove button removes book from array
        const removeButton = document.createElement('button');
        removeButton.innerText = 'Remove';
        removeButton.classList.add('remove');
        removeButton.dataset.indexNumber = i;
        cardBody.appendChild(removeButton);

        removeButton.addEventListener('click', function () {
            let index = removeButton.dataset.indexNumber;
            myLibrary.splice(index, 1);
        });
    }
}

//when book form is submitted, add book to library
const book = document.getElementById('book-form');

book.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
    for (let i = 0; i < book.elements.length; i++) {
        book.elements[i].value = null;
    }
    book.elements[3].checked = false;
});



window.addEventListener('submit', displayLibrary);
window.addEventListener('click', displayLibrary);

