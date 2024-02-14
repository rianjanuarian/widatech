import React, { useState, useEffect, lazy, Suspense } from 'react';
import DashboardHeader from '../../components/DashboardHeader';
import Swal from "sweetalert2";
import '../styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { deleteInvoices, getInvoice, invoiceSelectors } from '../../redux/invoiceSlice';
import InvoiceAddModal from './InvoiceAddModal'
import InvoiceCard from './InvoiceCard';
const Loading = lazy(() => import('../../components/Loading/Loading'))

const Invoices = () => {
    const dispatch = useDispatch()
    const [modalAdd, setModalAdd] = useState(false);
    const [invoiceId, setInvoiceId] = useState(0)
    const [modalCard, setModalCard] = useState(false)
    const invoices = useSelector(invoiceSelectors.selectAll)
    const status = useSelector((state) => state.invoices.status)
    const error = useSelector((state) => state.invoices.status)
    const [currentPage, setCurrentPage] = useState(1);
    const toggleModalAdd = () => setModalAdd(!modalAdd);
    const toggleModalCard = () => setModalCard(!modalCard)
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = invoices.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(invoices.length / itemsPerPage);
    const paginate = (pageNumber) => {
        const nextPage = Math.min(pageNumber, totalPages);
        setCurrentPage(nextPage);
    };
    useEffect(() => {
        dispatch(getInvoice())
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
                dispatch(deleteInvoices(id))
                Swal.fire("Deleted!", "Invoice has been deleted.", "success");
                window.location.reload()
            }
        })
    }

    return (
        <div className='dashboard-content'>
            <DashboardHeader
                btnText="Add Invoices" onClick={toggleModalAdd} />
            <div className='dashboard-content-container'>
                {status === "loading" ? (
                    <Suspense fallback={<div>Please wait...</div>}>
                        <Loading />
                    </Suspense>
                ) : status === "rejected" ? (<p>{error}</p>) : invoices.length === 0 ? (
                    <p>no data</p>
                ) : (
                    <><div className='dashboard-content-header'>
                        <h2>Invoices List</h2>
                    </div><table>
                            <thead>
                                <th>No</th>
                                <th>CUSTOMER</th>
                                <th>SALESPERSON</th>
                                <th>NOTES</th>
                                <th>PRODUCT SOLD</th>
                                <th>DATE</th>
                                <th>ACTION</th>
                            </thead>
                            <tbody>
                                {currentItems.map((e, index) => (
                                    <tr key={index}>
                                        <td><span>{index + 1 + itemsPerPage * (currentPage - 1)}</span></td>
                                        <td><span>{e.customer}</span></td>
                                        <td><span>{e.salesperson}</span></td>
                                        <td><span>{e.notes}</span></td>
                                        <td><span>{e.productsold}</span></td>
                                        <td><span>{e.createdAt.slice(0, 10)}</span></td>
                                        <td>
                                            <div>
                                                <button
                                                    onClick={() => deletes(e.id)}
                                                    className="action-btn-delete"
                                                >
                                                    Delete
                                                </button>
                                                <Link to={`/detail/${e.id}`}>
                                                    <button
                                                        className="action-btn-update"

                                                    >
                                                        Invoice Card
                                                    </button>
                                                </Link>

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
                        {modalAdd && <InvoiceAddModal toggleModalAdd={toggleModalAdd}></InvoiceAddModal>}
                        {modalCard && <InvoiceCard toggleModalCard={toggleModalCard} invoiceId={invoiceId} ></InvoiceCard>}
                    </>

                )}



            </div>
        </div>
    )
}

export default Invoices