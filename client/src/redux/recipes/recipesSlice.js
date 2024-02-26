
import {createSlice} from '@reduxjs/toolkit'

const recipesSlice=createSlice({
    name:'recipes',
    initialState:{
        recipes:[]
    },
    reducers:{
        setRecipes(state,action){

            state.recipes=action.payload
            
        },
        addRecipe(state,action){
            const recipe = action.payload
            state.recipes=[...state.recipes,recipe]
        },
        deleteRecipe(state,action){
            const recipeId = action.payload
            const recipesCopy=[...state.recipes]
            const newRecipes = recipesCopy.filter(rec => rec.id !== recipeId)
            state.recipes = newRecipes
        },
        editRecipe(state,action){
            const updateRecipe = action.payload
            const recipeIndex = state.recipes.findIndex((rec) => rec.id === updateRecipe.id)
            state.recipes[recipeIndex] = updateRecipe
        }
    }
});

export const { setRecipes,addRecipe,deleteRecipe,editRecipe }=recipesSlice.actions;
export default recipesSlice.reducer

