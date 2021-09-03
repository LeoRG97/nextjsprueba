import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useSession } from 'next-auth/client';
import { fetch as fetchProfile } from '@/reducers/profile';
import { Footer, Layout, ProfileSettingsComponent } from '@/components';
import { updateUserData, uploadImgProfile } from '@/services/profile';

const EditProfile = () => {
  // const [session] = useSession();
  const dispatch = useDispatch();
  const { data, fetched } = useSelector((state) => state.profile);
  // console.log(data);

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchProfile());
    }
  }, []);

  const updateDataUser = (userData, userImg) => {
    const path = `${data._id}/resources`;
    //   console.log(userData);
    //   console.log(userImg.imgP);
    updateUserData(data._id, userData);
    uploadImgProfile(path, userImg.imgP);
  };

  return (
    <Layout>
      {
        data.name !== undefined ? (
          <ProfileSettingsComponent
            nameU={data.name}
            lastName={data.apellidos}
            userBio={data.biography}
            updateDU={updateDataUser}
          />
        ) : (
          <div />
        )
      }
      <Footer />
    </Layout>
  );
};

export default EditProfile;
