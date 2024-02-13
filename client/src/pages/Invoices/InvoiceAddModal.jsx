import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { imageAddress } from '../../api/apiList';
import { saveInvoices } from "../../redux/invoiceSlice";
import { getProducts, productSelectors, suggestionProducts } from '../../redux/productSlice';
const InvoiceAddModal = (props) => {

    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState('');
    const [customer, setCustomer] = useState('')
    const [salesperson, setSalesperson] = useState('')
    const [notes, setNotes] = useState('')
    const [productsold, setProductsold] = useState('')
    const [productId, setProductId] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const products = useSelector(productSelectors.selectAll)

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        dispatch(suggestionProducts(e.target.value));
    };
    const handleItemClick = (product) => {
        setSearchTerm(product.name);
        setProductId(product.id);
    };
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const createProduct = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        dispatch(saveInvoices({
            customer, salesperson, notes, productsold, productId
        })).unwrap().then(() => {
            setIsLoading(false);
            props.toggleModalAdd();
            Swal.fire({
                icon: "success",
                title: "Product has been saved",
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                window.location.reload()
            }).catch(() => {
                setIsLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Please fill all column",

                });
            });
        })
    }    //customer,salesperson,notes,productsold,productId
    return (
        <div className="modal">
            <div className="overlay" onClick={props.toggleModalAdd}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <h1>Add Invoices</h1>

                    <form onSubmit={createProduct} encType="multipart/form-data">
                        <label>Customer</label>
                        <input type="text" onChange={(e) => setCustomer(e.target.value)} />

                        <label>Sales Person</label>
                        <input type="text" onChange={(e) => setSalesperson(e.target.value)} />

                        <label>Notes (optional)</label>
                        <input type="text" onChange={(e) => setNotes(e.target.value)} />

                        <label>Product Sold</label>
                        <input type="number" onChange={(e) => setProductsold(e.target.value)} />

                        <label>Product </label>
                        <input type="text" value={searchTerm} onChange={handleChange} />

                        {searchTerm && (
                            <>
                                <p>Suggestion</p>
                                <table>
                                    <thead>
                                        <th>IMAGE</th>
                                        <th>NAME</th>
                                        <th>STOCK</th>
                                        <th>PRICE</th>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            product.stock > 0 && (
                                                <tr key={product.id} onClick={() => handleItemClick(product)} style={{ cursor: 'pointer' }}>
                                                    <td>
                                                        <span>
                                                            <img
                                                                src={`${imageAddress}/${product.image}`}
                                                                style={{ width: "25px", height: "25px" }}
                                                            ></img>
                                                        </span>
                                                    </td>
                                                    <td><span>{product.name}</span></td>
                                                    <td><span>{product.stock}</span></td>
                                                    <td><span>${product.price}</span></td>
                                                </tr>
                                            )
                                        ))}
                                    </tbody>

                                </table></>
                        )}

                        <input type="submit" value="Submit" disabled={isLoading} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default InvoiceAddModal