import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { IWear } from "../../../src/interfaces";
import { FormEdit, Layout, Spinner01 } from "../../../components";
import { useQuery } from "@apollo/client";
import { PRODUCT_BY_SLUG, PRODUCTS, PRODUCT_UPDATE } from '../../../src/gql/query';
import { client } from '../../../src/apollo';

interface Props {
	slug: string;
}

const SlugEditPage: NextPage<Props> = ({ slug }) => {
	const { loading, error, data } = useQuery(PRODUCT_BY_SLUG, {
		variables: { slug: `${slug}` }
	});
	if (loading) return <Spinner01 />;
	return (
		<Layout
			title={`${data.wearBySlug.name}`}
			pageDescription={`${data.wearBySlug.description}`}
			imageFullUrl={`${data.wearBySlug.image[1]}`}
		>
      <FormEdit product={data.wearBySlug}/>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug = "" } = params as { slug: string };
	return {
		props: {
			slug
		},
		revalidate: 60 * 60 * 24
	};
};
export const getStaticPaths: GetStaticPaths = async (ctx) => {
	
	const { data } = await client.query({
		query: PRODUCTS
	});

	const paths = data.wears.map((data: IWear) => ({
		params: { slug: data.slug }
	}));
	// console.log(paths)
	return {
		paths,
		fallback: "blocking"
	};
};

export default SlugEditPage;
