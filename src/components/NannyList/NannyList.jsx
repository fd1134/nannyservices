import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNannies } from "../../redux/nannies/operations";
import { resetNannies } from "../../redux/nannies/slice";
import NannyCard from "../NannyCard/NannyCard";
import css from "./NannyList.module.css";
import Button from "../Button/Button";

const NannyList = () => {
  const dispatch = useDispatch();
  const { items, status, filter, lastVisible, hasMore } = useSelector(
    (state) => state.nannies
  );

  useEffect(() => {
    
    dispatch(resetNannies());
    dispatch(fetchNannies({ filter, lastVisible: null }));
  }, [dispatch, filter]);

  const handleLoadMore = () => {
    if (hasMore && status !== "loading") {
      dispatch(fetchNannies({ filter, lastVisible }));
    }
  };

  if (status === "loading" && items.length === 0)
    return <p className={css.loading}>Loading...</p>;
  if (status === "failed") return <p className={css.error}>Failed to load nannies.</p>;

  return (
    <>
      <ul className={css.cardGrid}>
        {items.map((nanny) => (
          <li key={nanny.id}>
            <NannyCard nanny={nanny} />
          </li>
        ))}
      </ul>

      {hasMore && (
        <>
          <Button variant="btn--filled" onClick={handleLoadMore}>{status === "loading" ? "Loading..." : "Load More"}</Button>
         
            
          
        </>
      )}
    </>
  );
};

export default NannyList;
