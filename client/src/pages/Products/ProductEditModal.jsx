import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { productSelectors, updateProducts } from "../../redux/productSlice";
const ProductEditModal = (props) => {
    const id = props.productId
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const product = useSelector((state) => productSelectors.selectById(state, id))
    const dispatch = useDispatch()

    useEffect(() => {
        if (product) {
            setName(product.name)
            setImage(product.image)
            setPrice(product.price)
            setStock(product.stock)
        }
    }, [product])
    const handleUpdate = (e) => {
        e.preventDefault()
        dispatch(
            updateProducts({
                id, name, image, price, stock
            })
        ).unwrap().then(() => {
            setIsLoading(false)
            props.toggleModalEdit()
            Swal.fire({
                icon: "success",
                title: "Product has been updated",
                showConfirmButton: false,
                timer: 1500,
            }).then(()=> {
                window.location.reload() 
            })
        }).catch((err) => {
            setIsLoading(false);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: err.message,
                footer: err.stack,
            });
        });
    }
    return (
        <div className="modal">
            <div className="overlay" onClick={props.toggleModalEdit}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h1>Edit Product</h1>
                    <form onSubmit={handleUpdate} encType="multipart/form-data">
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                        <label>Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />

                        <label>Stock</label>
                        <input type="number"value={stock} onChange={(e) => setStock(e.target.value)} />

                        <label>Image</label>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />



                        <input type="submit" value="Submit" disabled={isLoading} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProductEditModal