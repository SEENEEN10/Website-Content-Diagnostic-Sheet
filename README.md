# Website Content Diagnostic Form

This project provides a web form for your full diagnostic questionnaire and sends every submission to:

- Email: `dsinai@calx.sa` (only)

## 1) Install

```bash
npm install
```

## 2) Configure

```bash
cp .env.example .env
```

Edit `.env` with your SMTP credentials.  
Without SMTP, submissions cannot be emailed.

## 3) Run

```bash
npm start
```

Open:

`http://localhost:3000`

## Notes

- The questionnaire includes all 6 sections and all questions you listed.
- Submissions are sent server-side through `/api/submit`.
- Recipient email is fixed to `dsinai@calx.sa`.
