import './charts.js';
import { setPokemon, setImage } from "./pokedex.js";

const $form = document.querySelector('#form');
const $formInput = document.querySelector('#input');
const $next = document.querySelector('#next-pokemon');
const $prev = document.querySelector('#prev-pokemon');
const $nextImage = document.querySelector('#next-image');
const $prevImage = document.querySelector('#prev-image');
const $pokedex = document.querySelector('#pokedex');
const $randomButton = document.querySelector('#randomButton');

$form.addEventListener('submit', handleSubmit);
$next.addEventListener('click', handleNextPokemon);
$prev.addEventListener('click', handlePrevPokemon);
$nextImage.addEventListener('click', handleNextImage);
$prevImage.addEventListener('click', handlePrevImage);
$randomButton.addEventListener('click', handleRandomPokemon)

let activePokemon = null;
async function handleSubmit(event) {
    event.preventDefault();
    $pokedex.classList.add('is-open');
    const form = new FormData($form);
    const id = form.get('id').toLowerCase();
    activePokemon = await setPokemon(id);
}

async function handleNextPokemon() {
    const id = (!activePokemon) || activePokemon.id === 898 ? 1 : activePokemon.id + 1
    activePokemon = await setPokemon(id);
    updateInput(activePokemon.name);
}

async function handlePrevPokemon() {
    const id = (!activePokemon) || activePokemon.id === 1 ? 898 : activePokemon.id - 1
    activePokemon = await setPokemon(id)
    updateInput(activePokemon.name);
}

function updateInput(name) {
    $formInput.value = name;
}

async function handleRandomPokemon() {
    activePokemon = await setPokemon(Math.floor(Math.random() * 897) + 1);
    updateInput(activePokemon.name);
}

let activeSprite = 0;
function handleNextImage() {
    if(!activePokemon) return false;
    activeSprite += 1;
    if (activeSprite > activePokemon.sprites.length - 1){
        activeSprite = 0;
    }    
    setImage(activePokemon.sprites[activeSprite])
}

function handlePrevImage(){
    if(!activePokemon) return false;
    activeSprite -= 1;
    if (activeSprite < 0){
        activeSprite = activePokemon.sprites.length - 1;
    }    
    setImage(activePokemon.sprites[activeSprite])
}