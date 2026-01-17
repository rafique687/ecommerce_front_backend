import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

function Header({ ckadmin }) {
  //  console.log(user);
  return (
    <>
      <div className="bg-dark text-white p-3" style={{ width: '220px' }}>
        <div className="row justify-content-center">
          <div className="col-auto">
            <span>Welcome, {ckadmin}</span>
          </div>
        </div>
        <h4>Dashboard</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/dashboard/sales/sale-dashboard">
              <b style={{ color: 'white' }}>Sales</b></Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/dashboard/trafic/trafic-dashboard">
              <b style={{ color: 'white' }}>TrafficAnalytics</b></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/dashboard/conversion">
              <b style={{ color: 'white' }}>Conversion Metrics</b></Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/dashboard/performance">
              <b style={{ color: 'white' }}>Performance</b></Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/dashboard/cutomers">
              <b style={{ color: 'white' }}>Customer Insights</b></Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/dashboard/realtime">
              <b style={{ color: 'white' }}>Real time</b></Link>
          </li>


          <li className="nav-item">
            <a className="nav-link d-flex justify-content-between align-items-center" data-bs-toggle="collapse" href="#Category" role="button" aria-expanded="false" aria-controls="salesSubmenu">
              <b style={{ color: 'white' }}>Manage Category </b>
              <i className="bi bi-chevron-down"></i>
              <FaChevronDown style={{ color: "white" }} />
            </a>

            {/* Submenu */}
            <div className="collapse" id="Category">
              <ul className="nav flex-column ms-3">
                 <li className="nav-item">
                  <Link className="nav-link text-white" to="/dashboard/category/collection">View Collection</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/dashboard/category/view-category">View Category</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/dashboard/category/view-sub-category">View Sub Category</Link>
                </li>

              </ul>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link d-flex justify-content-between align-items-center" data-bs-toggle="collapse" href="#product" role="button" aria-expanded="false" aria-controls="salesSubmenu">
              <b style={{ color: 'white' }}>Manage Product </b>
              <i className="bi bi-chevron-down"></i>
              <FaChevronDown style={{ color: "white" }} />
            </a>

            {/* Submenu */}
            <div className="collapse" id="product">
              <ul className="nav flex-column ms-3">

                <li className="nav-item">
                  <Link className="nav-link text-white" to="/dashboard/product/view-product">View Product</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/dashboard/product/varrians">Track Stock</Link>
                </li>
              </ul>
            </div>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/dashboard/media">
              <b style={{ color: 'white' }}>Manage Media</b></Link>
          </li>

          <li className="nav-item">
            <a className="nav-link d-flex justify-content-between align-items-center" data-bs-toggle="collapse" href="#discount" role="button" aria-expanded="false" aria-controls="salesSubmenu">
              <b style={{ color: 'white' }}>Price & Discount</b>
              <i className="bi bi-chevron-down"></i>
              <FaChevronDown style={{ color: "white" }} />
            </a>

            {/* Submenu */}
            <div className="collapse" id="discount">
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/dashboard/discount/">View Discount</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/dashboard/product/view-sub-category">View Sub Category</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/dashboard/product/view-product">View Product</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/dashboard/product/varrians">Track Stock</Link>
                </li>
              </ul>
            </div>
          </li>



        </ul>
      </div>
    </>
  );
}

export default Header;
