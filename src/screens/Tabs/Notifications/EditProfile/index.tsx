import React from 'react';
import Loading from 'library/components/Loading';

import useGetProfile from 'hooks/api/private/profile/useGetProfile';

import Root from './Root';

const EditProfile = () => {
  const { data, isLoading } = useGetProfile();

  if (isLoading || !data) {
    return <Loading />;
  }

  const profile = data.profile;

  return <Root loading={isLoading} profile={profile} />;
};

export default EditProfile;
