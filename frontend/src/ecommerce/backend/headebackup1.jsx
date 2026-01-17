import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="bg-dark text-white p-3" style={{ width: '220px' }}>
        <h4>Dashboard</h4>
        <ul className="nav flex-column">

          <li className="nav-item">
              
            <a className="nav-link d-flex justify-content-between align-items-center" data-bs-toggle="collapse" href="#salesSubmenu" role="button" aria-expanded="false" aria-controls="salesSubmenu">
            <Link className="nav-link text-white" to="/sales"><b style={{ color: 'white' }}>Sales</b></Link>
              <i className="bi bi-chevron-down"></i>
            </a>

            {/* Submenu */}
            <div className="collapse" id="salesSubmenu">
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/sales">KPIs  Sales</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/sales/Orders">Total Sales</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/sales/AOVList">AOV AOVList</Link>
                </li>




              </ul>
            </div>
          </li>


          <li className="nav-item">
            <a className="nav-link d-flex justify-content-between align-items-center" data-bs-toggle="collapse" href="#TrafficAnalytics" role="button" aria-expanded="false" aria-controls="salesSubmenu">
              <b style={{ color: 'white' }}>TrafficAnalytics </b>
              <i className="bi bi-chevron-down"></i>
            </a>

            {/* Submenu */}
            <div className="collapse" id="TrafficAnalytics">
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/trafic">Trafic</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/trafic/visitors">Total Visitor</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/trafic/top-pages">Top Pages</Link>
                </li>
                 <li className="nav-item">
                  <Link className="nav-link text-white" to="/trafic/refer">Referrer</Link>
                </li>
                 
              </ul>
            </div>
          </li>

           <li className="nav-item">
            <a className="nav-link d-flex justify-content-between align-items-center" data-bs-toggle="collapse" href="#Conversion" role="button" aria-expanded="false" aria-controls="salesSubmenu">
              <b style={{ color: 'white' }}>Conversion Metrics </b>
              <i className="bi bi-chevron-down"></i>
            </a>

            {/* Submenu */}
            <div className="collapse" id="Conversion">
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/conversion">visitor counts</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/conversion/rating">Conversion Rating</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/conversion/abandon">abandoned Cart</Link>
                </li>
              </ul>
            </div>
          </li>

           <li className="nav-item">
            <a className="nav-link d-flex justify-content-between align-items-center" data-bs-toggle="collapse" href="#performance" role="button" aria-expanded="false" aria-controls="salesSubmenu">
              <b style={{ color: 'white' }}>Performance </b>
              <i className="bi bi-chevron-down"></i>
            </a>

            {/* Submenu */}
            <div className="collapse" id="performance">
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/performance">Performance</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/performance/best-seller">Best Seller</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/performance/inventory">Inventory turnover</Link>
                </li>
              </ul>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link d-flex justify-content-between align-items-center" data-bs-toggle="collapse" href="#Customer" role="button" aria-expanded="false" aria-controls="salesSubmenu">
              <b style={{ color: 'white' }}>Customer Insights </b>
              <i className="bi bi-chevron-down"></i>
            </a>

            {/* Submenu */}
            <div className="collapse" id="Customer">
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/cutomers">Insight</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/cutomers/newVsreturning">New Vs Return</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/cutomers/liftimevalue">Life Time Value</Link>
                </li>
              </ul>
            </div>
          </li>

          <li className="nav-item">
            <a className="nav-link d-flex justify-content-between align-items-center" data-bs-toggle="collapse" href="#realtime" role="button" aria-expanded="false" aria-controls="salesSubmenu">
              <b style={{ color: 'white' }}>Real Time View </b>
              <i className="bi bi-chevron-down"></i>
            </a>

            {/* Submenu */}
            <div className="collapse" id="realtime">
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/realtime">Real time</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/realtime/active-visitors">Active Visitor</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/realtime/live-orders">Live Orders</Link>
                </li>
              </ul>
            </div>
          </li>

          <li className="nav-item">
            <Link className="nav-link text-white" to="/dashboard/view-category">View Category</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/dashboard/view-sub-category">View Sub Category</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/dashboard/view-product">View Product</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
