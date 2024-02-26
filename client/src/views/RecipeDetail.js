import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Typography,List,ListItem } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes } = useSelector((state) => state.recipes);
  

  useEffect(() => {
    if (id) {
      const recipeToPreview = recipes.find((recipe) => recipe.id === id);
      
      setRecipe(recipeToPreview);
    }
  }, [recipes]);

  console.log(recipes)

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      flexDirection='column'
    >
        <Box display='flex' alignItems='center'>
            <ArrowBackIcon fontSize='large' onClick={()=>navigate('/')} sx={{
              ':hover':{
                cursor:'pointer'
              }
            }}/>
            <Typography variant='h3' marginLeft='10px'>Recipe Detail</Typography>
        </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        width="80%"
        sx={{
          padding: 5,
          background: "#F5EADA",
          color: "black",
        }}
      >
        <Box display="flex" justifyContent="center">
          <Typography variant="h4" color="black" marginBottom={2}>
            {recipe?.name}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
          >
            <Typography variant="h5" color="black" fontWeight="400">
              Ingredients:
            </Typography>
            {recipe?.ingredients?.map((ingredient, index) => (
              <Box display="flex" alignItems="center" >
                <Typography paddingLeft="10px" color="#282C34">
                  {index + 1}. {ingredient?.name} - {ingredient?.quantity}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box display="flex" alignItems="center">
            <img
              src={recipe?.imageURL}
              alt="food"
              width="400px"
              height="400px"
            />
          </Box>
        </Box>
        <Box>
          <Typography variant="h5" marginTop={5}>
            Steps:
          </Typography>
          <List>
            {recipe?.steps?.map((step, index) => (
              <ListItem>{`${index + 1}. ${step}`}</ListItem>
            ))}
          </List>
        </Box>
        
      </Box>
    </Box>
  );
};

export default RecipeDetail;
