import React, { useState, useEffect, useMemo } from 'react';
import { css } from '@emotion/react';
import ProfileSelector from './profileSelection';
import PokemonList from './pokemonList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfiles } from '../store/profileSlice';
import { fetchPokemon } from '../store/pokemonSlice';
import { RootState, AppDispatch } from '../store';

const containerStyle = css`
  padding: 24px;
  background-color: #fafafa;
  min-height: 100vh;
`;

const errorStyle = css`
  background-color: #ff4d4f;
  color: white;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const PokemonViewer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [profileSelectedState, setProfileSelectedState] = useState(0);
  const { error } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(fetchProfiles());
    dispatch(fetchPokemon());
  }, [dispatch]);

  const memoizedPokemonList = useMemo(
    () => <PokemonList selectedProfileId={profileSelectedState} />,
    [profileSelectedState]
  );

  return (
    <div css={containerStyle}>
      {error && <div css={errorStyle}>{error}</div>}
      <ProfileSelector onProfileSelect={setProfileSelectedState} />
      {memoizedPokemonList}
    </div>
  );
};

export default PokemonViewer;
