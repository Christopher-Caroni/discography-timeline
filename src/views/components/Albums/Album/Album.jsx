import './album.scss';

import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

import { albumTypeToLabel } from '../../../../utils/albumUtils';
import { ArtistLink } from '../../Artists/ArtistLink';
import { AlbumLink } from '../AlbumLink';
import { AlbumInfoButton } from '../AlbumInfoButton';
import { albumType } from '../types';

const styles = theme => ({
    expansionPanel: {
        backgroundColor: '#ffffff',
    },
    expandIcon: {
        color: '#000000',
    },
});

const Album = ({
    album: { id, name, album_group, total_tracks, artists, alternatives = [], images = [] },
    showType,
    album,
    mini,
    hideArtistName,
    match: { params: { id: currentArtistId } } = {
        params: {
            id: '',
        },
    },
    classes,
    handleInfoClick,
}) => {
    const getAlternatives = () => {
        if (!alternatives || !alternatives.length) return null;

        return (
            <div className="alternatives-container">
                <ExpansionPanel classes={{ root: classes.expansionPanel }}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon classes={{ root: classes.expandIcon }} />}
                    >
                        <Typography>
                            {`${alternatives.length} alternative version${
                                alternatives.length > 1 ? 's' : ''
                            }`}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails classes={{ root: 'alt-content-container' }}>
                        {alternatives.map((alt, index) => (
                            <React.Fragment key={alt.id}>
                                <Album
                                    album={alt}
                                    showType={showType}
                                    mini
                                    hideArtistName
                                    handleInfoClick={handleInfoClick}
                                />
                                {index < alternatives.length - 1 && (
                                    <Divider classes={{ root: 'divider' }} />
                                )}
                            </React.Fragment>
                        ))}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    };

    return (
        <div className="album-timeline-container">
            <Typography variant={mini ? 'h4' : 'h3'} color="inherit" className="a-title override">
                {name}
            </Typography>

            {artists.map(
                artist =>
                    artist.id !== currentArtistId &&
                    !hideArtistName && <ArtistLink key={artist.id} artist={artist} />
            )}

            <div className="track-count">{`${total_tracks} track${
                total_tracks > 1 ? 's' : ''
            }`}</div>

            <div className={`album-content-container ${mini ? 'mini' : ''}`}>
                {images.length > 0 && (
                    <div className="album-art-container">
                        <img
                            className={`album-art  ${mini ? 'mini' : ''}`}
                            alt={name}
                            src={mini && images.length > 1 ? images[1].url : images[0].url}
                        />
                    </div>
                )}

                <div className="album-content-info">
                    <div className="album-content-info-item">
                        <AlbumLink album={album} />
                    </div>

                    <div className="album-content-info-item">
                        <AlbumInfoButton onClick={() => handleInfoClick(id)} />
                    </div>

                    <div className="album-content-info-item">
                        {showType && (
                            <div className="type">
                                <span className="type-title">Type:</span>
                                <Chip label={albumTypeToLabel(album_group)} color="primary" />
                            </div>
                        )}
                    </div>
                </div>

                {getAlternatives()}
            </div>
            <div className="album-content-bottom">{getAlternatives()}</div>
        </div>
    );
};

Album.propTypes = {
    album: albumType.isRequired,
    showType: PropTypes.bool.isRequired,
    mini: PropTypes.bool,
    hideArtistName: PropTypes.bool,
    handleInfoClick: PropTypes.func,
};

Album.defaultProps = {
    mini: false,
    hideArtistName: false,
    handleInfoClick: () => undefined,
};

const ConnectedALbum = withRouter(withStyles(styles)(Album));

export { ConnectedALbum as Album };
