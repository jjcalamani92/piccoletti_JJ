import { useState } from "react";
import { NextPage } from "next";
import { Layout, Pagination01 } from "../../components";
import { Table02 } from "../../components/Table";
import { client } from '../../src/apollo';
import { PRODUCTS, PRODUCT_UPDATE, PRODUCT_BY_PAGINATION, PRODUCT_ALL } from '../../src/gql/query';
import { IProduct, IWear } from "../../src/interfaces";
import { useQuery } from '@apollo/client';
import { Spinner01 } from '../../components/Spinner';
interface Props {
	wears: IWear[];
}

const PAGE_SIZE = 5;

const AdminPage: NextPage<Props> = () => {
	const [page, setPage] = useState(0)
	// const { loading, error, data, fetchMore } = useQuery(PRODUCT_BY_PAGINATION, {variables: { after: null }});
	const { loading, error, data, fetchMore } = useQuery(PRODUCT_ALL, {variables: { limit: PAGE_SIZE, offset: page*PAGE_SIZE }});
	if (loading) return <Spinner01 />;
	return (
		<Layout
			title={"Choco - Stores"}
			pageDescription={"Encuentra tu ropa favorita"}
		>
			<Table02 products={data.wearsAll} />
			<Pagination01 setPage={setPage} page={page} length={data.wearsAll.length} all={PAGE_SIZE} />
		</Layout>
	);
};
export default AdminPage;
