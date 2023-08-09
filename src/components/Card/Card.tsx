import styled from './Card.module.scss'
import {IPhoto} from '../../Models/IPhoto';
import {useAppDispatch} from '../../hook';
import {changeLike, deletePhoto} from '../../store/slice/photoSlice';
import deleteIcon from '../../image/delete.png'
import likeIcon from '../../image/like.png'
import dislikeIcon from '../../image/dislike.png'

interface CardProps {
    img: IPhoto
}

const Card: React.FC<CardProps> = ({img}) => {
    const dispatch = useAppDispatch()

    return (
        <div className={styled.card}>
            <div
                onClick={() => dispatch(deletePhoto(img))}
                className={styled.delete}>
                <img src={deleteIcon} alt='delete'/>
            </div>
            <img src={img.largeImageURL} alt=""/>
            <button
                onClick={() => dispatch(changeLike(img))}
                className={styled.like}>
                <img src={img.isLikes ? likeIcon : dislikeIcon} alt="like"/>
            </button>
        </div>
    );
};

export default Card;