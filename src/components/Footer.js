function Footer()
{
    return(
        <>
            <div className="footer">
		<div className="container">
			<div className="w3_footer_grids">
				<div className="col-md-3 w3_footer_grid">
					<h3>Contact</h3>
					
					<ul className="address">
						<li><i className="glyphicon glyphicon-map-marker" aria-hidden="true"></i>12 skylines, 4th block, <span>Jalandhar Cantt , Punjab</span></li>
						<li><i className="glyphicon glyphicon-envelope" aria-hidden="true"></i><a href="mailto:info@example.com">arvinddadwal24@gmail.com</a></li>
						<li><i className="glyphicon glyphicon-earphone" aria-hidden="true"></i>(+91)9478315005</li>
					</ul>
				</div>
				<div className="col-md-3 w3_footer_grid">
					<h3>Information</h3>
					<ul className="info"> 
						<li><i className="fa fa-arrow-right" aria-hidden="true"></i><a href="./AboutUs">About Us</a></li>
						<li><i className="fa fa-arrow-right" aria-hidden="true"></i><a href="./ContactUs">Contact Us</a></li>
					</ul>
				</div>
				<div className="col-md-3 w3_footer_grid">
					<h3>Category</h3>
					<ul className="info"> 
						<li><i className="fa fa-arrow-right" aria-hidden="true"></i><a href="./Categories">Mobiles</a></li>
						<li><i className="fa fa-arrow-right" aria-hidden="true"></i><a href="./Categories">Laptops</a></li>
						<li><i className="fa fa-arrow-right" aria-hidden="true"></i><a href="./Categories">Speakers</a></li>
						<li><i className="fa fa-arrow-right" aria-hidden="true"></i><a href="./Categories">Headphones</a></li>
					</ul>
				</div>
				<div className="col-md-3 w3_footer_grid">
					<h3>Profile</h3>
					<ul className="info"> 
						<li><i className="fa fa-arrow-right" aria-hidden="true"></i><a href="./Categories">Store</a></li>
						<li><i className="fa fa-arrow-right" aria-hidden="true"></i><a href="./ShowCart">My Cart</a></li>
						<li><i className="fa fa-arrow-right" aria-hidden="true"></i><a href="./Login">Login</a></li>
						<li><i className="fa fa-arrow-right" aria-hidden="true"></i><a href="./Signup">Create Account</a></li>
					</ul>
					
					
				</div>
				<div className="clearfix"> </div>
			</div>
		</div>
		
		<div className="footer-copy">
			
			<div className="container">
				<p>© 2017 Digital World. All rights reserved | Design by <a href="http://w3layouts.com/">Arvind Dadwal</a></p>
			</div>
		</div>
		
	</div>	
	<div className="footer-botm">
			<div className="container">
				<div className="w3layouts-foot">
				
				</div>
				<div className="clearfix"> </div>
			</div>
		</div>
        </>
    )
}
export default Footer;