import { useEffect, useState, useCallback } from "react"

const InfiniteScroll = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasmore, setHasMore] = useState(true);



    const fetchData = async () => {
        
        if (loading && !hasmore) return;

        setLoading(true);

        try {
            
            let res = await fetch(`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`);
            let data = await res.json();
            setItems((prevItems) => [...prevItems, ...data.products]);
            data.products.length > 0 ? setHasMore(true) : setHasMore(false);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        };
    }

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } =
            document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight) {
           
            setPage((prevPage) => prevPage + 1);

        }
    }
    useEffect(()=> {
        if(hasmore){
            fetchData();
        }
        
    },[page])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <div>
            <ul >
                {items.map((item, index) => (
                    <li style={{height:'150px', border:'2px solid black', marginBottom : '10px'}} key={index}>{item.title}</li>
                ))}
            </ul>
            {loading && <p>Loading...</p>}
            {!hasmore  && <p>No More data ......</p>}
        </div>
    )

}

export default InfiniteScroll