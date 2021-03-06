import './albumList.scss';
import 'react-vertical-timeline-component/style.min.css';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';

import { Album } from '../Album';
import { AlbumDate } from '../AlbumDate';
import { AlbumIcon } from '../AlbumIcon';
import { AlbumInfoDialog } from '../AlbumInfoDialog';
import { albumType } from '../types';

class AlbumList extends React.Component {
    state = {
        openInfoModal: false,
    };

    toggleAlbumInfo = () =>
        this.setState(({ openInfoModal }) => ({ openInfoModal: !openInfoModal }));

    handleAlbumInfoClick = id => {
        this.toggleAlbumInfo();
        this.props.searchSpecificAlbum(id);
    };

    render() {
        const {
            albums: { total, items, filteredItems, initialized, selectedAlbum },
            showType,
        } = this.props;
        const { openInfoModal } = this.state;

        let progress = 0;
        if (!initialized && total > 0) progress = (items.length / total) * 100;

        if (!initialized) {
            return (
                <div className="album-list-loader-container">
                    <CircularProgress variant="determinate" value={progress} size={60} />
                </div>
            );
        }

        if (!items.length) {
            return (
                <div className="album-list-no-results-container">
                    <div className="message">No albums found for this artist (all types).</div>
                </div>
            );
        }

        if (!filteredItems.length) {
            return (
                <div className="album-list-no-results-container">
                    <div className="message">No albums found for the selected filters</div>
                </div>
            );
        }

        const totalAmountFiltered = filteredItems
            .map(item => 1 + (item.alternatives ? item.alternatives.length : 0))
            .reduce((a, b) => a + b, 0);

        return (
            <div className="album-list-container">
                <div className="results-info">
                    <Typography>
                        {`${items.length} total album${items.length > 1 ? 's' : ''} found`}
                        <br />
                        {`${totalAmountFiltered} album${
                            totalAmountFiltered > 1 ? 's' : ''
                        } found (filtered)`}
                        <br />
                        {`${filteredItems.length} unique album${
                            filteredItems.length > 1 ? 's' : ''
                        } found (filtered)`}
                    </Typography>
                </div>
                <VerticalTimeline animate={false} className="app override">
                    {filteredItems.map(album => (
                        <VerticalTimelineElement
                            key={album.id}
                            icon={<AlbumIcon album={album} />}
                            date={<AlbumDate album={album} />}
                        >
                            <Album
                                album={album}
                                showType={showType}
                                handleInfoClick={this.handleAlbumInfoClick}
                            />
                        </VerticalTimelineElement>
                    ))}
                </VerticalTimeline>

                <AlbumInfoDialog
                    open={openInfoModal}
                    handleClose={this.toggleAlbumInfo}
                    {...selectedAlbum}
                />
            </div>
        );
    }
}

AlbumList.propTypes = {
    albums: PropTypes.shape({
        items: PropTypes.arrayOf(albumType).isRequired,
        initialized: PropTypes.bool.isRequired,
    }).isRequired,
    showType: PropTypes.bool.isRequired,
    searchSpecificAlbum: PropTypes.func,
};

AlbumList.defaultProps = {
    searchSpecificAlbum: () => undefined,
};

export { AlbumList };
