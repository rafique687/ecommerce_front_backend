import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Product from "./ecommerce/component/Product";
//import Home from "./ecommerce/Home";
import Home1 from "./ecommerce/Home1";

import Singleproduct from "./ecommerce/pages/Singleproduct";
import About from "./ecommerce/pages/About";
import Whislist from "./ecommerce/pages/whishlist";
import Cart from "./ecommerce/pages/Cart";
import Login from "./Login";
import Dashboard from "./ecommerce/backend/Dashboard";

import Viewcategory from "./ecommerce/backend/category/Viewcategory";
import Addcategory from "./ecommerce/backend/category/Addcategory";
import AddSubcategory from "./ecommerce/backend/category/AddSubcategory";
import ViewSubCAtegory from "./ecommerce/backend/category/ViewSubCAtegory";
import UpdateCategory from "./ecommerce/backend/category/UpdateCategory";
import UpdateSubcategory from "./ecommerce/backend/category/UpdateSubcategory";

import ViewProduct from "./ecommerce/backend/product/ViewProduct";
import AddProduct from "./ecommerce/backend/product/AddProduct";
import UpdateProduct from './ecommerce/backend/product/UpdateProduct';
import UploadExcel from "./ecommerce/backend/product/UploadExcel";
import VarriantVise from "./ecommerce/backend/product/VarriantVise";

import OrderDetails from "./ecommerce/backend/sales/OrderDetails";
import Shipments from "./ecommerce/backend/sales/Shipments";
import SalesDashboard from "./ecommerce/backend/sales/SalesDashboard";
import AOVList from "./ecommerce/backend/sales/AOVList";

import TrafficAnalytics from "./ecommerce/backend/tarif/TrafficAnalytics";
import TotalVisitorList from "./ecommerce/backend/tarif/TotalVisitorList";
import TopTrafficPages from "./ecommerce/backend/tarif/TopTrafficPages";
import ReferrerDataTable from "./ecommerce/backend/tarif/ReferrerDataTable";

import ProductPerformance from "./ecommerce/backend/productperfomance/ProductPerformance";
import BestSellersTable from "./ecommerce/backend/productperfomance/BestSellersTable";
import InventoryTurnoverTable from "./ecommerce/backend/productperfomance/InventoryTurnoverTable";

import ConversionMetrics from "./ecommerce/backend/conversion/ConversionMetrics";
import CustomerInsights from "./ecommerce/backend/customerInsights/CustomerInsights";
import RealTimeView from "./ecommerce/backend/realtimeview/RealTimeView";


import ConversionRateTable from "./ecommerce/backend/conversion/ConversionRateTable";
import AbandonedCartTable from "./ecommerce/backend/conversion/AbandonedCartTable";

import NewVsReturningTable from "./ecommerce/backend/customerInsights/NewVsReturningTable";
import LifetimeValueTable from "./ecommerce/backend/customerInsights/LifetimeValueTable";

import ActiveVisitorsTable from "./ecommerce/backend/realtimeview/ActiveVisitorsTable";
import LiveOrdersTable from "./ecommerce/backend/realtimeview/LiveOrdersTable";

import { AuthProvider } from './ecommerce/context/AuthContext';

import { elements } from "chart.js";

import MediaUploadForm from "./ecommerce/backend/media/MediaUploadForm";
import MediaGrid from "./ecommerce/backend/media/MediaGrid";
import EditMedia from "./ecommerce/backend/media/EditMedia";

import ViewDiscount from "./ecommerce/backend/discount/ViewDiscount";
import AddDiscountForm from "./ecommerce/backend/discount/AddDiscountForm";
import EditDiscountForm from "./ecommerce/backend/discount/EditDiscountForm";
import Collections from "./ecommerce/backend/category/Collections";
import AddCollectionForm from "./ecommerce/backend/category/AddCollectionForm";
import { FaUpDownLeftRight } from "react-icons/fa6";
import UpdateCollectionForm from "./ecommerce/backend/category/UpdateCollectionForm";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element:<SalesDashboard totalSales={250000} averageOrderValue={82.5} orderCount={3000} />
      },
      {
        path: 'category/view-category',
        element: <Viewcategory />
      },
      {
        path:'category/add-category',
        element:<Addcategory/>
      },
      {
        path: 'category/add-sub-category',
        element: <AddSubcategory />
      },
      {
        path: 'category/view-sub-category',
        element: <ViewSubCAtegory />
      },
      {
        path: 'product/add-product',
        element: <AddProduct />
      },
      {
        path:'category/update-category/:id',
        element:<UpdateCategory/>
      },
      {
        path:'category/update-sub-category/:id',
        element:<UpdateSubcategory/>
      },
      {
        path:'category/collection',
        element:<Collections/>
      },
      {
        path:'category/add-collection',
        element: <AddCollectionForm/>
      },
      {
        path:'category/Update-Collection/:id',
        element:<UpdateCollectionForm/>
      },
      {
        path: 'product/view-product',
        element: <ViewProduct />
      },
      {
        path:'product/updateProduct/:productId',
        element:<UpdateProduct/>
      },
      {
        path:'product/uploadexcel',
        element:<UploadExcel/>
      },
      {
        path:'product/varrians',
        element:<VarriantVise/>
      },
       {
        path:'media',
        element:<MediaGrid/>
      },
       {
        path:'media/upload',
        element:<MediaUploadForm/>
      },
      {
        path:'discount',
        element:<ViewDiscount/>
      },
      {
        path:'discount/add',
        element:<AddDiscountForm/>
      },
      {
        path:'discount/edit/:id',
        element:<EditDiscountForm/>
      },
      {
        path:'media/edit/:id',
        element:<EditMedia/>
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
      {
        path: 'sales/sale-dashboard',
        element: <SalesDashboard totalSales={250000} averageOrderValue={82.5} orderCount={3000} />
      },
      {
        path: "sales/Orders",
        element: <OrderDetails />,
      },
      {
        path: "sales/AOVList",
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
        path: "trafic/refer",
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
    ]
  },
  {
    path: "/",
     element: <Home1 />,
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
]);

function App() { 
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
