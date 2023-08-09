import styled from './Card.module.scss'
import {IPhoto} from '../../Models/IPhoto';
import {useAppDispatch} from '../../hook';
import {changeLike, deletePhoto} from '../../store/slice/photoSlice';

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
                <img src='/image/delete.png' alt='delete'/>
            </div>
            <img src={img.largeImageURL} alt=""/>
            <button
                onClick={() => dispatch(changeLike(img))}
                className={styled.like}>
                <img src={img.isLikes ? '/image/like.png' : '/image/dislike.png'} alt="like"/>
            </button>
        </div>
    );
};

export default Card;