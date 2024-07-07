import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({onClick}) {
    
    return (
        <div className={css.loadMoreDiv}>
            <button onClick={onClick} className={css.loadMoreButton}>Load more</button>
        </div>
    )
}