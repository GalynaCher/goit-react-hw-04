import css from "./ImageGallery.module.css";

import ImageCard from  "../ImageCard/ImageCard"

export default function ImageGallery({items, openModal}) { 
    
    return (
        <ul className={css.galleryUl}>
            {items.map(item => {
                return <li key={item.id} className={css.galleryLi}>
                    <ImageCard item={item} openModal={openModal}/>
                </li>
            })}
        </ul>
    );
}