import React, { Component } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Layout, LayoutProductlist, Spinner01 } from "../../../components";
import { useRouter } from "next/router";
import { IProduct } from "../../../src/interfaces";
import { useQuery } from "@apollo/client";
import {
  PRODUCTS,
  PRODUCTS_BY_LINE_AND_BY_CATEGORY,
} from "../../../src/gql/query";
import { client } from "../../../src/apollo";
import Heading from "../../../components/Heading";
import { LayoutProductlist01 } from "../../../components/LayoutProductList01";

const CategoryPage = () => {
  const router = useRouter();
  const { line, category } = router.query;
  const { loading, error, data } = useQuery(PRODUCTS_BY_LINE_AND_BY_CATEGORY, {
    variables: { line: `${line}`, category: `${category}` },
  });
  if (loading) return <Spinner01 />;
  
  return (
    <>  
      <Layout
      title={"Choco - Stores"}
      pageDescription={"Encuentra tu ropa favorita"}
    >
      <Heading line={`${line}`} category={`${category}`} />
      <LayoutProductlist01 products={data.paintByLineAndCategory} />
    </Layout>
    </>

  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await client.query({
    query: PRODUCTS,
  });
  const paths = data.paints.map((paint: IProduct) => ({
    params: { line: paint.line, category: paint.category },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { category = "" } = params as { category: string };
  return {
    props: {
      category,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default CategoryPage;

