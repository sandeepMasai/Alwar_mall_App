import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllProduct, getAllProductFunction } = context;
  const navigate = useNavigate();

  // Delete product
  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, 'products', id));
      toast.success('Product Deleted successfully');
      getAllProductFunction();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="py-5 flex justify-between items-center">
        {/* Header Text */}
        <h1 className="text-xl text-blue-300 font-bold">All Products</h1>

        {/* Add Product Button */}
        <Link to={'/addproduct'}>
          <button className="px-5 py-2 bg-pink-50 border border-pink-100 rounded-lg hover:bg-pink-200 transition duration-300">
            Add Product
          </button>
        </Link>
      </div>

      {/* Loading Spinner */}
      <div className="flex justify-center relative top-20">
        {loading && <Loader />}
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto mb-5">

        <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
          <thead>
            <tr>
              <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">S.No.</th>
              <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">Image</th>
              <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Title</th>
              <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Price</th>
              <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Category</th>
              <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Date</th>
              <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Edit</th>
              <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Delete</th>
            </tr>
          </thead>

          <tbody>
            {getAllProduct.map((item, index) => {
              const { id, title, price, category, date, productImageUrl } = item;
              return (
                <tr key={index} className="text-blue-300 hover:bg-slate-50 transition duration-300">
                  <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                    {index + 1}.
                  </td>
                  <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">
                    <div className="flex justify-center">
                      <img className="w-20" src={productImageUrl} alt="Product" />
                    </div>
                  </td>
                  <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">{title}</td>
                  <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">₹{price}</td>
                  <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">{category}</td>
                  <td className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-slate-500">{date}</td>
                  <td
                    onClick={() => navigate(`/updateproduct/${id}`)}
                    className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-green-500 cursor-pointer hover:text-green-700 transition duration-300"
                  >
                    Edit
                  </td>
                  <td
                    onClick={() => deleteProduct(id)}
                    className="h-12 px-6 text-md border-t border-l first:border-l-0 border-pink-100 text-red-500 cursor-pointer hover:text-red-700 transition duration-300"
                  >
                    Delete
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductDetail;
