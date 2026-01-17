import { useContext } from "react";
import { WishlistItems } from "../context/WhishlistItems";

function Whislist() {
  const { whishlistprod } = useContext(WishlistItems);

  return (
    <>
      <h3>Wishlist</h3>
      {whishlistprod && whishlistprod.length > 0 ? (
        whishlistprod.map((list, index) => (
          <div key={index}>
            {list.productname}
          </div>
        ))
      ) : (
        <p>No items in wishlist</p>
      )}
    </>
  );
}

export default Whislist;
