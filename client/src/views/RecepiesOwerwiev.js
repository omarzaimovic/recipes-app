import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axiosinstance from "../axios-instance";
import { setRecipes } from "../redux/recipes/recipesSlice";
import CustomCard from "../components/CustomCard";
import { Box, Typography, Button } from "@mui/material";
import CreateEditRecipe from "../components/CreateEditRecipe";

const RecepiesOwerwiev = () => {
  const [openModal, setopenModal] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [recipeEdit, setrecipeEdit] = useState(null);
  

  const dispatch = useDispatch();
  const { recipes } = useSelector((state) => state.recipes);

  const getReceipes = async () => {
    const result = await axiosinstance.get("/recipes");
    if (result.status === 200) {
      dispatch(setRecipes(result.data));
      console.log(recipes);
    }
  };

  useEffect(() => {
    getReceipes();
    // eslint-disable-next-line
  }, []);

  const handleModalClose = () => {
    setisEdit(false);
    setrecipeEdit(null);
    setopenModal(false);
  };

  

  return (
    <>
      <Box>
        <Box
          sx={{
            marginLeft: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h2">Recipes overwiev</Typography>
          <Button
            sx={{ marginLeft: "20px" }}
            size="medium"
            onClick={() => setopenModal(true)}
          >
            new recipes
          </Button>
        </Box>
        <Box display="flex" flexWrap="wrap">
          {recipes?.map((rec) => (
            <CustomCard
              title={rec.name}
              image={rec.imageURL}
              id={rec.id}
              key={rec.id}
              handleEdit={() => {
                setisEdit(true);
                setrecipeEdit(rec);
                setopenModal(true);
              }}
            />
          ))}
        </Box>
      </Box>
      <CreateEditRecipe
        open={openModal}
        handleClose={handleModalClose}
        isEdit={isEdit}
        recipeEdit={recipeEdit}
      />
      
    </>
  );
};

export default RecepiesOwerwiev;
