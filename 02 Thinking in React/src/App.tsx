import {useState} from 'react';

function FilterableProductTable({products, title}: { products: Product[], title: string }) {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    return (<>
        <h3>{title}</h3>
        <SearchBar
            filterText={filterText}
            inStockOnly={inStockOnly}
            onFilterTextChange={setFilterText}
            onInStockChange={setInStockOnly}
        />
        <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly}/>
    </>);
}


function SearchBar({filterText, inStockOnly, onFilterTextChange, onInStockChange}: {
    filterText: string,
    inStockOnly: boolean,
    onFilterTextChange: (text: string) => void,
    onInStockChange: (inStockOnly: boolean) => void
}) {
    return (<>
        <input value={filterText}
               onChange={(e) => {
                   onFilterTextChange(e.target.value);
               }}/> <br/>
        <input type="checkbox" checked={inStockOnly} onChange={(e) => {
            onInStockChange(e.target.checked);
        }}/> "Only show products in stock"
    </>)
}

function ProductTable({products, filterText, inStockOnly}: {
    products: Array<Product>,
    filterText: string,
    inStockOnly: boolean
}) {
    let lastCategory = null;
    const rows = [];

    products.forEach(product => {
        if (inStockOnly && !product.stocked) {
            return;
        }

        if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
            return;
        }

        if (product.category !== lastCategory) {
            rows.push(<ProductCategoryRow category={product.category} key={product.category}/>);
            lastCategory = product.category;
        }

        rows.push(<ProductRow product={product} key={product.name}/>);
    })

    return (<table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Price</th>
        </tr>
        </thead>
        <tbody>
        {rows}
        </tbody>
    </table>)
}

function ProductCategoryRow({category}: { category: string }) {
    return (<tr>
        <td colSpan={2}><h4>{category}</h4></td>
    </tr>)
}

function ProductRow({product}: { product: Product }) {
    const name = product.stocked ? product.name : <span style={{color: 'red'}}>
      {product.name}
    </span>;

    return (<>
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    </>);
}

const PRODUCTS = [{category: "Fruits", price: "$1", stocked: true, name: "Apple"}, {
    category: "Fruits",
    price: "$1",
    stocked: true,
    name: "Dragonfruit"
}, {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"}, {
    category: "Vegetables",
    price: "$2",
    stocked: true,
    name: "Spinach"
}, {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"}, {
    category: "Vegetables",
    price: "$1",
    stocked: true,
    name: "Peas"
}];

interface Product {
    name: string,
    price: string,
    stocked: boolean,
    category: string
}

export default function App() {

    return (<div>
        <FilterableProductTable products={PRODUCTS} title={"Product List"}/>
    </div>)
}