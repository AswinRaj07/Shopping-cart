import axios from "axios"
import { FunctionComponent, useEffect, useState } from "react"
import productstyl from '../Product/Product.module.scss'
import { useNavigate } from "react-router"
interface Products{
    id:number,
    name:string,
    price:number,
    imagePath:string
}

const AdminPage:FunctionComponent = () => {

    const [products,setProducts]=useState<Products[]>([])
    console.log(products)
    useEffect(()=>{
      fetchProducts()
    },[])

    const fetchProducts = async ()=>{
        try{
            const response =await axios.get("http://localhost:5000/api/viewProduct")
            console.log(response)
            setProducts(response.data.products)
        }
        catch(err){
            console.log(err)
        }
    }
    const navigate =useNavigate()
    
    // const deleteFunction =async (id:number)=>{
    //     try{

    //         const response = await axios.delete(`http://localhost:5000/api/product/delete/${id}`)
    //         console.log(response)
    //     }
    //     catch(err){
    //     console.log(err)
    // }
  return (
    <div>
     <section className={productstyl.productPage}>
        <h1>Products</h1>
        <div>
          <button className={productstyl.addnewbttn} onClick={()=>navigate('/addProduct')}>AddProduct</button>
        </div>
        <div className={productstyl.container}>
          {products.map((product) => {
            return (
              <div className={productstyl.product} key={product.id}>
                <img src={product.imagePath} alt={product.name} />
                <h3>{product.name}</h3> 
                <p>price{product.price}</p>
                <button onClick={()=>navigate("/editproduct",{state:{product}})}>Edit</button> 
                 
                <button>Remove</button>
               
              </div>
            );
          })}
        </div>
      </section>
      </div>
      )
    
    }

export default AdminPage
