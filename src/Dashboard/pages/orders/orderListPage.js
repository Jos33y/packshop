import React, {useEffect, useRef, useState} from "react";
import "../pagesStyles.css"
import {Link} from "react-router-dom";
import {Card ,Col ,Row ,Table} from "react-bootstrap";
import {collection, getDocs, query} from "firebase/firestore";
import {db} from "../../../firebase.config";
import {toast} from "react-toastify";
import NotFoundImage from "../../../assets/images/dashimages/undraw_not_found_-60-pq.svg";
import Spinner from "../../../components/Spinner";

const OrderListPage = ({userId, storeUrl}) => {

    const isMounted = useRef()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    const getLatestOrders = async () => {
        setLoading(true)
        try {
            const getOrdersRef = collection(db, 'shops', storeUrl, 'orders')
            const q = query(getOrdersRef)
            const querySnap = await getDocs(q)

            let orders = []
            querySnap.forEach((doc) => {
                console.log(doc.data());
                return orders.push({
                    id:doc.id,
                    data:doc.data(),
                })
            })
            setOrders(orders)
        }
        catch (error) {
            console.log({error})
            toast.error("currently can't get your orders")
        }
        setLoading(false)
    }

    useEffect(() => {

        if(isMounted) {
            getLatestOrders().then()
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, userId])
    return (
        <>
            {loading ?
                (<Spinner />) :
                (
                    <section className="content-main">
                <div className="content-header">
                    <h2 className="content-title"> Manage Orders </h2>
                </div>

                <Card className="card mb-4">
                    <header className="card-header">
                        <Row className="gx-3">
                            <Col lg={4} md={6} className="me-auto">
                                <input type="text" placeholder="Search..." className="form-control"/>
                            </Col>
                            <Col lg={2} md={3} className="col-6">
                                <select className="form-select">
                                    <option value="status">Status</option>
                                    <option value="Active">Active</option>
                                    <option value="Disabled">Disabled</option>
                                    <option value="Show all">Show all</option>
                                </select>
                            </Col>

                            <Col lg={2} md={3} className="col-6">
                                <select className="form-select">
                                    <option value="show 20">Show 20</option>
                                    <option value="show 20">Show 30</option>
                                    <option value="show 20">Show 40</option>
                                </select>
                            </Col>
                        </Row>
                    </header>
                    <div className="card-body">
                        {orders && orders.length > 0 ? (
                        <div className="table-responsive">
                            <Table className="table table-hover">
                                <thead>
                                <tr>
                                    <th>#ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th className="text-end">Action</th>
                                </tr>
                                </thead>
                                <tbody>

                                    {/*row  */}
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td>{order.data.orderId}</td>
                                            <td className="bold">{order.data.firstname} {order.data.lastname}</td>
                                            <td>{order.data.email}</td>
                                            <td>&#8358;{order.data.orderTotal.toString()
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                                            <td> <span className={`badge rounded-pill ${ order.data.deliveryStatus === "Confirmed" ? ('alert-warning') : 'alert-danger'}`}>{order.data.deliveryStatus}</span> </td>
                                            <td> {(order.data.timeStamp).toDate().toLocaleDateString("en-US")}</td>
                                            <td className="text-end">
                                                <Link to={`/dashboard/orders/${order.id}`} className="btn btn-light btn-analytics">Details </Link>
                                                <div className="dropdown">
                                                    <Link to="#" data-bs-toggle="dropdown" class="btn btn-light btn-analytics">
                                                        <i className="fas fa-ellipsis-v"></i>
                                                    </Link>
                                                    <div className="dropdown-menu">
                                                        <Link to={`/dashboard/orders/${order.id}`} className="dropdown-item"> View details</Link>
                                                        <Link to={`/dashboard/orders/${order.id}`} className="dropdown-item"> Edit info</Link>
                                                        <Link to={`/dashboard/orders/${order.id}`} className="dropdown-item text-danger"> Delete</Link>
                                                    </div>
                                                </div> {/* dropdown ends*/}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>

                            )
                            :
                            (
                                <div className="No-category">
                                    <h5>Currently No Orders</h5>
                                    <img src={NotFoundImage} alt="" className="img-fluid"/>
                                </div>
                            )
                        }
                    </div>
                </Card>
            </section>
                ) }
        </>
    )

}
export default OrderListPage