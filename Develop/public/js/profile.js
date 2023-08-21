const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#game-name').value.trim();
    const weeks_playing_for = document.querySelector('#weeks-playing-for').value.trim();
    const genre = document.querySelector('#genre').value.trim();

    if (name && weeks_playing_for && genre) {
        const response = await fetch(`/routes/games`, {
            method: 'POST',
            body: JSON.stringify({ name, weeks_playing_for, genre }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create game list!');
        }
    };
};

/*
const deleteButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/routes/games${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete game list!');
        }
    }
};
*/

document
    .querySelector('.new-game-list')
    .addEventListener('submit', newFormHandler);

/*    
document
    .querySelector('.game-list')
    .addEventListener('click', deleteButtonHandler);
*/