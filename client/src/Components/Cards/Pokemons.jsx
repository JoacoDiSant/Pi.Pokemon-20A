import React from 'react'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {GetAllPokemons} from '../../StoreFiles/actions'
import Pokemon from '../Card/Pokemon'
import NavBar from '../NavBar/NavBar'


function Pokemons() {
    const pokemon = useSelector(state => state.pokemons)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetAllPokemons())
    }, [dispatch])

    return (
        <div>
            <NavBar />
            {pokemon.map((p) => {
               return <Pokemon  name={p.name} image={p.image} types={p.types} key={p.name} />
            })}
        </div>
    )
}

export default Pokemons
