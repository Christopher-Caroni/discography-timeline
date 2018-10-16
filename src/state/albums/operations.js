import { spotifyApi } from '../spotify';
import { actions } from '.';

const search = artistId => dispatch => {
    spotifyApi
        .getArtistAlbums(artistId)
        .then(res => {
            const { body } = res;

            return dispatch(actions.searchSuccess(body));
        })
        .catch(err => {
            return dispatch(actions.searchFail(err.toString()));
        });
};

export { search };