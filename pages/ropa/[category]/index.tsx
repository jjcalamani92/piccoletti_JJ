import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
	Layout,
	LayoutCategoryList,
	Spinner01
} from "../../../components";
import { useQuery } from "@apollo/client";
import { IProduct, Site } from "../../../src/interfaces";
import { PRODUCTS, PRODUCTS_BY_GENDER, SITEBYCATEGORY, SITES } from "../../../src/gql/query";
import { client, clientSite } from "../../../src/apollo";
import { Category, Section, Item } from '../../../src/interfaces/Site';
import { request } from "graphql-request";
import useSWR from "swr";
import { LayoutProductlist01 } from "../../../components/LayoutProductList01";
import Heading01 from "../../../components/Heading";
import { useRouter } from "next/router";

const API_ENDPOINT = `${process.env.APIS_URL}/graphql`

interface Props {
	category: string;
}

const CategoryPage: NextPage<Props> = ({ category }) => {
	const router = useRouter();
	const { isValidating, error, data } = useSWR(SITEBYCATEGORY, (query) =>
    request(API_ENDPOINT, query)
  );
  console.log(data)
	if (isValidating) return <Spinner01 />;
	const site = data.sites.find(findId)
	function findId(site:Site){
		return site._id === process.env.API_USER;
	}
	const res = site.categories.find(findCategory)
	function findCategory(res:Category){
		return res.name === `${category}`;
	}
	const section = res.sections.find(findSection)
	function findSection(section:Section){
		return section.name === 'ropa';
	}
	console.log(section)

	return (
		<Layout
			title={"Choco - Stores"}
			pageDescription={"Encuentra tu ropa favorita"}
		>
      <Heading01 line={`${router.query.category}`} />

			{/* <Heading04 category={gender} /> */}
			{/* <HeadingSecondary category={category} /> */}
			{/* <LayoutProductlist01 products={section.items} /> */}
			<LayoutCategoryList products={section.items} />
			{/* <HeadingSecondary category={category} /> */}
			{/* <LayoutProductlist products={data.wearByCategory} /> */}
		</Layout>
	);
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const {data} = await clientSite.query({
		query: SITEBYCATEGORY
	});
	const site = data.sites.find(findId)
	function findId(site:Site){
		return site._id === process.env.API_USER;
	}
	const paths = site.categories.map((data: Category) => ({
		params: { category: data.name }
	}))

	return {
		paths,
		fallback: false
	};
};


export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { category = "" } = params as { category: string };
	return {
		props: {
			category
		},
		revalidate: 60 * 60 * 24
	};
};



export default CategoryPage;