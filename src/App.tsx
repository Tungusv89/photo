import Card from './components/Card/Card';
import styled from './Container.module.scss'
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from './hook';
import {fetchPhotos, likePhotos} from './store/slice/photoSlice';
import {IPhoto} from "./Models/IPhoto";

function App() {
    const {list: data, status, error, statusFilter} = useAppSelector(state => state.photo)
    const dispatch = useAppDispatch()

    const filterPhotos = (status: string) => {
        return (data: IPhoto) => {
            switch (status) {
                case 'likes':
                    return data.isLikes
                case 'all':
                    return data
            }
        }
    }


    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch]);

    return (
        <div className="App">
            <div
                className={styled.filter}
                onClick={() => dispatch(likePhotos())}
            >
                show{statusFilter === 'all' ? ' liked' : ' all'} photo
            </div>
            <div className={styled.container}>
                {status === 'loading' && <h2>Loading...</h2>}
                {error && <h2>Error: {error}</h2>}
                {data && (data.filter(filterPhotos(statusFilter)).map((img, i) =>
                        (<Card key={i} img={img}/>)
                    )
                )}
            </div>
        </div>
    );
}

export default App;

