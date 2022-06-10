import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Layout, LayoutProductlist, Spinner01 } from "../../../../components";

import { IProduct, IWear } from "../../../../src/interfaces";
import { useQuery } from "@apollo/client";
import {
  PRODUCTS,
  PRODUCTS_BY_GENDER_AND_BY_CATEGORY,
} from "../../../../src/gql/query";
import { client } from "../../../../src/apollo";
import { LayoutProductlist01 } from "../../../../components/LayoutProductList01";
import Heading01 from "../../../../components/Heading";
import React, { Component } from "react";
import { useRouter } from "next/router";



const ItemPage = () => {
	const router = useRouter();
  const { category, item } = router.query
  
  const { loading, error, data } = useQuery(PRODUCTS_BY_GENDER_AND_BY_CATEGORY, {
    variables: { gender: `${category}`, category: `${item}` },
  });
  if (loading) return <Spinner01 />;
  console.log(data)
  return (
    <>  
      <Layout
      title={"Choco - Stores"}
      pageDescription={"Encuentra tu ropa favorita"}
    >
      <Heading01 line={`${category}`} category={`${item}`} />
      <LayoutProductlist01 products={data.wearByGenderAndCategory} />
    </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await client.query({
    query: PRODUCTS,
  });
  const paths = data.wears.map((data: IWear) => ({
    params: { category: data.gender, item: data.category },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { item = "" } = params as { item: string };
  return {
    props: {
      item,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default ItemPage;

