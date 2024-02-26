import { Card, CardHeader, CardMedia,CardContent,CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import  EditIcon  from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { deleteRecipe } from "../redux/recipes/recipesSlice";

import axiosinstance from "../axios-instance";

const CustomCard = ({ title, image,id,handleEdit }) => {

  const navigate=useNavigate();

  const dispatch = useDispatch();

  const navigetodetailpage=()=>{
    navigate(`/recipe/${id}`,{state:{title}});
  }

  const handleDelete=async()=>{
    const result = await axiosinstance.delete(`/recipes/${id}`);
    if(result?.status===200){
      dispatch(deleteRecipe(id))
    }
  }

  return (
    <Card sx={{ maxWidth: 350,margin:"20px",':hover':{cursor:'pointer',transform:'scale(1.1)'} }} >
      <CardMedia component="img" height="200" width='400' image={image} alt={image} />
      <CardContent>
        <CardHeader title={title} />
      </CardContent>
      <CardActions sx={{display:'flex',justifyContent:'flex-end'}}>
        <VisibilityIcon onClick={navigetodetailpage}/>
        <EditIcon onClick={handleEdit}/>
        <DeleteIcon onClick={handleDelete}/>
      </CardActions>
    </Card>
  );
};

export default CustomCard;
