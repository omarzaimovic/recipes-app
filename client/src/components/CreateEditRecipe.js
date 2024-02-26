import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
  DialogActions,
  Snackbar,
  Alert
} from "@mui/material";

import { useState, Fragment, useEffect } from "react";
import { BASE_ING } from "../components";
import { generateUUID } from "../heplers.js";
import axiosinstance from "../axios-instance";
import { useDispatch } from "react-redux";
import { addRecipe, editRecipe } from "../redux/recipes/recipesSlice";

const CreateEditRecipe = ({ open, handleClose, isEdit, recipeEdit }) => {
  const [name, setName] = useState("");
  const [integredients, setIntegriends] = useState([{ ...BASE_ING }]);
  const [steps, setSteps] = useState([""]);
  const [showSnackBar, setshowSnackBar] = useState(false);
  const [message, setmessage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit) {
      setName(recipeEdit?.name);
      setIntegriends(recipeEdit?.integredients);
      setSteps(recipeEdit?.steps);
    }
  }, [isEdit]);

  const textfieldwidth = {
    width: "60%",
    marginTop: "10px",
  };

  const button = {
    marginLeft: "10px",
    alignSelf: "end",
    "&:hover": {
      cursor: "pointer",
      transform: "scale(1.1)",
    },
  };

  const handleInterChange = (file, index, value) => {
    const interCopy = JSON.parse(JSON.stringify(integredients));

    interCopy[index][file] = value;

    setIntegriends(interCopy);
  };

  const handleAdd = () => {
    setIntegriends((prevState) => [...prevState, { ...BASE_ING }]);
  };

  const handleStepChange = (index, value) => {
    const stepCopy = [...steps];

    stepCopy[index] = value;

    setSteps(stepCopy);
  };

  const handleModalClose = () => {
    handleClose();
    setName("");
    setIntegriends([{ ...BASE_ING }]);
    setSteps([""]);
  };

  const createRecipes = async () => {
    try {
      if (isEdit) {
        const recipe = {
          ...recipeEdit,
          name,
          integredients,
          steps,
          imageURL: recipeEdit?.imageURL,
        };
        const result = await axiosinstance.put(
          `/recipes/${recipeEdit.id}`,
          recipe
        );

        if (result?.status === 200) {
          dispatch(editRecipe(result.data));
          handleModalClose();
          setmessage("Successfully edited recipe");
          setshowSnackBar(true);
        }
      } else {
        const recipe = {
          id: generateUUID(),
          name,
          integredients,
          steps,
          imageURL:
            "https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg",
        };
        const result = await axiosinstance.post("/recipes", recipe);
        console.log(result);
        if (result?.status === 201) {
          dispatch(addRecipe(result.data));
          handleModalClose();
          setmessage("Successfully added recipe");
          setshowSnackBar(true);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCloseSnackBar = () => {
    setshowSnackBar(false);
    setmessage("");
  };

  console.log(steps);

  console.log(integredients);

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Create Recipe</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            sx={textfieldwidth}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <hr />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {integredients?.map((integr, index) => (
              <Fragment key={index}>
                <TextField
                  key={index}
                  label="Ingredient name"
                  value={integr.name}
                  variant="outlined"
                  sx={textfieldwidth}
                  onChange={(e) =>
                    handleInterChange("name", index, e.target.value)
                  }
                />
                <TextField
                  key={index}
                  label="Quantity"
                  value={integr.quantity}
                  variant="outlined"
                  sx={textfieldwidth}
                  onChange={(e) =>
                    handleInterChange("quantity", index, e.target.value)
                  }
                />
                <FormControl sx={textfieldwidth}>
                  <InputLabel id="select-label">Type</InputLabel>
                  <Select
                    labelId="select-label"
                    value={integr.type}
                    label="Age"
                    onChange={(e) =>
                      handleInterChange("type", index, e.target.value)
                    }
                  >
                    <MenuItem value="meat">Meat</MenuItem>
                    <MenuItem value="drinks">Drinks</MenuItem>
                    <MenuItem value="baking">Baking</MenuItem>
                  </Select>
                </FormControl>
              </Fragment>
            ))}
            <Button variant="outline" sx={button} onClick={handleAdd}>
              +Add ingredient
            </Button>
          </Box>
          <hr />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {steps?.map((step, index) => (
              <TextField
                key={index}
                label={`Step ${index + 1}`}
                value={step}
                variant="outlined"
                sx={textfieldwidth}
                onChange={(e) => handleStepChange(index, e.target.value)}
              />
            ))}
            <Button
              variant="outline"
              sx={button}
              onClick={() => setSteps((prevState) => [...prevState, ""])}
            >
              +Add Step
            </Button>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px 24px",
          }}
        >
          <Button variant="outlined" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="contained" onClick={createRecipes}>
            {`${isEdit ? "Edit" : "Create"} recipe`}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showSnackBar}
        onClose={handleCloseSnackBar}
        key={"top" + "right" + message}
        autoHideDuration={5000}
      >
        <Alert severity="success" elevation={6} variant='filled'>{message}</Alert>
      </Snackbar>
    </>
  );
};

export default CreateEditRecipe;
