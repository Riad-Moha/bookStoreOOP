// Book constructor
function Book(titre, auteur, isbn) {
  this.titre = titre;
  this.auteur = auteur;
  this.isbn = isbn
}
const tboyd = document.querySelector('tbody');
//UI contructor
function UI() {};

const ui = new UI();

// A UI prototype to save books to localStorage
UI.prototype.saveToLocalStorage = function(book) {
  
  let books = JSON.parse(localStorage.getItem('books'));

  if (books === null) {
    books = [];
  }
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}



// Adding books to the table
UI.prototype.addBook = function(book) {
  

const tr = document.createElement('tr');

tr.innerHTML =`
  <td>${book.titre}</td>
  <td>${book.auteur}</td>
  <td>${book.isbn}</td>
  <td><i class="fas fa-trash"></i></td>
  
 `;
 tboyd.appendChild(tr);
}



// Clear all fields after saving a book
UI.prototype.clearFields = function() {
 document.querySelector('#titre').value ='';
 document.querySelector('#auteur').value ='';
  document.querySelector('#isbn').value ='';
}



// message display
UI.prototype.validation = function(classMsg, message) {



  const msgEle = document.querySelector('#message');
  msgEle.className = classMsg;
 

  msgEle.style.display = 'block';
  msgEle.innerHTML = message;

  setTimeout(function() {

    msgEle.style.display = 'none';
  },2000 )

 }


 // Deleting a book
UI.prototype.deleteFun = function(e) {

  // console.log(e.target.parentElement.parentElement.children[1].innerHTML)
  if(e.target.classList.contains('fa-trash')) {
    const confirmation = confirm('Etes vous sûr de vouloir supprimer ce livre');
    if (confirmation) { 
      e.target.parentElement.parentElement.remove();
      ui.validation('added', '<p>Le livre a été supprimé');
    }

    // Saving to localStorage
    const books = JSON.parse(localStorage.getItem('books'));
    const childrenTd = e.target.parentElement.parentElement;
    books.forEach(function(item, index) {
      if (item.titre == childrenTd.children[0].innerHTML && item.auteur == childrenTd.children[1].innerHTML && childrenTd.children[2].innerHTML ) {
       books.splice(index, 1);
      }
    })
      localStorage.setItem('books', JSON.stringify(books));
  }

}


document.querySelector('.form').addEventListener('submit', eventHandler);

function eventHandler(e) {
  e.preventDefault();
  const titre = document.querySelector('#titre').value;
  const auteur = document.querySelector('#auteur').value;
  const isbn = document.querySelector('#isbn').value;
  const book = new Book(titre, auteur, isbn);

  if (book.titre == ''  || book.auteur == '' || book.isbn== '') {
    ui.validation('erreur', '<p>Vous devez renseinger tous les champs</p>');
  }
  else {
    ui.addBook(book);
    ui.validation('added', '<P>Livre ajouté</p>');
    ui.saveToLocalStorage(book);
  }
  ui.clearFields();
}

//Delete icon event listener 

tboyd.addEventListener('click',function(e) {
  
  ui.deleteFun(e);
  
})

UI.prototype.displayBooks = function() {

  JSON.parse(localStorage.getItem('books')).forEach(book => {
  
    ui.addBook(book);
    console.log(book);
  });
  
  }
  ui.displayBooks();