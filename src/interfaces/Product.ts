export interface IProduct {
	_id: string;
	name: string;
	brand: string;
	image: string[];
	description: string;
	inStock: number;
	slug: string;
	category: string;
	line: string;
	price: number;
	oldPrice: number;
	tags: string[];
	status: boolean;
	site: string;
}
export interface IWear {
	_id: string;
	name: string;
	brand: string;
	image: string[];
	description: string;
	inStock: number;
	sizes: string[];
	slug: string;
	category: string;
	gender: string;
	price: number;
	oldPrice: number;
	color: string;
	tags: string[];
	client: string;
	status: boolean;
	site: string;
}