import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
	Layout,
	Spinner01,
	ProductOverviews05
} from "../../components";
import { useQuery } from "@apollo/client";
import { IProduct } from "../../src/interfaces";
import { PRODUCTS, PRODUCT_BY_SLUG } from "../../src/gql/query";
import { client } from "../../src/apollo";
import Heading from "../../components/Heading";

interface SlugPage {
	slug: string;
}

const SlugPage: NextPage<SlugPage> = ({ slug }) => {

	const { loading, error, data } = useQuery(PRODUCT_BY_SLUG, {
		variables: { slug: `${slug}` }
	});
	if (loading) return <Spinner01 />;
	// console.log(slug)
	return (
		<Layout
			title={"Choco - Stores"}
			pageDescription={"Encuentra tu ropa favorita"}
		>
      <Heading line={`${data.paintBySlug.line}`} category={`${data.paintBySlug.category}`} name={`${data.paintBySlug.name}`}/>
			
			<ProductOverviews05 product={data.paintBySlug} />

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
  }
};
export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const { data } = await client.query({
		query: PRODUCTS
	});

	const paths = data.paints.map((data: IProduct) => ({
		params: { slug: data.slug }
	}));
	return {
		paths,
		fallback: "blocking"
	};
};
export default SlugPage;
