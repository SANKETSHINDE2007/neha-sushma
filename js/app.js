// js/app.js
import { auth, db } from './firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const booksContainer = document.getElementById('booksContainer');
const searchInput = document.getElementById('search');
const logoutBtn = document.getElementById('logoutBtn');
const userEmailDisplay = document.getElementById('userEmail');
const adminLink = document.getElementById('adminLink');

let allBooks = []; // Cache books to avoid re-fetching

// --- Authentication & Role Check ---
onAuthStateChanged(auth, async (user) => {
    if (user) {
        userEmailDisplay.textContent = user.email;
        logoutBtn.style.display = 'inline-block';
        fetchBooks();

        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists() && userDocSnap.data().role === 'admin') {
            adminLink.style.display = 'inline-block';
        }
    } else {
        window.location.href = 'login.html';
    }
});

// --- Logout ---
logoutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Sign out error', error);
    }
});

// --- Book Fetching and Rendering ---
async function fetchBooks() {
    try {
        const querySnapshot = await getDocs(collection(db, "books"));
        allBooks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderBooks(allBooks);
    } catch (error) {
        console.error("Error fetching books: ", error);
        booksContainer.innerHTML = '<p class="error-message">Could not load books. Please try again later.</p>';
    }
}

function renderBooks(books) {
    if (!booksContainer) return;
    booksContainer.innerHTML = '';

    if (books.length === 0) {
        booksContainer.innerHTML = '<p>No books found.</p>';
        return;
    }

    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <img src="${book.coverImageUrl || './assets/cover-placeholder.png'}" alt="Cover for ${book.title}" class="book-cover">
            <div class="book-info">
              <h3>${book.title}</h3>
              <p>by ${book.author}</p>
              <p class="category">${book.category}</p>
              <button class="view-button">View/Download</button>
            </div>
        `;
        bookCard.querySelector('.view-button').addEventListener('click', () => {
            if (book.pdfUrl) {
                window.open(book.pdfUrl, '_blank');
            } else {
                alert('No PDF link available for this book.');
            }
        });
        booksContainer.appendChild(bookCard);
    });
}

// --- Search Functionality ---
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    if (searchTerm === '') {
        renderBooks(allBooks);
        return;
    }

    const filteredBooks = allBooks.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm)
    );
    renderBooks(filteredBooks);
});