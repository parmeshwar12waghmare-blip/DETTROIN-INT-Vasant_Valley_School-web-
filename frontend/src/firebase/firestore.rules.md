# Firestore Security Rules — Vasant Valley School ERP
# Apply these rules in Firebase Console → Firestore Database → Rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // ── Helper Functions ─────────────────────────────────────────────────────
    function isAuthenticated() {
      return request.auth != null;
    }

    function isOwner(uid) {
      return request.auth.uid == uid;
    }

    function getUserRole() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role;
    }

    function isAdmin() {
      return isAuthenticated() && getUserRole() == 'admin';
    }

    function isTeacher() {
      return isAuthenticated() && (getUserRole() == 'teacher' || getUserRole() == 'admin');
    }

    // ── USER PROFILES ─────────────────────────────────────────────────────────
    match /users/{uid} {
      // Users can read and write their own profile; admins can read/write all
      allow read:  if isOwner(uid) || isAdmin();
      allow write: if isOwner(uid) || isAdmin();
      allow create: if isAdmin();
    }

    // ── STUDENT ACADEMIC DATA ─────────────────────────────────────────────────
    match /students/{uid} {
      allow read:  if isOwner(uid) || isTeacher();
      allow write: if isAdmin();
    }

    // ── GRADES ────────────────────────────────────────────────────────────────
    match /grades/{docId} {
      allow read:  if isAuthenticated();
      allow write: if isTeacher();
    }

    // ── ATTENDANCE ────────────────────────────────────────────────────────────
    match /attendance/{docId} {
      allow read:  if isAuthenticated();
      allow write: if isTeacher();
    }

    // ── FEES ──────────────────────────────────────────────────────────────────
    match /fees/{docId} {
      allow read:  if isAuthenticated();
      allow write: if isAdmin();
    }

    // ── EVENTS (Public calendar) ──────────────────────────────────────────────
    match /events/{docId} {
      allow read:  if true;       // Public read — no auth needed
      allow write: if isAdmin();
    }

    // ── ANNOUNCEMENTS ─────────────────────────────────────────────────────────
    match /announcements/{docId} {
      allow read:  if true;       // Public
      allow write: if isAdmin();
    }

    // ── CONTACT INQUIRIES ─────────────────────────────────────────────────────
    match /contact_inquiries/{docId} {
      allow create: if true;      // Anyone can submit
      allow read:   if isAdmin();
      allow update, delete: if isAdmin();
    }

    // ── ADMISSIONS ────────────────────────────────────────────────────────────
    match /admissions/{docId} {
      allow create: if true;      // Anyone can apply
      allow read:   if isAdmin();
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }

    // ── QUERY LOGS ────────────────────────────────────────────────────────────
    match /query_logs/{docId} {
      allow create: if isAuthenticated();
      allow read:   if isAdmin();
      allow delete: if isAdmin();
    }
  }
}
```

## How to Apply

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project → **Firestore Database**
3. Click the **Rules** tab
4. Paste the rules above
5. Click **Publish**

## Role Summary

| Collection         | Public | Student/Parent | Teacher | Admin |
|--------------------|--------|---------------|---------|-------|
| users              | ❌     | Own only      | ❌      | ✅ All |
| students           | ❌     | Own only      | Read    | ✅ All |
| grades             | ❌     | Read          | Write   | ✅ All |
| attendance         | ❌     | Read          | Write   | ✅ All |
| fees               | ❌     | Read          | Read    | ✅ All |
| events             | ✅ Read| ✅ Read        | ✅ Read  | Write  |
| announcements      | ✅ Read| ✅ Read        | ✅ Read  | Write  |
| contact_inquiries  | Create | Create        | ❌      | ✅ All |
| admissions         | Create | Create        | ❌      | ✅ All |
| query_logs         | ❌     | Create        | Create  | ✅ All |
