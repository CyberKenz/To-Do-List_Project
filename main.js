const addList = document.getElementById("addList");
const removeList = document.getElementById("removeList");
const sectionList = document.getElementById("sectionList");
const list = document.getElementById('list')

function saveToLocalStorage() {
    const listItems = list.querySelectorAll('li span')
    const items = Array.from(listItems).map(span => span.textContent);
    localStorage.setItem('itemsList', JSON.stringify(items));
}

function loadFromLocalStorage(){
    const savedItems = localStorage.getItem('itemsList')
    if(savedItems){
        const items = JSON.parse(savedItems);
        items.forEach(itemText => {
            createListItem(itemText);
        });
    }
}

function createListItem(inputList) {
    let li = document.createElement('li')
    li.className = 'w-full break-words flex justify-between items-center text-white pt-3 pb-1 text-sm font-semibold border-b border-zinc-200 hover:text-orange-500 transition';
    
    let span = document.createElement('span')
    span.textContent = inputList
    
    let editIcon = document.createElement('i');
    editIcon.className = 'fa-solid fa-pen text-zinc-200 text-sm hover:text-blue-400 hover:-translate-y-1 transition cursor-pointer ml-2';
    
    editIcon.addEventListener('click', () => {
        let editedText = prompt(`Edit List: ${span.textContent}`);
        if(editedText && editedText.length <= 30){
            span.textContent = editedText;
            saveToLocalStorage()
        }else if(editedText && editedText.length > 30){
            alert("Anda hanya dapat menuliskan maksimal 30 karakter");
        }
    });
    
    li.appendChild(span);
    li.appendChild(editIcon);
    list.append(li);
}

loadFromLocalStorage();

addList.addEventListener("click", () => {
    let inputList = prompt("Masukkan list materi");
    if(inputList) {
        if(inputList.length > 30){
            alert("Anda hanya dapat menuliskan maksimal 30 karakter")
            return
        };
        
        createListItem(inputList);
        saveToLocalStorage()
    }
});

removeList.addEventListener('click', () => {
    if(list.lastChild){
        list.removeChild(list.lastChild)
        saveToLocalStorage()
    }
});