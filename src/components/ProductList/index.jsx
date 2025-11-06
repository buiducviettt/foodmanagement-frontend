import ProductItem from './ProductItem';
import axios from 'axios';
// import Images from '../../assets/image/Images';
import ReactCardFlip from 'react-card-flip';
import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { getProducts } from '../../api';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
const ProductList = ({ value }) => {
  const location = useLocation();
  const pathname = location.pathname;
  // thêm 1 form để lên món mới
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    price: '',
    description: '',
    stock: '',
  });
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Edit sản phẩm
  const [editData, setEditData] = useState({
    title: '',
    image: '',
    price: '',
    description: '',
    stock: '',
  });
  const [editId, setEditId] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEdit = (product) => {
    setEditData({
      title: product.title,
      image: product.image,
      price: product.price,
      description: product.description,
      stock: product.stock,
    });
    setEditId(product.id); // lưu lại ID để lát gửi PUT/PATCH
    setOpenEditModal(true);
  };
  const handleClosePopupModel = () => {
    setOpenEditModal(false);
  };

  // nộp form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://673c683296b8dcd5f3f9d8d8.mockapi.io/food/data/courses',
        {
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        },
      );
      alert('Thêm món thành công!');
      console.log(response.data);
    } catch (error) {
      console.error('Error creating product:', error);
    }
    // Reset form data after submission
    window.location.reload();
  };
  // Quản lý trạng thái flip cho từng sản phẩm
  const [flippedItems, setFlippedItems] = useState([]);
  const { addToCart } = useCart();

  // Danh sách sản phẩm
  const [products, setProducts] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const handleOpenPopup = () => {
    setOpenPopup(true);
  };
  const handleClosePopup = () => {
    setOpenPopup(false);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);
  // xử lý add to cart
  const handleAddToCart = (e, product) => {
    e.stopPropagation();

    if (product.stock <= 0) {
      alert('Out of stock');
      return; // Không thực hiện gì thêm nếu hết hàng
    }

    addToCart(product);
    console.log('Product added to cart:', product);
  };

  // Xử lý khi click vào sản phẩm
  const handleClick = (id) => {
    setFlippedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };
  // update san pham
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://673c683296b8dcd5f3f9d8d8.mockapi.io/food/data/courses/${editId}`,
        {
          ...editData,
          price: parseFloat(editData.price),
          stock: parseInt(editData.stock),
        },
      );
      console.log(response.data);
      alert('Đã điều chỉnh');
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };
  return (
    <div className="product_list">
      <div className="row">
        {pathname === '/setting' && (
          <div className="col col-4">
            <div className="product_item add_item" onClick={handleOpenPopup}>
              <div className="inner">
                <div className="action_add">
                  <p className="plus">+</p>
                  <p className="add_text">Add new dish</p>
                </div>
              </div>
            </div>
            <Modal
              isOpen={openPopup}
              onRequestClose={handleClosePopup}
              className="add_item_modal"
              style={{
                content: {
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  padding: '20px',
                  borderRadius: '8px',
                  display: 'flex',
                  gap: '2rem',
                  flexDirection: 'column',
                  color: 'white',
                  justifyContent: 'center',
                  alignItems: 'center', // Đảm bảo nội dung bên trong được căn giữa
                },
              }}
            >
              <div className="modal_header">
                <h2>Add new dish</h2>
              </div>
              <div className="modal_body">
                <form onSubmit={handleSubmit}>
                  <div className="form_group">
                    <label htmlFor="title">Product Name</label>
                    <input
                      value={formData.title}
                      name="title"
                      type="text"
                      placeholder="Title"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form_group">
                    <label htmlFor="image">Image</label>
                    <input
                      name="image"
                      onChange={handleChange}
                      value={formData.image}
                      type="text"
                      id="image"
                      placeholder="Image"
                      required
                    />
                  </div>
                  <div className="form_group">
                    <label htmlFor="price">Price</label>
                    <input
                      name="price"
                      onChange={handleChange}
                      value={formData.price}
                      type="text"
                      id="price"
                      placeholder="Price"
                      required
                    />
                  </div>
                  <div className="form_group">
                    <label htmlFor="stock">Stock</label>
                    <input
                      onChange={handleChange}
                      value={formData.stock}
                      type="text"
                      name="stock"
                      id="stock"
                      placeholder="Stock"
                      required
                    />
                  </div>
                  <div className="form_group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      name="description"
                      id="description"
                      value={formData.description}
                      placeholder="Enter description"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="btnn --pri btnn_addcart"
                    style={{ width: '100%', marginTop: '1.6rem' }}
                  >
                    Add
                  </button>
                </form>
              </div>
            </Modal>
          </div>
        )}
        {products
          .filter((product) => value === 'all' || product.cate === value)
          .map((product) => (
            <div className="col col-4" key={product.id}>
              <div className="product_item item">
                <ReactCardFlip
                  isFlipped={flippedItems.includes(product.id)}
                  flipDirection="horizontal"
                >
                  {/* Mặt trước */}
                  <div
                    className="card-front"
                    onClick={() => handleClick(product.id)}
                  >
                    <ProductItem
                      editDish={() => handleOpenEdit(product)}
                      image={product.image}
                      name={product.title}
                      price={product.price}
                      number={product.stock}
                    />
                  </div>
                  {/* Mặt sau */}
                  <div
                    className="card-back"
                    onClick={() => handleClick(product.id)}
                  >
                    <div className="card_back_content">
                      <h3>Info</h3>
                      <p>{product.description}</p>
                    </div>
                    <div className="product_cart_item">
                      {pathname === '/' && (
                        <div
                          className="btnn --pri btnn_addcart"
                          onClick={(e) => handleAddToCart(e, product)}
                        >
                          Order now
                        </div>
                      )}
                    </div>
                  </div>
                </ReactCardFlip>
              </div>
            </div>
          ))}
        <Modal
          isOpen={openEditModal}
          onRequestClose={handleClosePopupModel}
          className="add_item_modal"
          style={{
            content: {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: '20px',
              borderRadius: '8px',
              display: 'flex',
              gap: '2rem',
              flexDirection: 'column',
              color: 'white',
              justifyContent: 'center',
              alignItems: 'center', // Đảm bảo nội dung bên trong được căn giữa
            },
          }}
        >
          <div className="modal_header">
            <h2>Edit Product</h2>
          </div>
          <div className="modal_body">
            <form action="" onSubmit={handleUpdate}>
              <div className="form_group">
                <label htmlFor="edit_title">Name:</label>
                <input
                  type="text"
                  name="title"
                  value={editData.title}
                  onChange={handleEditChange}
                />
              </div>
              <div className="form_group">
                <label htmlFor="edit_price">Price:</label>
                <input
                  type="number"
                  name="price"
                  value={editData.price}
                  onChange={handleEditChange}
                />
              </div>
              <div className="form_group">
                <label htmlFor="edit_image">Image:</label>
                <input
                  type="text"
                  name="image"
                  value={editData.image}
                  onChange={handleEditChange}
                />
              </div>
              <div className="form_group">
                <label htmlFor="edit_description">Description:</label>
                <input
                  type="text"
                  name="description"
                  value={editData.description}
                  onChange={handleEditChange}
                />
              </div>
              <button
                type="submit"
                className="btnn --pri btnn_addcart"
                style={{ width: '100%', marginTop: '1.6rem' }}
              >
                Edit
              </button>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ProductList;
