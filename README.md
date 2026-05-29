# 🔐 Password Generator

A browser-based password generator built with **pure HTML, CSS, and JavaScript** — no libraries, no frameworks.

🔗 **Live Demo:** `coming soon — add your GitHub Pages link here`

---

## 🎯 What This Project Does

- Slider to choose password length (6–25 characters)
- 4 checkboxes — Uppercase, Lowercase, Numbers, Symbols
- Generate button creates a random password instantly
- Password strength indicator — Weak / Medium / Strong
- Progress bar shows strength visually

---

## 🧠 My Full Thinking Process — Every Bug I Faced

This is not just a project. It is a documentation of how I thought, where I failed, how I debugged, and what I learned.

---

### 🐛 Bug 1 — Slider Value Always Returning 6

#### ❌ My First Thought
To get the slider value I simply did:
```javascript
let passwordLength = rangeButton.value;
console.log(passwordLength);
```

The HTML had:
```html
<input type="range" id="range-btn" min="6" max="25" value="6">
```

**Problem:** No matter how much I moved the slider, `passwordLength` always returned `6`.

The reason — JavaScript reads `value="6"` from HTML at page load time and stores it. It never updates automatically when the slider moves.

#### ✅ The Fix — addEventListener with 'input'
```javascript
rangeButton.addEventListener('input', () => {
  passwordStrength = rangeButton.value;
  showRange.textContent = passwordStrength;
});
```

**Lesson:** To get the **current** value of any input as the user interacts — you need an event listener. Reading `.value` directly only gives you the initial value set in HTML.

---

### 🐛 Bug 2 — Checkbox Not Detecting State

#### ❌ My First Thought
I thought to check if a checkbox is selected I could just use:
```javascript
if(uppercase.checked){
  console.log("Inside uppercase");
}
```

**Problem:** Even after checking the box, nothing appeared in the console.

The reason — same as Bug 1. JavaScript executes this code immediately at page load. At that time the checkbox is not checked. The `if` runs once and never again.

#### ✅ The Fix — Event Listener on Checkbox
```javascript
uppercase.addEventListener('change', () => {
  console.log(uppercase.checked); // true when checked, false when unchecked
});
```

Now every time the user clicks the checkbox — the event fires and `.checked` gives the current state.

---

### 🐛 Bug 3 — console.log Outside Event Listener Returns Undefined

#### ❌ The Confusion
```javascript
symbols.addEventListener('change', () => {
  if(symbols.checked){
    password += symbolCharacters;
  }
});
console.log(password); // undefined!
```

**Why undefined?** JavaScript executes synchronously from top to bottom. When it reaches `console.log(password)` — the user has not clicked anything yet. The event listener callback has not run. So `password` is still empty.

#### ✅ The Fix — Log Inside the Event Listener
```javascript
symbols.addEventListener('change', () => {
  if(symbols.checked){
    password += symbolCharacters;
    console.log(password); // now shows correct value
  }
});
```

**Lesson:**
> JavaScript does not wait for user interaction.
> Anything that depends on user input must live INSIDE the event listener.
> This is the same reason `addEventListener('click', fn())` breaks silently —
> JavaScript runs `fn()` immediately without waiting for the click.

---

### 🐛 Bug 4 — Unchecking Checkbox Did Not Remove Characters

#### ❌ The Problem
This was the most interesting bug of the project.

I checked Uppercase and Numbers → generated password → worked perfectly.
Then I unchecked both and checked Lowercase and Symbols → generated password.

**The password still had uppercase letters in it!**

Looking at the console — unchecking showed `false` but the characters were never removed from `password`.

The reason — I was only ever **adding** to password:
```javascript
if(uppercase.checked){
  password += uppercaseLetters; // adds but NEVER removes
}
```

So when unchecked — nothing happened to the existing string. Old characters stayed.

#### ✅ The Fix — Rebuild Character Pool Every Time

Instead of adding/removing, **reset and rebuild the entire string** every time any checkbox changes:

```javascript
function buildCharacterPool() {
  password = "";   // reset completely first
  cnt = 0;
  if(uppercase.checked){ password += uppercaseLetters; cnt++; }
  if(lowercase.checked){ password += lowercaseLetters; cnt++; }
  if(numbers.checked)  { password += numberCharacters; cnt++; }
  if(symbols.checked)  { password += symbolCharacters; cnt++; }
}

uppercase.addEventListener('change', buildCharacterPool);
lowercase.addEventListener('change', buildCharacterPool);
numbers.addEventListener  ('change', buildCharacterPool);
symbols.addEventListener  ('change', buildCharacterPool);
```

Now every checkbox change — whether check OR uncheck — rebuilds the pool from scratch based on what is currently selected.

**Lesson:**
> When managing state that can both increase and decrease,
> don't try to add and remove individually.
> Reset to zero and rebuild from current state every time.
> Cleaner. Simpler. No hidden bugs.

---

### 🐛 Bug 5 — Strength Indicator Kept Increasing Every Click

#### ❌ The Problem
```javascript
indicator.value += 25; // adds 25 every click
```

Clicking Generate 4 times → indicator showed 100 even for a weak password.

#### ✅ The Fix — Set Value Directly
```javascript
if(cnt <= 1)  indicator.value = 25;   // Weak
else if(cnt == 2) indicator.value = 50;  // Medium
else indicator.value = 100;  // Strong
```

**Lesson:**
> `=` sets the value.
> `+=` adds to whatever is already there.
> For indicators and displays — always use `=`.

---

## 💡 The Most Important Lesson from This Project

> **When to use Math.random():**
> Any time you need something to be different every time —
> a random password, a random color, a random food position in a game.
> Don't use it blindly. Use it when unpredictability is the goal.

---

## ✨ Features

- Password length slider (6–25 characters)
- 4 character type options — Uppercase, Lowercase, Numbers, Symbols
- Random password generation using Math.random()
- Password strength indicator — Weak / Medium / Strong
- Alert when no checkbox is selected
- Clean character pool rebuild on every checkbox change

---

## 🛠️ Tech Stack

- **HTML5** — structure, range input, checkboxes
- **CSS3** — layout and progress bar styling
- **JavaScript (Vanilla)**
  - DOM Manipulation — fetching all input elements
  - Event Listeners — input, change, click events
  - String concatenation — building character pool
  - Math.random() — random character selection
  - Progress bar — visual strength indicator

---

## 🚀 Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/Aj1234-p/password-generator.git

# 2. Open in browser
cd password-generator
open index.html
```

> No install needed — just open `index.html` in any browser.

---

## 📁 Project Structure

```
password-generator/
├── gp.html      # Slider, checkboxes, generate button, result display
├── gp.css       # Layout and strength indicator styling
└── gp.js       # All JavaScript logic
    ├── rangeButton listener    # Capture live slider value
    ├── buildCharacterPool()    # Rebuild pool on every checkbox change
    ├── generateButton listener # Generate random password
    └── Strength indicator      # Weak / Medium / Strong based on cnt
```

---

## 📖 What I Learned

- Why `.value` on a range input only gives the initial HTML value
- Why `addEventListener('input')` is needed for live slider updates
- How `.checked` works on checkboxes — and why it needs an event listener
- Why `console.log` outside an event listener returns undefined
- Why JavaScript does not wait for user interaction (synchronous execution)
- How to rebuild state from scratch instead of adding and removing
- Why `=` and `+=` are completely different for indicators and displays
- When and why to use `Math.random()`

---

## 🙋 Author

Built with ❤️ and **a lot of console.log() debugging** by **Ajit**

> ⭐ If this README taught you something about debugging, give it a star!
