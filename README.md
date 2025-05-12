# ✈️ Planedle

**Planedle** is a full-stack web game inspired by Wordle — but for aviation lovers. Guess the airline and aircraft type based on masked hints. Built with a modern Java + React stack.

---

## 🚀 Tech Stack

| Layer       | Tech                                      |
|-------------|-------------------------------------------|
| Frontend    | [React](https://react.dev/), [Next.js](https://nextjs.org/), Tailwind CSS |
| Backend     | [Spring Boot](https://spring.io/projects/spring-boot), Java 21 |
| API Comm    | RESTful endpoints with CORS support       |
| Config      | Environment-based setup via `.env` and `application.yml` |
| Dev Tools   | IntelliJ IDEA, VS Code, Git, GitHub       |

---

## 🧩 Features

- 🛫 Randomly generated airline + aircraft challenge
- 🔡 Letter-by-letter masking with reveal logic
- 💬 Input validation with guess limits
- 🎉 Confetti celebration on correct answers
- 🔁 CORS-secured API integration
- 🌍 Environment-specific backend URL setup

---

## 🧪 Getting Started

### 🔧 Prerequisites

- Node.js 18+
- Java 21+
- Maven or Gradle
- Git

---

### 🖥 Frontend (React + Next.js)

```bash
cd frontend
npm install
cp .env.local.example .env.local
# Set your API base:
# NEXT_PUBLIC_API_URL=http://localhost:8080
npm run dev
```

### ⚙️ Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
# or for Gradle users:
# ./gradlew bootRun
```

## 🌍 Environment Config

| File            | Purpose                             |
|-----------------|-------------------------------------|
| `.env.local`    | Frontend base API URL               |
| `application.yml` | Backend CORS origins & app config  |

---

## 🧠 Inspiration

Built out of love for aviation, guessing games, and learning full-stack development.

---

## 📄 License

MIT — free to use, modify, or fork with credit.

---

## ✨ Author

Made with love by **Tomas Holinka** :D

---

## ❓ Ending a Bash Session

To end or exit a **Bash** session (terminal), you can simply type:

```bash
exit
```
or press:
```bash
Ctrl + D
```
