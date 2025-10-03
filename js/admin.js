// js/admin.js
import { auth, db, storage } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const addBookForm = document.getElementById('addBookForm');
const adminBooksContainer = document.getElementById('adminBooksContainer');
const addBookBtn = document.getElementById('addBookBtn');
const formMessage = document.getElementById('form-message');

// --- Authentication & Authorization Check ---
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists() && userDocSnap.data().role === 'admin') {
            renderAdminBooks();
        } else {
            alert("Access Denied: You do not have permission to view this page.");
            window.location.href = 'index.html';
        }
    } else {
        window.location.href = 'login.html';
    }
});

// --- Render Books for Admin ---
async function renderAdminBooks() {
    adminBooksContainer.innerHTML = '<div class="loader"></div>';
    try {
        const querySnapshot = await getDocs(collection(db, "books"));
        adminBooksContainer.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const book = doc.data();
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card admin-card';
            bookCard.innerHTML = `
                <img src="${book.coverImageUrl || 'https://via.placeholder.com/60x90'}" alt="${book.title}" class="book-cover-small">
                <div class="book-info">
                  <h3>${book.title}</h3>
                  <p>${book.author}</p>
                  <button class="delete-button" data-id="${doc.id}">Delete</button>
                </div>
            `;
            adminBooksContainer.appendChild(bookCard);
        });

        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', async (e) => {
                const bookId = e.target.dataset.id;
                if (confirm('Are you sure you want to delete this book?')) {
                    await deleteBook(bookId);
                }
            });
        });
    } catch (error) {
        console.error("Error fetching admin books: ", error);
        adminBooksContainer.innerHTML = `<p class="error-message">Failed to load books.</p>`;
    }
}

// --- Add Book Logic ---
addBookForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('b_title').value.trim();
    const author = document.getElementById('b_author').value.trim();
    const category = document.getElementById('b_category').value.trim();
    const pdfUrl = document.getElementById('b_pdf_url').value.trim();
    const coverFile = document.getElementById('b_cover').files[0];

    if (!title || !author || !category || !pdfUrl || !coverFile) {
        formMessage.textContent = 'All fields are required.';
        formMessage.className = 'error-message';
        return;
    }

    addBookBtn.disabled = true;
    addBookBtn.textContent = 'Uploading...';
    formMessage.textContent = '';

    try {
        const coverImageRef = ref(storage, `covers/${Date.now()}_${coverFile.name}`);
        const uploadResult = await uploadBytes(coverImageRef, coverFile);
        const coverImageUrl = await getDownloadURL(uploadResult.ref);

        await addDoc(collection(db, "books"), {
            title,
            author,
            category,
            pdfUrl,
            coverImageUrl
        });
        
        formMessage.textContent = 'Book added successfully!';
        formMessage.className = 'success-message';
        addBookForm.reset();
        await renderAdminBooks();

    } catch (error) {
        console.error("Error adding book: ", error);
        formMessage.textContent = 'Failed to add book. Please try again.';
        formMessage.className = 'error-message';
    } finally {
        addBookBtn.disabled = false;
        addBookBtn.textContent = 'Add Book';
    }
});

// --- Delete Book Logic ---
async function deleteBook(bookId) {
    try {
        await deleteDoc(doc(db, "books", bookId));
        await renderAdminBooks();
    } catch (error) {
        console.error("Error deleting book: ", error);
        alert('Failed to delete book.');
    }
}