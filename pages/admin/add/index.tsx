import { NextPage } from "next";
import { Layout } from "../../../components";
import { FormAdd } from "../../../components/form/FormAdd";



const AddProduct = () => {
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
