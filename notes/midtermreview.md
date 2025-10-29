# 📚 Web Development Midterm Study Guide

## Table of Contents

-   [HTML Fundamentals](#-html-fundamentals)
-   [CSS Styling](#-css-styling)
-   [JavaScript Programming](#-javascript-programming)
-   [Web Protocols & Networking](#-web-protocols--networking)
-   [Command Line & System Administration](#-command-line--system-administration)

---

## HTML Fundamentals

### Structure & Elements

1. **What does the `<link>` element do?**

    - It links external elements from files, such as a stylesheet or javascript as a file or as a module

2. **What does a `<div>` tag do?**

    - A div tag is a divider

3. **How would you display an image with a hyperlink in HTML?**

    - `<img src="_____">`

4. **What are the opening HTML tags for:**

    - Paragraph: `<p>`
    - Ordered list: `<ol>`
    - Unordered list: `<ul>`
    - First level heading: `<h1>`
    - Second level heading: `<h2>`
    - Third level heading: `<h3>`

5. **How do you declare the document type to be HTML?**
    - _`<!DOCTYPE html>` at the very beginning of the document_

---

## 🎨 CSS Styling

### Selectors & Specificity

6. **What is the difference between the `#title` and `.grid` selector?**

    - _`#title` is an ID selector (unique, higher specificity)_
    - _`.grid` is a class selector (reusable, lower specificity)_

7. **How would you use CSS to change all the div elements to have a background color of red?**
    - _`div { background-color: red; }`_

### Box Model & Layout

8. **What is the difference between padding and margin?**

    - _Padding: space inside the element (between content and border)_
    - _Margin: space outside the element (between border and other elements)_

9. **What does the following padding CSS do?**

    - _[Question requires specific code example]_

10. **In the CSS box model, what is the ordering of the box layers starting at the inside and working out?**

    - _Content → Padding → Border → Margin_

11. **Given the following HTML, what CSS would you use to set the text "trouble" to green and leave the "double" text unaffected?**
    - _[Requires specific HTML structure - likely targeting with specific selector]_

### Flexbox & Display

12. **Given this HTML and this CSS, how will the images be displayed using flex?**

    -   _[Question requires specific code example]_

13. **By default, the HTML `<span>` element has a default CSS display property value of:**
    -   _`inline`_

---

## 💻 JavaScript Programming

### Syntax & Control Flow

14. **What is valid JavaScript syntax for:**

    -   **if/else:**
        ```javascript
        if (condition) {
        } else {
        }
        ```
    -   **for:**
        ```javascript
        for (let i = 0; i < n; i++) {}
        ```
    -   **while:**
        ```javascript
        while (condition) {}
        ```
    -   **switch:**
        ```javascript
        switch (expression) {
            case value:
                break;
            default:
        }
        ```

15. **What does the following code using arrow syntax function declaration do?**
    -   _[Question requires specific code example]_

### Objects & Data Structures

16. **What is the correct syntax for creating a JavaScript object?**

    -   _`const obj = { key: value, key2: value2 };`_
    -   _Or: `const obj = new Object();`_

17. **Is it possible to add new properties to JavaScript objects?**

    -   _Yes! JavaScript objects are dynamic: `obj.newProperty = value;`_

18. **Which of the following correctly describes JSON?**
    -   _JavaScript Object Notation - text-based data interchange format_
    -   _Uses key-value pairs, supports strings, numbers, booleans, arrays, objects, null_

### Arrays & Iteration

19. **What does the following code using `map` with an array output?**

    -   _[Question requires specific code example]_

20. **What will the following code output when executed using a for loop and console.log?**
    -   _[Question requires specific code example]_

### DOM Manipulation

21. **Which of the following are true about the DOM?**

    -   _[Mark all that apply - requires options]_

22. **What does the following code output using `getElementById` and `addEventListener`?**

    -   _[Question requires specific code example]_

23. **What does the following line of JavaScript do using a `#` selector?**

    -   _Selects an element by ID (when using `querySelector('#id')`)_

24. **How would you use JavaScript to select an element with the id of "byu" and change the text color to green?**

    ```javascript
    document.getElementById("byu").style.color = "green";
    // or
    document.querySelector("#byu").style.color = "green";
    ```

25. **If you want to include JavaScript on an HTML page, which tag do you use?**

    -   _`<script src="file.js"></script>` or `<script>/* code */</script>`_

26. **Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?**
    -   _[Requires specific HTML structure - likely using specific selector]_

### Asynchronous JavaScript

27. **What will the following code using Promises output when executed?**
    -   _[Question requires specific code example]_

---

## 🌍 Web Protocols & Networking

### DNS & Domain Names

28. **For the domain name `banana.fruit.bozo.click`:**

    -   **Top-level domain (TLD):** `.click`
    -   **Root domain:** `bozo.click`
    -   **Subdomain:** `banana.fruit` or `fruit.bozo.click` (depending on configuration)

29. **Can a DNS A record point to an IP address or another A record?**
    -   _A records point to IP addresses only_
    -   _CNAME records point to other domain names_

### Security & Certificates

30. **Is a web certificate necessary to use HTTPS?**
    -   _Yes! HTTPS requires an SSL/TLS certificate for encryption_

### Ports & Protocols

31. **Which protocol is reserved for these ports:**
    -   **Port 443:** HTTPS (secure web traffic)
    -   **Port 80:** HTTP (unsecured web traffic)
    -   **Port 22:** SSH (secure shell)

---

## 🖥️ Command Line & System Administration

### Common Commands

32. **What do these console commands do:**

    -   **`chmod`** - Change file permissions/modes
    -   **`pwd`** - Print working directory (show current directory path)
    -   **`cd`** - Change directory
    -   **`ls`** - List directory contents
    -   **`vim`** - Open Vim text editor
    -   **`nano`** - Open Nano text editor
    -   **`mkdir`** - Make directory
    -   **`mv`** - Move or rename files
    -   **`rm`** - Remove files or directories
    -   **`man`** - Display manual pages for commands
    -   **`ssh`** - Secure shell (remote connection)
    -   **`ps`** - Process status (show running processes)
    -   **`wget`** - Web get (download files from the internet)
    -   **`sudo`** - Super user do (execute command with admin privileges)

33. **Which console command creates a remote shell session?**

    -   _`ssh username@hostname`_

34. **What is true when the `-la` parameter is specified for the `ls` command?**
    -   _`-l` shows long format (detailed file information)_
    -   _`-a` shows all files including hidden files (starting with `.`)_
    -   _Combined: shows all files in long format with details_

---

## 📝 Study Tips

-   ✅ Review code examples in your textbook/course materials
-   ✅ Practice writing HTML, CSS, and JavaScript by hand
-   ✅ Test commands in your terminal to understand them better
-   ✅ Create flashcards for syntax and definitions
-   ✅ Build small projects to reinforce concepts

**Good luck on your midterm! 🚀**
