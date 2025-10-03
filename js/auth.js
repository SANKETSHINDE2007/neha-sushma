// js/auth.js
import { auth } from './firebase.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginContainer = document.querySelector('.auth-container');
const registerContainer = document.getElementById('registerContainer');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const authError = document.getElementById('auth-error');
const registerError = document.getElementById('register-error');

// Redirect user if already logged in
onAuthStateChanged(auth, user => {
    if (user) {
        window.location.href = 'index.html';
    }
});

// Toggle between login and register forms
showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'block';
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerContainer.style.display = 'none';
    loginContainer.style.display = 'block';
});

// Login logic
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = 'index.html';
    } catch (error) {
        authError.textContent = error.message;
        console.error("Login failed:", error);
    }
});

// Registration logic
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        window.location.href = 'index.html';
    } catch (error) {
        registerError.textContent = error.message;
        console.error("Registration failed:", error);
    }
});