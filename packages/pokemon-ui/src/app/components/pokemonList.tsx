import React, { useState, memo, useMemo } from 'react';
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
  width: 40%;
  margin: 0 auto;
  color: red;
  margin-bottom: 5px;
`;

const Row = memo(
  ({
    pokemonItem,
    isSelected,
    loading,
    selectedProfileId,
    handleCheckboxChange,
    style,
  }:any) => (
    <div key={`pokemon-row-${pokemonItem.id}`} style={style} css={rowStyle}>
      <span>{pokemonItem.name}</span>
      <span>{pokemonItem.height}</span>
      <span>{pokemonItem.weight}</span>
      <span>{pokemonItem.baseExperience}</span>
      <span>
        <input
          type="checkbox"
          disabled={loading || selectedProfileId === 0}
          checked={isSelected(pokemonItem.id)}
          onChange={(e) =>
            handleCheckboxChange(pokemonItem.id, e.target.checked)
          }
        />
      </span>
    </div>
  ),
  (prevProps, nextProps) =>
    prevProps.pokemonItem.id === nextProps.pokemonItem.id &&
    prevProps.isSelected(nextProps.pokemonItem.id) ===
      nextProps.isSelected(nextProps.pokemonItem.id) &&
    prevProps.loading === nextProps.loading
);

export const Header = memo(
  () => (
    <div css={headerRowStyle}>
      <span css={headerCellStyle}>Name</span>
      <span css={headerCellStyle}>Height</span>
      <span css={headerCellStyle}>Weight</span>
      <span css={headerCellStyle}>Base Experience</span>
      <span css={headerCellStyle}>Selected</span>
    </div>
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

  const memoizedHeader = useMemo(() => <Header />, []);

  const isSelected = (pokemonId: number) =>
    profilePokemon?.savedPokemon.find((p) => p.id === pokemonId) ? true : false;

  const handleCheckboxChange = async (pokemonId: number, checked: boolean) => {
    try {
      if (checked) {
        if (profilePokemon?.savedPokemon.length === 6) {
          setError('A maximum of 6 pokemon can be selected.');
          return;
        } else {
          const profileId: number = selectedProfileId;
          await dispatch(addPokemon({ profileId, pokemonId })).unwrap();
          await dispatch(fetchPokemonByProfile(profileId)).unwrap();
        }
      } else {
        setError('');
        const profileId: number = selectedProfileId;
        await dispatch(removePokemon({ profileId, pokemonId })).unwrap();
        await dispatch(fetchPokemonByProfile(profileId)).unwrap();
      }
    } catch (err) {
      setError('An error occurred while updating the selection.');
    }
  };

  const rowRenderer = ({ key, index, style }:any) => (
    <Row
      key={`pokemon-row-${pokemon[index].id}`}
      style={style}
      pokemonItem={pokemon[index]}
      isSelected={isSelected}
      loading={loading}
      selectedProfileId={selectedProfileId}
      handleCheckboxChange={handleCheckboxChange}
    />
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
            overscanRowCount={5}
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
