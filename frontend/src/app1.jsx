import { Children } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Product from "./ecommerce/component/Product";
import Home from "./ecommerce/Home";

import Singleproduct from "./ecommerce/pages/Singleproduct";
import About from "./ecommerce/pages/About";
import Whislist from "./ecommerce/pages/whishlist";
import Cart from "./ecommerce/pages/Cart";
import Login from "./Login";
import Dashboard from "./ecommerce/backend/Dashboard";
import Viewcategory from "./ecommerce/backend/Viewcategory";
import Addcategory from "./ecommerce/backend/Addcategory";
import AddSubcategory from "./ecommerce/backend/AddSubcategory";
import ViewSubCAtegory from "./ecommerce/backend/ViewSubCAtegory";
import AddProduct from "./ecommerce/backend/AddProduct";
import ViewProduct from "./ecommerce/backend/ViewProduct";
//import Sales from "./ecommerce/backend/Sales1";
import OrderDetails from "./ecommerce/backend/sales/OrderDetails";
import Shipments from "./ecommerce/backend/sales/Shipments";
import SalesDashboard from "./ecommerce/backend/sales/SalesDashboard";
import TrafficAnalytics from "./ecommerce/backend/tarif/TrafficAnalytics";
//import Trafic from "./ecommerce/backend/Trafic";
import ProductPerformance from "./ecommerce/backend/productperfomance/ProductPerformance";
import Performance from "./ecommerce/backend/Performance";
import Conversion from "./ecommerce/backend/Conversion";
import ConversionMetrics from "./ecommerce/backend/conversion/ConversionMetrics";
import Customers from "./ecommerce/backend/Customers";
import CustomerInsights from "./ecommerce/backend/customerInsights/CustomerInsights";
import Realtime from "./ecommerce/backend/Realtime";
import RealTimeView from "./ecommerce/backend/realtimeview/RealTimeView";
import AOVList from "./ecommerce/backend/sales/AOVList";
import TotalVisitorList from "./ecommerce/backend/tarif/TotalVisitorList";
import TopTrafficPages from "./ecommerce/backend/tarif/TopTrafficPages";
import ReferrerDataTable from "./ecommerce/backend/tarif/ReferrerDataTable";
import ConversionRateTable from "./ecommerce/backend/conversion/ConversionRateTable";
import AbandonedCartTable from "./ecommerce/backend/conversion/AbandonedCartTable";
import BestSellersTable from "./ecommerce/backend/productperfomance/BestSellersTable";
import InventoryTurnoverTable from "./ecommerce/backend/productperfomance/InventoryTurnoverTable";
import NewVsReturningTable from "./ecommerce/backend/customerInsights/NewVsReturningTable";
import LifetimeValueTable from "./ecommerce/backend/customerInsights/LifetimeValueTable";
import ActiveVisitorsTable from "./ecommerce/backend/realtimeview/ActiveVisitorsTable";
import LiveOrdersTable from "./ecommerce/backend/realtimeview/LiveOrdersTable";
import { elements } from "chart.js";

const dummyOrder = {
  date: '2025-08-11',
  customer: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9876543210'
  },
  shippingAddress: '123 Main Street, Delhi, India',
  items: [
    { orderid: 123, name: 'Product A', qty: 2, price: 499.99, status: 'Delivered', cutomername: 'John Doe', email: 'john@example.com', phone: '+91 9876543210', shippingAddress: '123 Main Street, Delhi, India', },
    { orderid: 124, name: 'Product A', qty: 2, price: 499.99, status: 'Delivered', cutomername: 'John Doe', email: 'john@example.com', phone: '+91 9876543210', shippingAddress: '123 Main Street, Delhi, India', },

  ],
  total: 2299.48
};
// shipment dummy data
const shipmentsdata = {
  date: '2025-08-11',
  items: [
    {
      shipmentId: 'SHP001',
      orderId: 'ORD1001',
      customerName: 'John Doe',
      status: 'Shipped',
      carrier: 'FedEx',
      trackingNumber: 'FX123456789IN',
      shippedDate: '2025-08-10',
      estimatedDelivery: '2025-08-14',
      address: '123 Main St, New Delhi, India',
      quantity: 2,
      inventory: "default", // ✅ fixed
    },
    {
      shipmentId: 'SHP002',
      orderId: 'ORD1002',
      customerName: 'Priya Sharma',
      status: 'Out for Delivery',
      carrier: 'Delhivery',
      trackingNumber: 'DL456789123IN',
      shippedDate: '2025-08-09',
      estimatedDelivery: '2025-08-11',
      address: '456 Park Lane, Mumbai, India',
      quantity: 2,
      inventory: "default", // ✅ fixed
    },
  ],
};

const router = createBrowserRouter([
  {
    path: "/login",  // ✅ Login is top-level route
    element: <Login />
  },
 
  {
    path: "/dashboard",  // ✅ Login is top-level route
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Viewcategory />
      },
      {
        path: 'view-category',
        element: <Viewcategory />

      },
      {
        path: 'add-sub-category',
        element: <AddSubcategory />
      },
      {
        path: 'view-sub-category',
        element: <ViewSubCAtegory />
      },
      {
        path: 'add-product',
        element: <AddProduct />
      },
      {
        path: 'view-product',
        element: <ViewProduct />
      },
      {
        path: 'conversion',
        element: <ConversionMetrics />
      },
      {
        path: "conversion/rating",
        element: <ConversionRateTable />
      },
      {
        path: "conversion/abandon",
        element: <AbandonedCartTable />
      },
      //------------------------------------------------------
     {
      path: 'sales/sale-dashboard',
      element: <SalesDashboard totalSales={250000} averageOrderValue={82.5} orderCount={3000}/>
      },
      {
        path: "sales/Orders",  // relative path: /sales/Orders
        element: <OrderDetails order={dummyOrder} />,
      },
          {
        path: "sales/AOVList",  // relative path: /sales/AOVList
        element: <AOVList />,
      },
       {
        path: "trafic/trafic-dashboard",
        element: <TrafficAnalytics />,
       },
        {
        path: "trafic/visitors",
        element: <TotalVisitorList />,
      },
       {
         path: "trafic/top-pages",
         element: <TopTrafficPages />,
        },
        {
          path: "trafic/refer",  // Remove leading slash
          element: <ReferrerDataTable />
        },
          {
        path: 'performance',
        element: <ProductPerformance />
      },
      {
        path: "performance/best-seller",
        element: <BestSellersTable />
      },
      {
        path: "performance/inventory",
        element: <InventoryTurnoverTable />
      },
      {
        path: 'cutomers',
        element: <CustomerInsights newCustomers={2500} returningCustomers={7500} lifetimeValue={1345.67} />
      },
      {
        path: "cutomers/newVsreturning",
        element: <NewVsReturningTable />
      },
      {
        path: "cutomers/liftimevalue",
        element: <LifetimeValueTable />
      },
      {
        path: 'realtime',
        element: <RealTimeView activeVisitors={2500} liveOrders={7500} />
      },
      {
        path: "realtime/active-visitors",
        element: <ActiveVisitorsTable />
      },
      {
        path: "realtime/live-orders",
        element: <LiveOrdersTable />
      },
      //--------------------------------------------------------
      
    ]
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Product />,

      },
      {
        path: "/singleproduct/:id",
        element: <Singleproduct />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/whishlist",
        element: <Whislist />
      },
      {
        path: "/cart",
        element: <Cart />,
      }
    ]

  },



])

function App() {

  return <RouterProvider router={router} />
}
export default App;