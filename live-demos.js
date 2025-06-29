/*
FCC Creature Demo Start
 */

const creatures = [
    {name: 'Pyrolynx',id: 1, weight: 42, height: 32, hp: 65, attack: 80, defense: 50, specialAttack: 90, specialDefense: 55,  speed: 100, types: ['fire'] },
    {name: 'Aquoroc',id: 2, weight: 220, height: 53, hp: 85, attack: 90, defense: 120, specialAttack: 60, specialDefense: 75,  speed: 40, types: ['water', 'rock']},
    {name: 'Terradon',id: 3, weight: 60, height: 58, hp: 95, attack: 120, defense: 12, specialAttack: 9, specialDefense: 95,  speed: 44, types: ['psychic', 'steel']},
    {name: 'Beastmere',id: 4, weight: 22, height: 54, hp: 155, attack: 70, defense: 19, specialAttack: 43, specialDefense: 45,  speed: 88, types: ['fairy', 'electric']},
];


document.getElementById('search-button').addEventListener('click', (event) => {
    event.preventDefault();
    const searchValue = document.getElementById('search-input').value.trim().toLowerCase();

    const found = creatures.find(creature =>
        creature.name.toLowerCase() === searchValue ||
        creature.id.toString() === searchValue
    );

    const nameEl = document.getElementById('creature-name');
    const idEl = document.getElementById('creature-id');
    const weightEl = document.getElementById('weight');
    const heightEl = document.getElementById('height');
    const hpEl = document.getElementById('hp');
    const attackEl = document.getElementById('attack');
    const defenseEl = document.getElementById('defense');
    const specialAttackEl = document.getElementById('special-attack');
    const specialDefenseEl = document.getElementById('special-defense');
    const speedEl = document.getElementById('speed');
    const typesEl = document.getElementById('types');

    if (!found) {
        alert('Creature not found');
        return;
    }

    // update creature details
    nameEl.textContent = found.name.toUpperCase();
    idEl.textContent = `#${found.id}`;
    weightEl.textContent = `Weight: ${found.weight}`;
    heightEl.textContent = `Height: ${found.height}`;
    hpEl.textContent = found.hp;
    attackEl.textContent = found.attack;
    defenseEl.textContent = found.defense;
    specialAttackEl.textContent = found.specialAttack;
    specialDefenseEl.textContent = found.specialDefense;
    speedEl.textContent = found.speed;

    // clear and populate types
    typesEl.innerHTML = '';
    found.types.forEach(type => {
        const typeElement = document.createElement('div');
        typeElement.textContent = type.toUpperCase();
        typeElement.classList += type.toLowerCase();
        typesEl.appendChild(typeElement);
    });
});

/*
FCC Creature Demo End
 */


/*
RSVP Demo Start
 */
//get the form by it's input id "registrar" and select its input child element

/*
forms can be submited multiple ways - via the submit button or even the enter key
to capture both methods, we set an handler on the form itself with the submit event
*/

// create a refence to the form element
const form = document.getElementById('registrar');
// references the inout element inside the form, so we can read the user input
const input = form.querySelector('input');
//move ul declarion outside of form function so that sumbit handler and change handler have access to it
const ul = document.getElementById('invitedList');

//the sumbit event to log user inputs -- arrow function used to define anonymous function
form.addEventListener('submit', (e) => {
    //call preventDefault on the evnet object e to prevent the page from reloading after submitting (as we aren't sending the data here to a remote server)
    e.preventDefault();

    //add user input to the unordered list element
    const text = input.value;
    const li = document.createElement('li');
    const span = document.createElement('span');

    //set the value of the li element to the user input
    span.textContent = text;
    li.appendChild(span);

    //create a check box with the list item so it can be filtered later
    const label = document.createElement('label');
    label.textContent = 'Confirmed';
    const checkbox = document.createElement('input');
    //set input type to checkbox
    checkbox.type = 'checkbox';
    label.appendChild(checkbox);
    //append checkbox to list element
    li.appendChild(label);

    // ****** Edit a name code START ******
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    //want to append our button to the list item
    li.appendChild(editButton);
    // ****** Edit a name code  END ******

    // ****** Remove a name code START ******
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    //want to append our button to the list item
    li.appendChild(removeButton);
    // ****** Remove a name code  END ******

    //append list element to the unordered list parent
    ul.appendChild(li);
    //clear the input field to make it easier to add new inputs
    input.value = '';
});

//create the change handler
ul.addEventListener('change', (e) => {
    const checkbox = event.target;
    const checked = checkbox.checked;

    /* to change the class of the list item when the checkbox is checked we need a reference to the list item
    the list item is the grandparent of the checkbox, to traverse to the grandparent node we can call the parent node twice
    */
    const listItem = checkbox.parentNode.parentNode;

    //set the list class name to respondeed if checked is true, else remove it if false
    if (checked){
        listItem.className = 'responded';
    } else {
        listItem.className = '';
    }
});

