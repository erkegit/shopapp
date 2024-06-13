import API from "../api/admin.axios.config";

class AdminService {
    addProduct(product) {
      return API.post(`/products`, product);
    }

    listProducts() {
        return API.get(`/products`);
    }

    editProduct(product) {
        return API.patch(`/products/${product.id}`, {...product, discountPercentage: product.discount_percentage});
    }

    deleteProduct(product) {
        return API.delete(`/products/${product.id}`);
    }

}

export default new AdminService();