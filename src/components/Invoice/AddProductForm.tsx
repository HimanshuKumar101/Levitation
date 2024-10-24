import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../features/invoiceSlice";
import { RootState } from "../../store/store";
import { logout } from "../../features/authSlice";
import Navbar from "../common/Navbar";
import { CiCirclePlus } from "react-icons/ci";

interface Product {
  name: string;
  quantity: number;
  rate: number;
  total: number;
  gst: number; 
  totalPriceWithGST: number; 
}

const AddProductForm: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [productQty, setProductQty] = useState(1);
  const [productRate, setProductRate] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const products = useSelector((state: RootState) => state.invoice.products);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const productTotal = productQty * productRate;
    const gst = productTotal * 0.18;
    const totalPriceWithGST = productTotal + gst;

    dispatch(
      addProduct({
        name: productName,
        quantity: productQty,
        rate: productRate,
        total: productTotal,
        gst, 
        totalPriceWithGST 
      })
    );

    // Reset form fields
    setProductName("");
    setProductQty(1);
    setProductRate(0);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    dispatch(logout());
    navigate("/login");
  };

  const handleGeneratePDF = async () => {
    const token = localStorage.getItem("userToken"); // Retrieve the token

    // Check if the token exists
    if (!token) {
      console.error("No token found. Please log in to generate a PDF.");
      alert("You need to be logged in to generate a PDF invoice."); // Alert the user
      return; // Stop the function if no token is found
    }

    try {
      // Prepare the product data to send
      const productData = products.map(product => ({
        name: product.name,
        quantity: product.quantity,
        rate: product.rate,
        total: product.total,
        gst: product.gst,
        totalPriceWithGST: product.totalPriceWithGST,
      }));

      const response = await fetch("http://localhost:4000/api/invoice/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ products: productData }), // Send products in the body
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      console.log(response.headers.get("Content-Type")); 
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "invoice.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("An error occurred while generating the PDF. Please try again.");
    }
  };

  return (
    <div className="w-full h-full bg-[#141414] flex flex-col justify-between md:flex flex-row">
      <Navbar
        isLoggedIn={isAuthenticated}
        isLoginPage={false}
        onLogout={handleLogout}
      />

      <div className="w-[1248px] h-full bg-[#141414] mx-auto mt-[164px] flex-1">
        <div className="space-y-3 mb-[40px]">
          <h1 className="text-[40px] font-bold text-white ">Add Products</h1>
          <p className="text-[20px] font-normal text-[#A7A7A7]">
            This is basic login page which is used for levitation assignment purpose.
          </p>
        </div>

        <form onSubmit={handleAddProduct} className="space-y-6">
          <div className="h-full flex justify-between items-center space-x-4">
            <div className="w-[30%]">
              <label className="text-[16px] font-semibold text-white">
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full h-[60px] p-5 bg-[#202020] border border-[#424647] rounded-md text-white"
                placeholder=""
                required
              />
            </div>

            <div className="w-[30%]">
              <label className="text-[16px] font-semibold text-white">
                Product Price
              </label>
              <input
                type="number"
                value={productRate}
                onChange={(e) => setProductRate(Number(e.target.value))}
                className="w-full h-[60px] p-5 bg-[#202020] border border-[#424647] rounded-md text-white"
                placeholder=""
                required
              />
            </div>

            <div className="w-[30%]">
              <label className="text-[16px] font-semibold text-white">
                Quantity
              </label>
              <input
                type="number"
                value={productQty}
                onChange={(e) => setProductQty(Number(e.target.value))}
                className="w-full h-[60px] p-5 bg-[#202020] border border-[#424647] rounded-md text-white"
                placeholder=""
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center w-[156px] h-[45px] bg-gradient-to-r from-[#141414] to-[#303030] text-[#CCF575] text-[16px] font-semibold rounded-md space-x-2"
          >
            <span>Add Product </span>
            <span className="w-[21px] h-[21px] text-[#CCF575]"><CiCirclePlus /></span>
          </button>
        </form>

        {products.length > 0 && (
          <div className="w-full h-auto max-h-full border border-white mt-8 space-y-4 radius-8px rounded">
            {/* Table Header */}
            <div className="h-full grid grid-cols-4 text-black font-semibold text-[14px] bg-white p-4 border-white">
              <span>Product Name</span>
              <span>Quantity</span>
              <span>Price</span>
              <span>Total Price</span>
            </div>

            {/* Product Rows */}
            {products.map((product: Product, index: number) => (
              <div
                key={index}
                className="h-full grid grid-cols-4 text-white font-normal text-[14px] bg-[#141414] p-4 radius-8px border-white"
              >
                <span>{product.name}</span>
                <span>{product.quantity}</span>
                <span>INR {product.rate.toFixed(2)}</span>
                <span>INR {product.total.toFixed(2)}</span>
              </div>
            ))}

            {/* GST Row */}
            <div className="h-full grid grid-cols-4 text-white font-semibold text-[14px] p-4 mt-10 bg-[#141414] border-white">
              <span></span>
              <span></span>
              <span>+GST 18%</span>
              <span>INR {products.reduce((sum, product) => sum + product.total, 0).toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Adjust Generate PDF button position */}
      <div className="w-full h-full p-4 bg-[#141414] flex justify-center">
        <button
          onClick={handleGeneratePDF}
          className="w-[435px] h-[43px] bg-gradient-to-r from-[#141414] to-[#303030] text-[#CCF575] text-[16px] font-semibold rounded-md"
        >
          Generate PDF Invoice
        </button>
      </div>
    </div>
  );
};

export default AddProductForm;
