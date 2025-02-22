import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Contact()
{
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [Message, setMessage] = useState("");
    const [msg, setmsg] = useState();

    async function handleSubmit(e) {
        e.preventDefault();
        const contact = { name, email, phone, Message }
        try {
            const resp = await axios.post("http://localhost:9000/api/contact", contact)
            if (resp.status === 200) {
                setmsg(resp.data.msg)
                setname("");
                setemail("");
                setphone("");
                setMessage("");
            }
            else {
                setmsg(resp.data.msg);
            }
        }
        catch (err) {
            setmsg(err.message);
        }
    }


    return(
        <>
        <div className="breadcrumbs">
            <div className="container">
                <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                    <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                    <li className="active">Contact Us</li>
                </ol>
            </div>
        </div>

        <div className="login">
            <div className="container">
                <h2>Contact Us</h2>
                <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                    <form name="form1" onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Name" value={name} onChange={(e) => setname(e.target.value)} required /><br></br>
                        <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)} required /><br></br>
                        <input type="tel" name="phone" placeholder="Phone no." value={phone} onChange={(e) => setphone(e.target.value)} required /><br></br>
                        <textarea name="msg" placeholder="Message" className="form-control" value={Message} onChange={(e) => setMessage(e.target.value)} required /><br />
                        <button type="submit" className="btn btn-primary">Send</button><br></br>
                        {msg}
                    </form>
                </div>
            </div>
        </div>
    </>

    )
}
export default Contact;