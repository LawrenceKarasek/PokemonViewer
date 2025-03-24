import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { RootState } from '../store';
import { fetchPokemonByProfile } from '../store/profileSlice';
import { AppDispatch } from '../store';

interface Props {
  onProfileSelect: (profileId: number) => void;
}

const containerStyle = css`
  width: 50%;
  margin: 0 auto;
`;

const dropdownStyle = css`
  padding: 10px;
  border-radius: 5px;
  width: 250px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
`;

const ProfileSelector = ({ onProfileSelect }: Props) => {
  const { profiles } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const profileId = parseInt(e.target.value, 10);
    onProfileSelect(profileId);
    dispatch(fetchPokemonByProfile(profileId));
  };

  return (
    <div css={containerStyle}>
      <select css={dropdownStyle} onChange={handleSelect} defaultValue="0">
        <option value="0" disabled>
          Select a Profile
        </option>
        {profiles &&
          profiles.map((profile) => (
            <option key={profile.id} value={profile.id}>
              {profile.username}
            </option>
          ))}
      </select>
    </div>
  );
};

export default ProfileSelector;
