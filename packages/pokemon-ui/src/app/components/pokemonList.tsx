import React, { useState, memo, useCallback, Fragment, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { RootState } from '../store';
import {
  addPokemon,
  fetchPokemonByProfile,
  removePokemon,
} from '../store/profileSlice';
import { AutoSizer, List } from 'react-virtualized';
import { AppDispatch } from '../store';

interface PokemonListProps {
  selectedProfileId: number;
}

const containerStyle = css`
  width: 50%;
  margin: 0 auto;
`;

const headerRowStyle = css`
  display: grid;
  grid-template-columns: 25% 25% 25% 15% 10%;
  align-items: center;
  border-bottom: 2px solid #e0e0e0;
  padding: 8px;
  text-align: center;
  background-color: #f0f0f0;
  font-weight: bold;
  box-sizing: border-box;
`;

const rowStyle = css`
  display: grid;
  grid-template-columns: 25% 25% 25% 15% 10%;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  padding: 8px;
  text-align: center;
  overflow: hidden;
  box-sizing: border-box;
`;

const headerCellStyle = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const errorStyle = css`
  width: 100%;
  margin: 0 auto;
  color: red;
  margin-bottom: 5px;
`;

export const Header = memo(
  () => (
    <Fragment>
      <div css={headerRowStyle}>
        <span css={headerCellStyle}>Name</span>
        <span css={headerCellStyle}>Height</span>
        <span css={headerCellStyle}>Weight</span>
        <span css={headerCellStyle}>Base Experience</span>
        <span css={headerCellStyle}>Selected</span>
      </div>
    </Fragment>
  ),
  () => true
);

const PokemonList = ({ selectedProfileId }: PokemonListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { pokemon } = useSelector((state: RootState) => state.pokemon);
  const { profilePokemon, loading } = useSelector(
    (state: RootState) => state.profile
  );
  const [error, setError] = useState('');
  const isSelected = (pokemonId: number) =>
    profilePokemon?.savedPokemon.find((p) => p.id === pokemonId) ? true : false;
  const memoizedHeader = useMemo(() => <Header />, []);

  const handleCheckboxChange = useCallback(
    async (pokemonId: number, checked: boolean) => {
      if (checked) {
        if (profilePokemon?.savedPokemon.length === 6) {
          setError('A maximum of 6 pokemon can be selected.');
          return;
        } else {
          const profileId: number = selectedProfileId;
          await dispatch(addPokemon({ profileId, pokemonId }));
          await dispatch(fetchPokemonByProfile(profileId));
        }
      } else {
        setError('');
        const profileId: number = selectedProfileId;
        await dispatch(removePokemon({ profileId, pokemonId }));
        await dispatch(fetchPokemonByProfile(profileId));
      }
    },
    [selectedProfileId, profilePokemon, dispatch]
  );

  const rowRenderer = ({ key, index, style }: any) => (
    <div key={key} style={style} css={rowStyle}>
      <span>{pokemon[index].name}</span>
      <span>{pokemon[index].height}</span>
      <span>{pokemon[index].weight}</span>
      <span>{pokemon[index].baseExperience}</span>
      <span>
        <input
          type="checkbox"
          disabled={loading || selectedProfileId === 0}
          checked={isSelected(pokemon[index].id)}
          onChange={(e) =>
            handleCheckboxChange(pokemon[index].id, e.target.checked)
          }
        />
      </span>
    </div>
  );

  return (
    <div css={containerStyle}>
      {error && <div css={errorStyle}>{error}</div>}
      {memoizedHeader}
      <AutoSizer disableHeight>
        {({ width }) => (
          <List
            width={width}
            height={600}
            rowHeight={50}
            rowCount={pokemon.length}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default memo(
  PokemonList,
  (prevProps, nextProps) =>
    prevProps.selectedProfileId === nextProps.selectedProfileId
);
