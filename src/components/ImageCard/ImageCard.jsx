import css from "./ImageCard.module.css";

export default function ImageCard({ item, openModal }) {

    // console.log(item);

    return (
        <div className={css.divImage} onClick={() => openModal(item)}>
            <img className={css.cardImage} src={item.urls.small} alt={item.alt_description}/>
        </div>
    )
}