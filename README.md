# E-Library Management System (Firebase-ready)

This is a complete front-end project for a college **E-Library Management System**. It supports **Firebase** (Authentication, Firestore, Storage) — but also works in a **LOCAL fallback mode** so you can fully test the UI without configuring Firebase yet.

---
## What is included (files)

- `index.html` — public library page (browse, search)
- `admin.html` — admin panel (add book, delete) — simple auth expected
- `styles.css` — modern responsive styles
- `app.js` — main page logic (supports Firebase or LOCAL)
- `admin.js` — admin page logic (supports Firebase or LOCAL)
- `firebase-config.js` — placeholder for your Firebase config
- `assets/cover-placeholder.png` and `assets/sample.pdf` — sample assets
- `README.md` — this file

---
## How to test locally (without Firebase)
1. Unzip the project and open `index.html` in your browser.
2. The app runs in LOCAL mode and uses `localStorage` to store sample books.
3. Click **Admin** to go to admin page. Add books (you can upload a PDF file — the browser will create a blob URL stored in localStorage).
4. Use the search bar and filters on the homepage to test functionality.

Note: Local mode persists data in your browser only.

---
## How to connect Firebase (recommended for final project)
1. Create a Firebase project at https://console.firebase.google.com/
2. Enable **Authentication** -> Email/Password, **Firestore** (in native mode), and **Storage** (if you want uploads).
3. In Firebase Console go to Project Settings -> SDK setup and config, copy the **firebaseConfig** object.
4. Paste the config into `firebase-config.js` replacing the placeholder values.
5. Host the site:
   - Option A: Install Firebase CLI (`npm i -g firebase-tools`), `firebase login`, then `firebase init hosting` and `firebase deploy`.
   - Option B: Upload to GitHub Pages (but you must serve over HTTPS to use Firebase services).

---
## Testing checklist (what I recommend you test)
- [ ] Open `index.html` — does sample data show?
- [ ] Search works (partial matches)
- [ ] Category filter works
- [ ] Login modal opens and register login flow works (LOCAL mode will accept any credentials)
- [ ] Admin: add book with URL and with file (local mode)
- [ ] Admin: delete book
- [ ] Uploading in Firebase mode correctly stores file in Storage and document in Firestore
- [ ] Viewing a book opens the PDF in a new tab

---
## Troubleshooting & common fixes
- If books don't load in Firebase mode: check `firebase-config.js` for correct values and ensure Firestore rules allow reads (for testing set to allow reads/writes temporarily).
- If Storage upload fails: check Firebase Storage rules and the bucket name in config.
- If auth fails: ensure Email/Password provider is enabled in Firebase Authentication panel.
- Console logs: open DevTools (F12) and check console for errors — they often point to missing config or CORS/storage rules.

---
## Notes for submission
- Keep `firebase-config.js` out of public repo if you have a real API key (for college repo you can include it). For a presentation, show a demo using the LOCAL mode or deploy to Firebase Hosting.

---
Good luck! If you want, I can now:
- (A) Add React version, or
- (B) Prepare a Firebase deployment guide with exact CLI commands, or
- (C) Walk through setting Firestore rules for security.

Tell me which next step you want.
