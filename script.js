const container = document.getElementsByClassName("container")[0];
const titleInput = document.getElementsByClassName("title")[0];
const descriptionInput = document.getElementsByClassName("description")[0];
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
    titleInput.value = '';
    descriptionInput.value = '';
    document.getElementsByClassName("note")[0].className = "note";
};

const addNoteAddListener = () => {
    submitBtn
        .addEventListener("click", addNoteEvent);
};

const addNoteEvent = () => {
    const newNote = getNewNoteValues();
    createNote(newNote);
    clearNoteForm();
    saveNoteData(newNote);
};

const saveNoteData = (noteData) => {
    notes.push(noteData);
    localStorage.setItem("notes", JSON.stringify(notes));

};

const createNote = (newNote) => {
    const noteSectionCmp = document.createElement("section");
    const noteTitleCmp = document.createElement("h2");
    const noteDescriptionCmp = document.createElement("p");
    const actionsSectionCmp = document.createElement("section");
    const deleteBtn = document.createElement("button");

    noteSectionCmp.className = "note_section";
    noteTitleCmp.className = "note_title";
    noteDescriptionCmp.className = "note_description";
    actionsSectionCmp.className = "actions_section";
    deleteBtn.className = "delete_btn";

    deleteBtn.type = "reset";
    deleteBtn.innerHTML = "Delete";

    addNoteValues(noteTitleCmp, noteDescriptionCmp, newNote);

    actionsSectionCmp.appendChild(deleteBtn);
    noteSectionCmp.appendChild(noteTitleCmp);
    noteSectionCmp.appendChild(noteDescriptionCmp);
    noteSectionCmp.appendChild(actionsSectionCmp);
    container.appendChild(noteSectionCmp);

    noteSectionCmp.setAttribute('data', JSON.stringify(newNote));
    deleteBtn.addEventListener("click", deleteEvent);
};

const addNoteValues = (title, description, note) => {
    title.innerHTML = note.title;
    description.innerHTML = note.description;
};

const getNewNoteValues = () => {
    return {
        title: titleInput.value,
        description: descriptionInput.value
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

const changeColor = (event) => {
    const formColor = event.currentTarget.getAttribute("color");
    const noteComp = document.getElementsByClassName("note")[0]
    switch (formColor) {
        case "white":
            noteComp.className = "note";
            noteComp.classList.add("white_background");
            break;
        case "red":
            noteComp.className = "note";
            noteComp.classList.add("red_background");
            break;
        case "blue":
            noteComp.className = "note";
            noteComp.classList.add("blue_background");
            break;
        case "green":
            noteComp.className = "note";
           noteComp.classList.add("green_background");
            break;
        case "purple":
            noteComp.className = "note";
            noteComp.classList.add("purple_background");
            break;
        case "yellow":
            noteComp.className = "note";
           noteComp.classList.add("yellow_background");
            break;
    }
};

const init = () => {

    initNoteForm();
    loadSavedNotes();
    initColorListeners();
};

init();
