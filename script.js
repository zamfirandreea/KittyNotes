const container = document.getElementsByClassName("container")[0];
const titleInput = document.getElementsByClassName("title")[0];
const descriptionInput = document.getElementsByClassName("description")[0];
const colorInput = document.getElementsByClassName("color")[0];
const cancelBtn = document.getElementsByClassName("cancel_btn")[0];
const submitBtn = document.getElementsByClassName("submit_btn")[0];
const buttonSection = document.getElementsByClassName("button_section")[0];

let notes;

const initNoteForm = () => {
    descriptionInput
        .style.display = "none";
    buttonSection
        .style.display = "none";
    titleInput
        .addEventListener("click", display);

    addNoteCancelListener();
    addNoteAddListener();
};

const display = () => {
    descriptionInput
        .style.display = "block";
    buttonSection
        .style.display = "flex";
};

const addNoteCancelListener = () => {
    cancelBtn
        .addEventListener("click", clearNoteForm);
};

const clearNoteForm = () => {
    descriptionInput
        .style.display = "none";
    buttonSection
        .style.display = "none";
    titleInput.innerText = '';
    descriptionInput.innerText = '';
    document.getElementsByClassName("note")[0].className = "note";
};

const addNoteAddListener = () => {
    submitBtn
        .addEventListener("click", addNoteEvent);
};

const addNoteEvent = () => {
    const newNote = getNewNoteValues();
    if(getNewNoteValues().description.length !== 0 || getNewNoteValues().title.length !== 0){
        createNote(newNote);
        clearNoteForm();
        saveNoteData(newNote);
    } else {
    alert('The note is empty!');
}

};

const saveNoteData = (noteData) => {
    notes.push(noteData);
    localStorage.setItem("notes", JSON.stringify(notes));

};

const createNote = (newNote) => {
    const noteSectionCmp = document.createElement("section");
    const noteTitleCmp = document.createElement("div");
    const noteDescriptionCmp = document.createElement("div");
    const actionsSectionCmp = document.createElement("section");
    const deleteBtn = document.createElement("button");

    noteSectionCmp.className = "note_section";
    noteTitleCmp.className = "note_title";
    noteDescriptionCmp.className = "note_description";
    actionsSectionCmp.className = "actions_section";
    deleteBtn.className = "delete_btn";

    noteTitleCmp.contentEditable = "true";
    noteDescriptionCmp.contentEditable = "true";

    deleteBtn.type = "reset";
    deleteBtn.innerHTML = "Delete";

    noteTitleCmp.addEventListener("input", updateNoteTitle);
    noteDescriptionCmp.addEventListener("input", updateNoteDescription);

    addNoteValues(noteTitleCmp, noteDescriptionCmp, newNote);

    const colorClass = determineNoteColorCLass(newNote.color);
    if(colorClass) {
        noteSectionCmp.classList.add(colorClass);
    }

    actionsSectionCmp.appendChild(deleteBtn);
    noteSectionCmp.appendChild(noteTitleCmp);
    noteSectionCmp.appendChild(noteDescriptionCmp);
    noteSectionCmp.appendChild(actionsSectionCmp);
    container.appendChild(noteSectionCmp);

    noteSectionCmp.setAttribute('data', JSON.stringify(newNote));
    deleteBtn.addEventListener("click", deleteEvent);
};


const updateNoteTitle = (event) => {
    let inputField = event.currentTarget;
    const noteData = JSON.parse(inputField.parentNode.getAttribute("data"));
    deleteNoteData(noteData);
    noteData.title = inputField.innerText;
    inputField.parentNode.setAttribute("data", JSON.stringify(noteData));
    saveNoteData(noteData);
};
const updateNoteDescription = (event) => {
    let inputField = event.currentTarget;
    const noteData = JSON.parse(inputField.parentNode.getAttribute("data"));
    deleteNoteData(noteData);
    noteData.description = inputField.innerText;
    inputField.parentNode.setAttribute("data", JSON.stringify(noteData));
    saveNoteData(noteData);
};

const addNoteValues = (title, description, note) => {
        title.innerText = note.title;
        description.innerText = note.description;
};

const getNewNoteValues = () => {
    return {
        title: titleInput.innerText,
        description: descriptionInput.innerText,
        color: colorInput.value
    };
};

const deleteEvent = (event) => {
    // console.log(event);
    const section = event.currentTarget.parentNode.parentNode;
    deleteNoteData(JSON.parse(section.getAttribute('data')));
    section.remove();
};

const deleteNoteData = (noteData) => {
    notes = notes.filter(note => !(note.title === noteData.title && note.description === noteData.description));
    localStorage.setItem('notes', JSON.stringify(notes));
};

const loadSavedNotes = () => {
    notes = JSON.parse(localStorage.getItem('notes'));
    if (!notes) {
        notes = [];
    }
    if (notes.length > 0) {
        notes.forEach(note => {
            createNote(note);
        })
    }
};

const initColorListeners = () => {
    const colors = document.getElementsByClassName("color");
    const colorsList = Array.prototype.slice.call(colors);
    colorsList.forEach(color => color.addEventListener("click", changeColor));
};

let noteDefaultClasses='';

const determineNoteColorCLass = (formColor) => {
    switch (formColor) {
        case "white":
            return "white_background";
        case "red":
            return "red_background";
        case "blue":
            return "blue_background";
        case "green":
            return "green_background";
        case "purple":
            return "purple_background";
        case "yellow":
            return "yellow_background";
    }
     return null;
};

const changeColor = (event) => {
    const noteComp = document.getElementsByClassName("note")[0];
    if(noteDefaultClasses.length === 0){
     noteDefaultClasses = noteComp.className;
    }
    const formColor = event.currentTarget.getAttribute("color");

    noteComp.className = noteDefaultClasses;

    let newClassToAdd = determineNoteColorCLass(formColor);
    colorInput.value = formColor;
    if(newClassToAdd){
        noteComp.classList.add(newClassToAdd);
    }
};

const init = () => {
    initNoteForm();
    loadSavedNotes();
    initColorListeners();
};

init();
