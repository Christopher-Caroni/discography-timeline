import { types } from '.';

const searchFail = error => ({ type: types.ARTIST_ALBUM_SEARCH_FAIL, payload: { error } });
const searchSuccess = result => ({
    type: types.ARTIST_ALBUM_SEARCH_SUCCESS,
    payload: { ...result },
});

const searchAllFail = error => ({ type: types.ARTIST_ALBUM_SEARCH_ALl_FAIL, payload: { error } });
const searchAllSuccess = result => ({
    type: types.ARTIST_ALBUM_SEARCH_ALL_SUCCESS,
    payload: { ...result },
});

const sortedAlbums = items => ({
    type: types.ARTIST_ALBUM_SORT,
    payload: { items },
});

export { searchFail, searchSuccess, searchAllFail, searchAllSuccess, sortedAlbums };
