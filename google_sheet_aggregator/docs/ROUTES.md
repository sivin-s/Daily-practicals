# API Routes Documentation

Base URL: `/api`

---

## 🔐 Auth Routes
> File: `src/routes/authRoutes.ts`

---

### `GET /api/`
Landing page with a Google login link.

- **Auth required:** No
- **Response:** HTML page with a "Login with Google" link

---

### `GET /api/auth/google`
Initiates the Google OAuth2 login flow. Redirects the user to Google's consent screen.

- **Auth required:** No
- **OAuth Scopes requested:**
  - `email`
  - `profile`
  - `https://www.googleapis.com/auth/spreadsheets.readonly`
- **Access Type:** `offline` — requests a refresh token for background tasks
- **Prompt:** `consent` — always shows the consent screen (ensures refresh token is returned)
- **Response:** Redirect → Google OAuth consent page

---

### `GET /api/auth/google/callback`
Google redirects back here after the user approves (or denies) the consent screen.

- **Auth required:** No (handled by Passport internally)
- **On success:** Redirect → `GET /api/profile`
- **On failure:** Redirect → `GET /api/`

---

### `GET /api/profile`
Returns the logged-in user's profile page.

- **Auth required:** Yes (session cookie)
- **On success (200):** HTML page showing:
  - User's `displayName`
  - Profile photo
  - Logout link
- **On failure:** Redirect → `GET /api/`

---

### `GET /api/logout`
Logs the user out and destroys the session.

- **Auth required:** Yes (session cookie)
- **On success:** Redirect → `GET /api/`
- **On failure:** Passes error to Express error handler

---

## 📊 Sheet Routes
> File: `src/routes/sheetRoutes.ts`
> All routes below require the user to be logged in via Google OAuth.

---

### `POST /api/save-sheet`
Saves the user's Google Spreadsheet ID and sheet range to their MongoDB profile.

- **Auth required:** Yes (`isAuthenticated` middleware)
- **Request Body (JSON):**

```json
{
  "spreadsheetId": "your-google-spreadsheet-id",
  "range": "Sheet1!A1:D10"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `spreadsheetId` | `string` | ✅ Yes | The Google Sheets document ID |
| `range` | `string` | No | The A1 notation range (e.g. `Sheet1!A1:D10`) |

- **Response (200):**
```json
{ "message": "Spreadsheet ID saved successfully!!!" }
```

- **Errors:**

| Status | Reason |
|---|---|
| `400` | `spreadsheetId` is missing in the request body |
| `401` | User is not logged in |
| `500` | Internal server error |

---

### `POST /api/data`
Fetches data from the user's saved Google Spreadsheet using their stored OAuth tokens.

- **Auth required:** Yes (`isAuthenticated` middleware)
- **Request Body:** None — uses the `defaultSpreadSheetId` and `sheetRange` already saved via `/api/save-sheet`

- **Response (200):** 2D array of sheet values
```json
[
  ["Name", "Age", "City"],
  ["Alice", "30", "New York"],
  ["Bob", "25", "London"]
]
```

- **Errors:**

| Status | Reason |
|---|---|
| `400` | `userId` missing from session |
| `400` | No `spreadsheetId` saved — call `/api/save-sheet` first |
| `400` | No `sheetRange` saved — call `/api/save-sheet` first |
| `401` | User is not logged in |
| `404` | User not found in DB |
| `500` | Internal server error or Google Sheets API error |

> **Note:** If the Google access token is expired, the Google API client will automatically refresh it using the stored `refreshToken` and save the new token to the DB.

---

## 🔄 Typical User Flow

```
1. GET  /api/                        → Landing page
2. GET  /api/auth/google             → Redirect to Google consent
3. GET  /api/auth/google/callback    → Google redirects back, session created
4. GET  /api/profile                 → View profile (logged in)
5. POST /api/save-sheet              → Save spreadsheet ID + range
6. POST /api/data                    → Fetch sheet data
7. GET  /api/logout                  → Logout
```
