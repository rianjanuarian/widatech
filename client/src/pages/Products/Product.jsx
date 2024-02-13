import React, { useState, useEffect, lazy, Suspense } from 'react';
import DashboardHeader from '../../components/DashboardHeader';

import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import '../styles.css';
import { imageAddress } from '../../api/apiList';
import { useSelector, useDispatch } from "react-redux";
import { deleteProducts, getProducts, productSelectors } from '../../redux/productSlice';

import ProductAddModal from "./ProductAddModal";
import ProductEditModal from './ProductEditModal';
const Loading = lazy(() => import('../../components/Loading/Loading'))
const Products = () => {

  const dispatch = useDispatch()
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [productId, setProductId] = useState(0);
  const products = useSelector(productSelectors.selectAll)
  const status = useSelector((state) => state.products.status)
  const error = useSelector((state) => state.products.status)
  const [currentPage, setCurrentPage] = useState(1);
  const toggleModalAdd = () => setModalAdd(!modalAdd);
  const toggleModalEdit = () => setModalEdit(!modalEdit);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginate = (pageNumber) => {


    const nextPage = Math.min(pageNumber, totalPages);
    setCurrentPage(nextPage);
  }; useEffect(() => {
    dispatch(getProducts())


  }, [dispatch])

  const deletes = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProducts(id))
        Swal.fire("Deleted!", "Product has been deleted.", "success");
        window.location.reload()
      }
    })
  }
  const handleUpdate = (id) => {
    setProductId(id);
    toggleModalEdit();
  };

  return (
    <div className='dashboard-content'>
      <DashboardHeader
        btnText="Add Product" onClick={toggleModalAdd} />

      <div className='dashboard-content-container'>

        {status === "loading" ? (
          <Suspense fallback={<div>Please wait...</div>}>
            <Loading />
          </Suspense>
        ) : status === "rejected" ? (<p>{error}</p>) : products.length === 0 ? (
          <p>no data</p>
        ) : (
          <><div className='dashboard-content-header'>
            <h2>Products List</h2>
            
          </div><table>
              <thead>
                <th>No</th>
                <th>NAME</th>
                <th>IMAGE</th>
                <th>STOCK</th>
                <th>PRICE</th>
                <th>ACTION</th>
              </thead>
              <tbody>
                {currentItems.map((e, index) => (
                  <tr key={index}>
                    <td><span>{index + 1 + itemsPerPage * (currentPage - 1)}</span></td>
                    <td><span>{e.name}</span></td>
                    <td>
                      <span>
                        <img
                          src={`${imageAddress}/${e.image}`}
                          style={{ width: "100px", height: "100px" }}
                        ></img>
                      </span>
                    </td>
                    <td><span>{e.stock}</span></td>
                    <td><span>{e.price}</span></td>
                    <td>
                      <div>
                        <button
                          onClick={() => deletes(e.id)}
                          className="action-btn-delete"
                        >
                          Delete
                        </button>

                        <button
                                  className="action-btn-update"
                                  onClick={() => handleUpdate(e.id)}
                                >
                                  Update
                                </button>
                      </div>

                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
            <div className="pagination">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`page-btn ${index + 1 === currentPage ? "active" : ""}`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            {modalAdd && <ProductAddModal toggleModalAdd={toggleModalAdd}></ProductAddModal>}
            {modalEdit && <ProductEditModal 
            toggleModalEdit= {toggleModalEdit}
            productId={productId}/>}
          </>

        )}



      </div>
    </div>

  )
}

export default Products