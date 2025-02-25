import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
function ViewOrders() {
    const [ordersdata,setordersdata]=useState([]);
    const navigate = useNavigate();
    async function fetchorders()
    {
        try
        {
            const resp =  await axios.get("http://localhost:9000/api/getallorders")
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    setordersdata(resp.data.ordersdata)
                }
                else
                {
                    setordersdata([]);
                }
            }
            else
            {
                alert("Some error occured")
            }
        }
        catch(err)
        {
            alert(err.message);
        }
    }
    useEffect(()=>
    {
        fetchorders();
    },[])

    async function ondelorder(id)
    {
        var userresp=window.confirm("Ae you sure to delete");
        if(userresp===true)
        {
        const resp = await axios.delete(`http://localhost:9000/api/delorder/${id}`)
        if (resp.status === 200)
            {
                if (resp.data.statuscode === 1)
                {
                    toast.success("Order Deleted Successfully");
                    fetchorders();
                }
                else if(resp.data.statuscode === 0)
                {
                    toast.warn("Order not Deleted")
                }
            }
        else {
            alert("some error occured")
        }
    }
    }

    async function updatestatus(id)
    {
        navigate("/updatestatus?oid=" + id)
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">List of Orders</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    {
                        ordersdata.length>0?
                        <>
                            <h2>List of Orders</h2><br/>
                            <table className="timetable_sub">
                                <tbody>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Address</th>
                                        <th>Bill Amount</th>
                                        <th>Username</th>
                                        <th>Date</th>
                                        <th>Payment Mode</th>
                                        <th>Status</th>
                                        <th>Update Status</th>
                                        <th>Delete</th>
                                    </tr>
                                </tbody>
                            {
                                ordersdata.map((item,index)=>
                                <tr key={index}>
                                    <td><Link to={`/orderitems?oid=${item._id}`}>{item._id}</Link></td>
                                    <td>{item.saddress}</td>
                                    <td>{item.billamt}</td>
                                    <td>{item.username}</td>
                                    <td>{item.OrderDate}</td>
                                    <td>{item.PayMode}</td>
                                    <td>{item.status}</td>
                                    <td><button className="btn btn-danger" onClick={()=>updatestatus(item._id)}>Update</button></td>
                                    <td><button className="btn btn-danger" onClick={()=>ondelorder(item._id)}>Delete</button></td>
                                </tr>
                                )
                            }
                            </table><br/>
                            {ordersdata.length} orders found
                        </>:<h2>No orders found</h2>
                    }
                </div>
            </div>
        </>
    )
}
export default ViewOrders