//create the remove handler
/* creates a delagated handler just like the change handler, because
the user may add/delete lots of names it's better to use the parent element as
the event receiver and handle what should happen when remove button is clicked

the click event bubbles up when the user clicks the remove button.
meaning that the click event is initaily recieved by the button, but travels up the
DOM to the li, and then ul element.
*/
ul.addEventListener('click', (e) => {
    //filter out elements that are not buttons
    //if the target elements tag name is button -- do something -- Note: there maybe other buttons beside our remove button,
    // defrenetiation will be coded later by reading the buttons text content (or set class names on the buttons and read those)
    if (e.target.tagName === 'BUTTON') {
        //get a reference to the li item from the button

        const li = e.target.parentNode;
        //traverse to list items parent node
        const ul = li.parentNode;

        //wrap in new if statement to check the text content of the button to ensure that only the remove button removes list items
        if (e.target.textContent === 'Remove') {
            ul.removeChild(li);
        }
        //add edit button logic
        else if (e.target.textContent === 'Edit') {
            /* to manipultate DOM into an editing state we must turn the text into an input area to be able to edit the text
            for this to work, the text will also need to be removed from the list item to replace it with the new.

            the text is not a html element, instead its a text element, meaning it's accessed an manipulated differently from that of a html element
            to manipulate it easier we must convert it into a html span element. we do this be modifiying the create li function
            */

            //select the span to be able to edit
            const span = li.firstElementChild;
            //create input element we want to replace the span with
            const input = document.createElement('input');
            //configure input to be a text input
            input.type = 'text';

            //add the current text in the span element (name content) to the input element to allow users to edit it
            input.value = span.textContent;

            //use the span to place the new input element into the DOM using insert before -- we want to place the new input element before the span
            li.insertBefore(input,span);
            //finally call remove child on span to remove it
            li.removeChild(span);

            //change edit button from saying edit to save
            e.target.textContent = 'Save';
        }

        //the save functionaility
        else if (e.target.textContent === 'Save') {
            //the first child will now be an input element instead of a span like in the edit functionaility
            const input = li.firstElementChild;
            const span = document.createElement('span');
            //set spans text content to the inputs value. is a reverse of edits input.value = span.textContent;
            span.textContent = input.value;
            li.insertBefore(span,input);
            li.removeChild(input);
            e.target.textContent = 'Edit';
            /* the save function is basicaly just the reverse of the edit function*/
        }
    }
})


//create filter for unresponded guests (hide who hasn't responded)
const div = document.createElement('div');
const filterLabel = document.createElement('label');
const filterCheckbox = document.createElement('input');
filterLabel.textContent = 'Hide Unresponded';
filterCheckbox.type = 'checkbox';

//append label and checkbox to div
div.appendChild(filterLabel);
div.appendChild(filterCheckbox);

//to instert the div above the ul list we use insert before on the parent of the ul (div with class of main which sits under the form in the DOM)
const mainDiv = document.querySelector('.main');
mainDiv.insertBefore(div, ul);

//add the filter event handler
//event is change as checkboxes trigger a change event not click like with buttons
filterCheckbox.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    //create reference to list items to loop through them
    // we traverse to them from the ul  by using the children property
    //children provides a reference to a collection of all an elements children
    const listL = ul.children;

    //loop through the list items and check if they are checked
    if (isChecked){
        for (let i = 0; i < listL.length; i++) {
            //variable to represent the indi. allaises inside each loop
            let li = listL[i];
            //to check if individual items are checked 'responded'. as the info is stored on the list item class atrribute we can look at classname property
            if (li.className == 'responded') {
                li.style.display = '';
                //giving the above an empty string allows the element to pick up it's previous style
            } else {
                li.style.display = 'none';
            }
        }
    }
    // show all guests whether or not they've responded
    else {
        for (let i = 0; i < listL.length; i++) {
            let li = listL[i];
            li.style.display = '';
        }
    }
})


/* ********* EXPERIMENTAL **********
  Attempt at making a filter to show only unresponded
  UPDATE: It works :D
*/

const divUn = document.createElement('div');
const filterLabelUn = document.createElement('label');
const filterCheckboxUn = document.createElement('input');
filterLabelUn.textContent = 'Show Unresponded Only';
filterCheckboxUn.type = 'checkbox';


divUn.appendChild(filterLabelUn);
divUn.appendChild(filterCheckboxUn);
mainDiv.insertBefore(divUn, ul);

filterCheckboxUn.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    const listL = ul.children;

    if (isChecked){
        for (let i = 0; i < listL.length; i++) {
            let li = listL[i];
            if (li.className == 'responded') {
                li.style.display = 'none';
            } else {
                li.style.display = '';
            }
        }
    } else {
        for (let i = 0; i < listL.length; i++) {
            let li = listL[i];
            li.style.display = '';
        }
    }
})

/*
Gets the ul li items, loops through them to get the name and response of each item
before pushing the result to the new data array
return the data array once the loop finishes
to be used by the csv or txt methods then for formatting into the downloadable file
 */
function getInviteeData() {
    const data = [];
    const listItems = ul.children;
    for (let i = 0; i < listItems.length; i++) {
        const li = listItems[i];
        const name = li.querySelector('span')?.textContent || '';
        const responded = li.classList.contains('responded') ? 'Yes' : 'No';
        data.push({ name, responded });
    }
    return data;
}

/*
will export something like:
Name,Responded
Alice,Yes
Bob,No
 */
function downloadCSV() {
    const invitees = getInviteeData();
    let csvContent = 'Name,Responded\n';
    invitees.forEach(invitee => {
        csvContent += `${invitee.name},${invitee.responded}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invitees.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

/*
will export something akin to:
Invitee List

Name: Alice, Responded: Yes
Name: Bob, Responded: No
 */
function downloadText() {
    const invitees = getInviteeData();
    let textContent = 'Invitee List\n\n';
    invitees.forEach(invitee => {
        textContent += `Name: ${invitee.name}, Responded: ${invitee.responded}\n`;
    });

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invitees.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

/*
RSVP Demo End
 */
