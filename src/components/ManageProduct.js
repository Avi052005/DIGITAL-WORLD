import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

function ManageProduct() {
	const [catid, setcatid] = useState("");
	const [pname, setpname] = useState("");
	const [rate, setrate] = useState("");
	const [picname, setpicname] = useState("");
	const [dis, setdis] = useState("");
	const [stock, setstock] = useState("");
	const [descp, setdescp] = useState("");
	const [proid, setproid] = useState("");
	const [picture, setpicture] = useState(null);
	const [editmode, seteditmode] = useState(false);
	const [catdata, setcatdata] = useState([]);
	const [prodsdata, setprodsdata] = useState([]);
	const navigate = useNavigate();
	const fileInputRef = useRef(null);

	async function getcat() {
		try {
			const resp = await axios.get("http://localhost:9000/api/getallcat")
			if (resp.status === 200) {
				if (resp.data.statuscode === 1) {
					setcatdata(resp.data.catdata)
				}
				else {
					setcatdata([]);
				}
			}
			else {
				toast.warn("some error occurred")
			}
		}
		catch (err) {
			toast.warn(err.message);
		}
	}

	useEffect(() => {
		getcat();
	}, [])

	useEffect(() => {
		if (catid !== "") {
			fetchprodsbycat();
		}
	}, [catid])

	async function fetchprodsbycat() {
		try {
			const resp = await axios.get(`http://localhost:9000/api/fetchprodsbycatid?cid=${catid}`)
			if (resp.status === 200) {
				if (resp.data.statuscode === 1) {
					setprodsdata(resp.data.proddata)
				}
				else {
					setprodsdata([]);
					toast.info("No Products Added")
				}
			}
			else {
				toast.warn("some error occurred")
			}
		}
		catch (err) {
			toast.warn(err.message);
		}
	}

	async function ondel(id) {
		var userresp = window.confirm("Are you sure to delete?");
		if (userresp === true) {
			const resp = await axios.delete(`http://localhost:9000/api/delprod/${id}`)
			if (resp.status === 200) {
				if (resp.data.statuscode === 1) {
					toast.success("Product Deleted Successfully");
					fetchprodsbycat();
				}
				else if (resp.data.statuscode === 0) {
					toast.warn("Product not Deleted")
				}
			}
			else {
				alert("some error occurred")
			}
		}
	}

	async function updatedb() {
		try {
			const formdata = new FormData();
			formdata.append("catid", catid)
			formdata.append("pname", pname)
			formdata.append("rate", rate)
			formdata.append("dis", dis)
			formdata.append("stock", stock)
			formdata.append("descp", descp)
			formdata.append("oldpicname", picname)

			if (picture !== null) {
				formdata.append("Picture", picture)
			}
			formdata.append("id", proid)
			const resp = await axios.put(`http://localhost:9000/api/updateproduct`, formdata)
			if (resp.status === 200) {
				if (resp.data.statuscode === 1) {
					toast.success("Product updated successfully")
					cancelcat();
					fetchprodsbycat();
				}
				else if (resp.data.statuscode === 0) {
					toast.warn("Product not updated");
				}
			}
			else {
				alert("Some error occurred");
			}
		}
		catch (err) {
			alert(err.message);
		}
	}

	async function saveproduct(e) {
		e.preventDefault();
		try {
			const formdata = new FormData();
			formdata.append("catid", catid)
			formdata.append("pname", pname)
			if (picture !== null) {
				formdata.append("picture", picture)
			}
			formdata.append("rate", rate)
			formdata.append("dis", dis)
			formdata.append("stock", stock)
			formdata.append("descp", descp)
			const resp = await axios.post("http://localhost:9000/api/saveproduct", formdata)
			if (resp.status === 200) {
				if (resp.data.statuscode === 1) {
					toast.success("Product Added Successfully")
					cancelcat();
					fetchprodsbycat();
				}
				else if (resp.data.statuscode === 0) {
					toast.warn("Product not Added")
				}
			}
			else {
				toast.warn("some error occurred")
			}
		}
		catch (err) {
			toast.warn(err.message);
		}
	}

	function onprodupadate(proditem) {
		seteditmode(true)
		setpname(proditem.pname)
		setpicname(proditem.picture)
		setcatid(proditem.catid)
		setrate(proditem.Rate)
		setdis(proditem.Discount)
		setstock(proditem.Stock)
		setdescp(proditem.Description)
		setproid(proditem._id)
		setpicture(null); // Ensure picture state is reset to null
	}

	function cancelcat() {
		seteditmode(false)
		setpname("")
		setrate("")
		setcatid("")
		setdis("")
		setstock("")
		setdescp("")
		setproid("")
		setpicture(null)
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	}

	useEffect(() => {
		if (sessionStorage.getItem("userdata") === null) {
			toast.error("Please login to access the page");
			navigate("/login");
		}
		else {
			var uinfo = JSON.parse(sessionStorage.getItem("userdata"));
			if (uinfo.usertype !== "admin") {
				toast.error("Admin login to access the page");
				navigate("/login");
			}
		}
	}, [])

	return (
		<>
			<div className="breadcrumbs">
				<div className="container">
					<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
						<li><Link to="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
						<li className="active">Add Product</li>
					</ol>
				</div>
			</div>
			<div className="login">
				<div className="container">
					<h2>Add Product</h2>

					<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
						<form name="form1" onSubmit={saveproduct}>
							<select className="form-control" onChange={(e) => setcatid(e.target.value)}>
								<option value="">Choose Product</option>
								{
									catdata.map((item, index) =>
										<option value={item._id} key={index}>{item.catname}
										</option>)
								}
							</select>
							<input type="text" name="prodname" value={pname} placeholder="Product Name" required=" " onChange={(e) => setpname(e.target.value)} />
							<input type="text" name="rate" value={rate} placeholder="Rate" required=" " onChange={(e) => setrate(e.target.value)} /><br />
							<input type="text" name="dis" value={dis} placeholder="Discount" required=" " onChange={(e) => setdis(e.target.value)} /><br />
							<input type="text" name="stock" value={stock} placeholder="Stock" required=" " onChange={(e) => setstock(e.target.value)} /><br />
							<textarea className="form-control" placeholder="Description" value={descp} onChange={(e) => setdescp(e.target.value)}></textarea><br />
							{
								editmode ?
									<>
										<img src={`uploads/${picname}`} height="100" alt="Product" /><br />
										Choose new image, if required<br />
									</> : null
							}
							<input type="file" name="catpic" onChange={(e) => setpicture(e.target.files[0])} ref={fileInputRef} />
							{editmode === false ? <input type="submit" name="btn1" value="Add" /> : null}
							{
								editmode ?
									<>
										<input type="button" name="btn2" value="Update" onClick={updatedb} />
										<input type="button" name="btn3" value="Cancel" onClick={cancelcat} />
										<input type="hidden" name="picname" value={picname} />
									</> : null
							}
						</form>

					</div>
				</div>
			</div>
			<div className="login">
				<div className="container">
					{
						prodsdata.length > 0 ?
							<>
								<h2>Added Products</h2><br />
								<table className="timetable_sub">
									<tbody>
										<tr>
											<th>Picture</th>
											<th>Product Name</th>
											<th>Update</th>
											<th>Delete</th>
										</tr>
									</tbody>
									{
										prodsdata.map((item, index) =>
											<tr key={index}>
												<td><img src={`uploads/${item.picture}`} height="75" alt="Product" /></td>
												<td>{item.pname}</td>
												<td><button className="btn btn-primary" onClick={() => onprodupadate(item)}>Update</button></td>
												<td><button className="btn btn-danger" onClick={() => ondel(item._id)}>Delete</button></td>
											</tr>
										)
									}

								</table><br />
								{prodsdata.length} Product found

							</> : null
					}

				</div>
			</div>
		</>
	)
}
export default ManageProduct;
