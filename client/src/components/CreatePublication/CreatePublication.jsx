import { useEffect, useState } from "react";
import {  useDispatch } from "react-redux";
import { createPublication } from "../../redux/actions";
import { useNavigate } from "react-router-dom";


const CreatePublication= () => {
    const dispatch = useDispatch ();
    const navigate = useNavigate ();
    const [form, setForm] = useState ({
        name: "", 
        sizes: "",
        color: "",
        price: "",
        temporaryPrice: "",
        material: "",
        brand: "",
        image:"",
        stock: "",
        demography: "",

    });

const [errors, setErrors] = useState ({});

const validate = (input) => {
    let errors ={};

    if (!input.name.length) errors.name = "Name required";
    if (!input.sizes.length) errors.sizes = "Sizes required";
    if (!input.price.length) errors.price = "Price required";
    if (!input.stock.length) errors.stock = "Stock required";
 
    return errors;
};
const handleSubmit = (e) => {
    e.preventDefault();
     dispatch(createPublication(form));
     alert("Publication created!");
     navigate("/");
  };

const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors(
        validate({
          ...form,
          [e.target.name]: e.target.value,
        })
      );
};

return (
    <div>
        <h1>Create Publication</h1>
      {/* formulario */}
     <form onSubmit={(e) => handleSubmit(e)}>
      {/* input nombre */}
      <input
       type="text"
       placeholder="Name"
       name="name"
       value={form.name}
       onChange={handleChange}
       required
       autoComplete="off"
      
      />
       {errors.name && <p>{errors.name}</p>}

      {/* input sizes */}
      <input
       type="text"
       placeholder="sizes"
       name="sizes"
       value={form.sizes}
       onChange={handleChange}
       required
       autoComplete="off"
      
      />
       {errors.sizes && <p >{errors.sizes}</p>}

      {/* inpunt color */}
      <input
       type="text"
       placeholder="color"
       name="color"
       value={form.color}
       onChange={handleChange}
       autoComplete="off"
      
      />
      

      {/* inpunt price */}
      <input
       type="number"
       placeholder="price"
       name="price"
       value={form.price}
       onChange={handleChange}
       required
       autoComplete="off"
      
      />
       {errors.price && <p >{errors.price}</p>}

      {/* input temporaryPrice */}
      <h4 >temporary Price</h4>
          <input
            type="number"
            placeholder="temporary Price"
            name="temporaryPrice"
            value={form.temporaryPrice}
            onChange={handleChange}
            
          />
           


         {/* input image*/}
         <input
            type="text"
            placeholder="URL image"
            name="image"
            value={form.image}
            onChange={handleChange}
            required
            autoComplete="off"
            
          />

            {/* input material */}
         <input
            type="text"
            placeholder="material"
            name="material"
            value={form.material}
            onChange={handleChange}
            required
            autoComplete="off"
            
          />

           {/* inpunt stock */}
      <input
       type="number"
       placeholder="stock"
       name="stock"
       value={form.stock}
       onChange={handleChange}
       required
       autoComplete="off"
      
      />
       {errors.stock && <p >{errors.stock}</p>}

        {/* inpunt brand */}
      <input
       type="text"
       placeholder="brand"
       name="brand"
       value={form.brand}
       onChange={handleChange}
       autoComplete="off"
      
      />

       {/* inpunt demography */}
       <input
       type="text"
       placeholder="demography"
       name="demography"
       value={form.demography}
       onChange={handleChange}
       autoComplete="off"
      
      />
         
         <button>create</button>
     </form>


    </div>
)


}
 export default CreatePublication;