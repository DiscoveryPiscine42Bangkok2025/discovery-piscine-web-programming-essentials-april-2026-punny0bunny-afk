const ftList = document.getElementById('ft_list');
const newBtn = document.getElementById('new_btn');

// --- Initialization ---
window.onload = () => {
    loadTodoList();
};

// --- Event Listeners ---
newBtn.addEventListener('click', () => {
    const task = prompt("Enter a new TO DO:");
    if (task && task.trim() !== "") {
        addTaskToDom(task, true); // true means add to top
        saveTodoList();
    }
});

// --- Functions ---

function addTaskToDom(text, toTop = true) {
    const div = document.createElement('div');
    div.textContent = text;

    // Remove task on click
    div.addEventListener('click', () => {
        if (confirm("Do you really want to remove this TO DO?")) {
            div.remove();
            saveTodoList();
        }
    });

    if (toTop) {
        ftList.prepend(div);
    } else {
        ftList.appendChild(div);
    }
}

// --- Cookie Management ---

function saveTodoList() {
    const tasks = [];
    const items = ftList.querySelectorAll('div');
    // Store in order so they reload correctly
    items.forEach(item => tasks.push(item.textContent));
    
    // Convert array to JSON string and store in cookie
    // Encoded to handle special characters
    const cookieValue = encodeURIComponent(JSON.stringify(tasks));
    document.cookie = `todo_list=${cookieValue}; path=/; max-age=31536000`; // Expires in 1 year
}

function loadTodoList() {
    const cookies = document.cookie.split('; ');
    const todoCookie = cookies.find(row => row.startsWith('todo_list='));

    if (todoCookie) {
        try {
            const jsonString = decodeURIComponent(todoCookie.split('=')[1]);
            const tasks = JSON.parse(jsonString);
            // Reverse the array so that 'prepend' doesn't flip the original order
            tasks.reverse().forEach(task => addTaskToDom(task, true));
        } catch (e) {
            console.error("Error parsing cookies", e);
        }
    }
}
