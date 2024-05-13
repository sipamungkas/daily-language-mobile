import TrackPlayer, {Track} from 'react-native-track-player';

// import {musiclibrary} from '@constants/data';
// // @ts-expect-error – sure we can import this
// import localTrack from '../assets/resources/pure.m4a';
// // @ts-expect-error – sure we can import this
// import localArtwork from '../assets/resources/artwork.jpg';

export const QueueInitialTracksService = async (
  audioList: Track[],
): Promise<void> => {
  await TrackPlayer.add([
    ...audioList,
    // {
    //   url: localTrack,
    //   title: 'Pure (Demo)',
    //   artist: 'David Chavez',
    //   artwork: localArtwork,
    //   duration: 28,
    // },
  ]);
};
