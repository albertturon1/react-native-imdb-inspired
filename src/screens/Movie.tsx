import React from 'react';
import {fsize, ftype} from '../theme/fonts';
import styled from 'styled-components';
import {scale, verticalScale} from 'react-native-size-matters/extend';
import {FlatList, Image, ImageBackground, Pressable, ScrollView, Text, View} from 'react-native';
import colors from '../theme/colors';
import Description from '../components/Movie/Description';
import {useNavigation} from '@react-navigation/native';
import ScreenLayout from '../components/ScreenLayout';
import {format} from 'fecha';
import {useGenresQuery} from '../services/moviesApi';
import MoviePopularity from '../components/MoviePopularity';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  route: {
    key: string;
    name: string;
    params: {
      data: {
        adult: boolean;
        backdrop_path: string | null;
        genre_ids: [];
        id: number;
        media_type: string;
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        release_date: number;
        poster_path: string;
        links: [{}];
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
      };
    };
    path: undefined;
  };
}

const Movie: React.FC<Props> = ({route}) => {
  const navigation = useNavigation();
  const {data} = route.params;
  const {data: genresData} = useGenresQuery();
  console.log(data)

  const movieGenres = genresData?.genres.filter(genre => data.genre_ids.some(g2 => genre.id == g2));

  const formattedReleaseDate = format(new Date(data.release_date), 'mediumDate');

  const gradientProps = {
    locations: [0, 1],
    colors: ['rgba(0,0,0,0.45)', 'rgba(0,0,0,0)'],
    height: '100%',
  };

  return (
    <ScrollView style={{flexGrow: 1}} contentContainerStyle={{paddingBottom: verticalScale(60)}}>
      <ImageBackground
        source={{uri: `https://image.tmdb.org/t/p/w780/${data.backdrop_path || data.poster_path}`}}
        resizeMode="contain"
        style={{width: '100%', aspectRatio: 1.77 / 1, marginBottom: verticalScale(15), backgroundColor: data.backdrop_path ? colors.grey: colors.primaryWhite}}>
        <LinearGradient {...gradientProps} style={{width: '100%', height: 60}} />
      </ImageBackground>
      <ScreenLayout>
        <TitleText>{data.title}</TitleText>
        <SectionLayout>
          <MoviePopularity voteCount={data.vote_count} voteAverage={data.vote_average} />
          <ReleaseDateText>Release date: {formattedReleaseDate}</ReleaseDateText>
          {movieGenres ? <Genres genres={movieGenres} /> : null}
        </SectionLayout>
        {data.overview ? <DescriptionText>{data.overview}</DescriptionText> : null}
      </ScreenLayout>
    </ScrollView>
  );
};

export default Movie;

const Genres: React.FC = ({genres}) => {
  return (
    <GenresContainer>
      {genres.map((genre, index) => {
        return (
          <GenreBox key={index}>
            <GenreText>{genre.name}</GenreText>
          </GenreBox>
        );
      })}
    </GenresContainer>
  );
};

const SectionLayout = styled.View`
  margin-bottom: ${verticalScale(12)}px;
`;

const TitleText = styled.Text`
  font-size: ${fsize.s22}px;
  line-height: ${fsize.s22 * 1.2}px;
  font-family: ${ftype.bold};
  color: ${colors.primaryBlack};
  flex-shrink: 1;
  margin-bottom: ${verticalScale(10)}px;
`;
const DescriptionText = styled.Text`
  font-size: ${fsize.s14}px;
  line-height: ${fsize.s14 * 1.5}px;
  font-family: ${ftype.regular};
  color: ${colors.secondaryBlack};
  flex-shrink: 1;
`;

//ReleaseDate
const ReleaseDateText = styled.Text`
  font-size: ${fsize.s14}px;
  font-family: ${ftype.medium};
  color: ${colors.secondaryBlack};
  margin-top: ${scale(4)}px;
  margin-bottom: ${verticalScale(10)}px;
`;

const GenresContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${verticalScale(10)}px;
`;

const GenreBox = styled.View`
  padding: ${verticalScale(5)}px ${scale(15)}px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${colors.tertiaryBlack};
  border-radius: 15px;
  margin-right: ${scale(7)}px;
`;
const GenreText = styled.Text`
  font-size: ${fsize.s14}px;
  font-family: ${ftype.medium};
  color: ${colors.tertiaryBlack};
`;
