import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { saveProducts } from "../../redux/productSlice";
const ProductAddModal = (props) => {

    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const createProduct = async (e) => {
        setIsLoading(true);
        e.preventDefault()
 
        dispatch(saveProducts({
            name, image, price, stock
        })
        ).unwrap().then(() => {
            setIsLoading(false);
            props.toggleModalAdd();
            Swal.fire({
                icon: "success",
                title: "Product has been saved",
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                window.location.reload() 
            })

        }).catch((err) => {
                setIsLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Please fill all column",
             
                });
            });

    }
    return (
        <div className="modal">
            <div className="overlay" onClick={props.toggleModalAdd}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h1>Add Product</h1>

                    <form onSubmit={createProduct} encType="multipart/form-data">
                        <label>Name</label>
                        <input type="text" onChange={(e) => setName(e.target.value)} />

                        <label>Price</label>
                        <input type="number" onChange={(e) => setPrice(e.target.value)} />

                        <label>Stock</label>
                        <input type="number" onChange={(e) => setStock(e.target.value)} />

                        <label>Image</label>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />


                        <input type="submit" value="Submit" disabled={isLoading} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProductAddModal