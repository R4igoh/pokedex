import { getPokemon, getSpecies } from "./api.js";
import { createChart } from "./charts.js";


const $image = document.querySelector('#image');
export function setImage(image) {
    $image.src = image;
}

const $description = document.querySelector('#description');
function setDescription(description) {
    $description.textContent = description;
}

const $screen = document.querySelector('#screen');
function loader(isLoading = false) {
    const img = isLoading ? 'url(./images/loading.gif)' : ''
    $screen.style.backgroundImage = img;
}

const $light = document.querySelector('#light');

function speech(text) {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es';
    speechSynthesis.speak(utterance);
    $light.classList.add('is-animated')

    utterance.addEventListener('end', () => {
        $light.classList.remove('is-animated')   
    })
}

export async function findPokemon(id){
    let pokemon = null;
    try {
        pokemon = await getPokemon(id);
    } catch (exception) {
        return {
            ok: false,
            errors : ['Pokémon no encontrado.'],
            data : {}
        }
    }
    
    const species = await getSpecies(id);
    const description = species.flavor_text_entries.find((flavor) => flavor.language.name === 'es' );
    const sprites = [pokemon.sprites.front_default];
    const stats = pokemon.stats.map(item => item.base_stat);
    for (const item in pokemon.sprites) {
        if (item !== 'front_default' && item !== 'other' && item !== 'versions' && pokemon.sprites[item]){
            sprites.push(pokemon.sprites[item])
        }
    }

    return {
        ok: true,
        errors : [],
        data : {
            sprites,
            description: description.flavor_text,
            id : pokemon.id,
            name : pokemon.name,
            stats,
        }
    }
    
}

let activeChart = null;

export async function setPokemon(id) {
    loader(true);
    const response = await findPokemon(id);
    loader(false);
    if (!response.ok) {
        setDescription(response.errors[0]);
        return null;
    } else {
        const pokemon = response.data;
        setImage(pokemon.sprites[0]);
        setDescription(pokemon.description);
        speech(`${pokemon.name}. ${pokemon.description}`);
        if (activeChart instanceof Chart) {
            activeChart.destroy();
        }
        activeChart = createChart(pokemon.stats);
        return pokemon;
    }  
}