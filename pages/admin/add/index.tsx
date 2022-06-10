import { FormAdd, Layout } from "../../../components";

const AddProduct= () => {
	return (
		<Layout
			title="Nuevo Producto"
			pageDescription="{`${product.description}`}"
			imageFullUrl="{`${product.image[1]}`}"
		>
			<FormAdd />

		</Layout>
	);
};

export default AddProduct;
